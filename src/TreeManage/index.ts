import {
    assign,
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
    unset,
    omit,
    cloneDeep
} from 'lodash'
import { mergePath, indexPathToLodashPath, getWholePath, flat } from './base'

export interface configType<T extends Record<string, any>> {
    fieldNames: {
        key?: keyof T
        children?: keyof T
    }
}

export default class TreeManage<T extends Record<string, any>, K extends string> {
    private indexPathSeparator: string
    public tree: T[]
    public pathInfo: { [key in K]?: string }
    public fieldNames: Required<configType<T>['fieldNames']>
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
        this.tree = []
        this.pathInfo = {}

        const fieldName = this.fieldNames
        const indexPathSeparator = this.indexPathSeparator
        const run = (tree: T[], parentNode: T, parentPath: string) => {
            const nodes: T[] = []
            for (let i = 0; i < tree.length; i++) {
                const p = parentPath ? `${parentPath}${indexPathSeparator}${i}` : `${i}`
                const treeNode = cloneDeep(omit(tree[i], [fieldName.children])) as T
                const children: T[] = tree[i][fieldName.children]
                if (!has(treeNode, fieldName.key)) {
                    break
                }
                this.pathInfo[treeNode[fieldName.key]] = p
                if (isArray(children)) {
                    treeNode[fieldName.children] = run(children, treeNode, p) as never
                }
                nodes.push(treeNode)
            }
            return nodes
        }
        this.tree = run(tree, null, '')
    }

    public has(key: K) {
        return has(this.pathInfo, key)
    }

    public findIndexPath(key: K) {
        return split(this.pathInfo[key], this.indexPathSeparator)
    }

    public search(field: keyof T, values: string[], isSameChain = false): T[] {
        const idsLen = size(values)
        if (idsLen <= 0) {
            return []
        }
        const nodes: T[] = []
        const DFS = (_treeList: T[]) => {
            forEach(_treeList, (treeNode: T) => {
                if (includes(values, treeNode[field])) {
                    nodes.push(treeNode)
                }
                if (size(nodes) >= idsLen) {
                    return false
                }
                if (isArray(treeNode[this.fieldNames.children])) {
                    DFS(treeNode[this.fieldNames.children])
                }
                return
            })
        }
        const BFS = (_treeList: T[]) => {
            let idIndex = 0
            let index = 0
            let treeListLen = size(_treeList)
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const treeNode: T = _treeList[index]
                if (treeNode[field] === values[idIndex]) {
                    nodes.push(treeNode)
                    idIndex += 1
                    index = 0
                    _treeList = treeNode[this.fieldNames.children]
                    treeListLen = size(_treeList)
                } else {
                    index += 1
                }
                if (index >= treeListLen || idIndex >= idsLen || !_treeList) {
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

    public merge(from: T[], rootKey: K) {
        const root = this.findNode(rootKey)
        const merge = (from: T[], parentNode: T) => {
            if (!parentNode) {
                return
            }
            for (let i = 0; i < from.length; i++) {
                const node = from[i]
                const nodeKey = node[this.fieldNames.key]
                if (has(this.pathInfo, nodeKey)) {
                    merge(node[this.fieldNames.children] || [], this.findNode(nodeKey))
                } else {
                    this.insertToChildren(
                        parentNode[this.fieldNames.key],
                        cloneDeep(omit(node, [this.fieldNames.children])) as never
                    )
                    if (isArray(node.children)) {
                        merge(node.children, this.findNode(nodeKey))
                    }
                }
            }
        }
        merge(from, root)
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

    public insertToChildren(parentKey: K, node: T, overwrite?: boolean) {
        const parentIndexPath = this.findIndexPath(parentKey)
        const parentNode = this.findNode(parentKey)
        const insertIndexPath = [...parentIndexPath, size(parentNode[this.fieldNames.children])]
        this.insert(insertIndexPath, node, overwrite)
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
            forEach(
                flat<T>(removed, {
                    childrenField,
                    depth: Infinity
                }),
                o => {
                    unset(this.pathInfo, o[keyField])
                }
            )
            return true
        }
        return false
    }
}
