import {
    assign,
    each,
    times,
    get,
    includes,
    isArray,
    last,
    set,
    size,
    split,
    has,
    pullAt,
    toNumber,
    forEach,
    unset
} from 'lodash'
import { mergePath, indexPathToLodashPath, getWholePath, flat } from './base'

export interface configType<T extends Record<string, any>> {
    fieldNames: {
        key: keyof T
        children: keyof T
    }
}

export default class TreeManage<T extends Record<string, any>, K extends string> {
    private indexPathSeparator: string
    public tree: T[]
    public pathInfo: Record<K, string>
    public fieldNames: configType<T>['fieldNames']
    static mergePath = mergePath
    static indexPathToLodashPath = indexPathToLodashPath
    static flat = flat
    static getWholePath = getWholePath
    constructor(tree: T[], config?: Partial<configType<T>>) {
        this.init(tree, config)
    }
    public init(tree: T[], config?: Partial<configType<T>>) {
        this.indexPathSeparator = '-'
        this.fieldNames = {
            key: 'id',
            children: 'children',
            ...config?.fieldNames
        }
        this.tree = tree
        this.pathInfo = this.createPathInfo(tree, '')
    }
    public has(key: K) {
        return has(this.pathInfo, key)
    }
    public findIndexPath(key: K) {
        return split(this.pathInfo[key], this.indexPathSeparator)
    }
    public createPathInfo(tree: T[], parentPath: string) {
        const pathInfo: Record<string, string> = {}
        const fieldName = this.fieldNames
        function run(tree: T[], path: string) {
            for (let i = 0; i < tree.length; i++) {
                const p = path ? `${path}-${i}` : `${i}`
                const treeNode: T = tree[i]
                const children: T[] = treeNode[fieldName.children]
                if (!has(treeNode, fieldName.key)) {
                    throw new Error(`treeNode is missing ${fieldName.key as string}`)
                }
                pathInfo[treeNode[fieldName.key]] = p
                if (isArray(children)) {
                    run(children, p)
                }
            }
        }
        run(tree, parentPath)
        return pathInfo
    }
    public search(field: keyof T, values: string[], isSameChain = false): T[] {
        const idsLen = size(values)
        if (idsLen <= 0) {
            return []
        }
        const nodes: T[] = []
        const DFS = (_treeList: T[]) => {
            each(_treeList, (treeNode: T) => {
                if (includes(values, treeNode[field])) {
                    nodes.push(treeNode)
                }
                if (size(nodes) >= idsLen) {
                    return false
                }
                if (isArray(treeNode[this.fieldNames.children])) {
                    DFS(treeNode[this.fieldNames.children])
                }
            })
        }
        const BFS = (_treeList: T[]) => {
            let idIndex = 0
            let index = 0
            while (true) {
                const treeNode: T = _treeList[index]
                if (treeNode[field] === values[idIndex]) {
                    nodes.push(treeNode)
                    idIndex += 1
                    index = 0
                    _treeList = treeNode[this.fieldNames.children]
                }
                if (idIndex >= idsLen || !_treeList) {
                    break
                }
            }
        }
        isSameChain ? BFS(this.tree) : DFS(this.tree)
        return nodes
    }
    public findThePassingPath(key: K) {
        const indexPath = this.findIndexPath(key)
        return times(size(indexPath), i => indexPath.slice(0, i + 1))
    }
    public findThePassingNode(key: K): T[] {
        const indexPath = this.findIndexPath(key)
        return times(size(indexPath), i => {
            return get(
                this.tree,
                indexPathToLodashPath(indexPath.slice(0, i + 1), this.fieldNames.children as string)
            )
        })
    }
    public findNode(key: K): T | undefined {
        const path = this.pathInfo[key]
        if (path) {
            const lodashPath = indexPathToLodashPath(
                path.split(this.indexPathSeparator),
                this.fieldNames.children as string
            )
            return get(this.tree, lodashPath)
        }
        return void 0
    }
    public insert(indexPath: (string | number)[], newNode: T, overwrite?: boolean): boolean {
        const childrenField = this.fieldNames.children as string
        const parentNode =
            size(indexPath) === 1
                ? [{ [childrenField]: this.tree }]
                : get(this.tree, indexPathToLodashPath(indexPath.slice(0, -1), childrenField))
        if (!parentNode) {
            return false
        }
        const fieldNames = this.fieldNames
        const lodashPath = indexPathToLodashPath(indexPath, childrenField)
        const oldNode = get(this.tree, lodashPath)
        const hasKey = has(this.pathInfo, newNode[fieldNames.key])
        if (overwrite && oldNode) {
            if (newNode[fieldNames.key] !== oldNode[fieldNames.key] && hasKey) {
                return false
            }
            set(this.tree, lodashPath, newNode)
            return true
        }
        if (hasKey) {
            return false
        }
        if (isArray(parentNode[childrenField])) {
            parentNode[childrenField].splice(toNumber(last(indexPath)), 0, newNode)
        } else {
            parentNode[childrenField] = [newNode]
        }
        this.pathInfo[newNode[fieldNames.key]] = indexPath.join(this.indexPathSeparator)
        return true
    }
    public update(key: K, newNode: Partial<T>): boolean {
        const treeNode = this.findNode(key)
        if (treeNode && newNode) {
            const keyField = this.fieldNames.key
            assign(treeNode, newNode)
            if (newNode[keyField] !== treeNode[keyField]) {
                set(this.pathInfo, newNode[keyField]!, get(this.pathInfo, treeNode[keyField]))
                unset(this.pathInfo, treeNode[keyField])
            }
            return true
        }
        return false
    }
    public remove(key: K): boolean {
        if (has(this.pathInfo, key)) {
            const indexPath = this.pathInfo[key]?.split(this.indexPathSeparator)
            const childrenField = this.fieldNames.children as string
            const keyField = this.fieldNames.key
            const removeIndex = toNumber(last(indexPath))
            let removed: T[] = []
            if (size(indexPath) === 1) {
                removed = pullAt(this.tree, removeIndex)
            } else {
                const parentNode = get(
                    this.tree,
                    indexPathToLodashPath(indexPath.slice(0, -1), childrenField)
                )
                removed = pullAt(parentNode[childrenField], removeIndex)
            }
            forEach(flat<T>(removed, childrenField, Infinity), o => {
                unset(this.pathInfo, o[keyField])
            })
        }
        return true
    }
}
