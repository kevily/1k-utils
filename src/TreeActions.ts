import {
    isArray,
    each,
    includes,
    size,
    set,
    map,
    toString,
    assign,
    pickBy,
    find,
    cloneDeep
} from 'lodash'

export interface treeNodeType {
    id?: string
    children?: treeNodeType[]
    [key: string]: any
}
export interface insideTreeNodeType extends treeNodeType {
    __id__: string
    __indexPath__: string
    __children__?: insideTreeNodeType[]
}
export interface configType {
    fetchNode: (nodeId: string) => Promise<treeNodeType>
    fetchParentNode: (node?: treeNodeType) => Promise<treeNodeType>
    fieldNames?: { id?: string; children?: string }
}

function mergeFieldNames(fieldNames: configType['fieldNames']) {
    return assign({ id: 'id', children: 'children' }, fieldNames)
}

export default class TreeActions {
    public treeList: insideTreeNodeType[]
    protected fieldNames: configType['fieldNames']
    protected fetchNode: configType['fetchNode']
    protected fetchParentNode: configType['fetchParentNode']
    constructor(treeList: treeNodeType[], c: configType) {
        this.fieldNames = mergeFieldNames(c?.fieldNames)
        this.treeList = TreeActions.transformTreeList(treeList, null, this.fieldNames)
        this.fetchNode = c.fetchNode
        this.fetchParentNode = c.fetchParentNode
    }
    /**
     *
     * @param treeList
     * @param parentTree
     * @param fieldNames default: {id: 'id', children: children}
     */
    static transformTreeList(
        treeList: treeNodeType[],
        parentTree?: insideTreeNodeType,
        fieldNames?: configType['fieldNames']
    ) {
        const _fieldNames = mergeFieldNames(fieldNames)
        const transform = (treeList: treeNodeType[], parentTree?: insideTreeNodeType) => {
            const newTreeList: insideTreeNodeType[] = []
            for (let i = 0; i < treeList.length; i++) {
                const node = treeList[i]
                const insideNode: insideTreeNodeType = {
                    ...cloneDeep(pickBy(node, (__, k) => k !== _fieldNames.children)),
                    __indexPath__: TreeActions.mergePath(parentTree?.__indexPath__, toString(i)),
                    __id__: node[_fieldNames.id]
                }
                const children = node[_fieldNames.children]

                if (isArray(children)) {
                    insideNode.__children__ = insideNode[_fieldNames.children] = transform(
                        children,
                        insideNode
                    )
                }
                newTreeList.push(insideNode)
            }
            return newTreeList
        }
        return transform(treeList, parentTree)
    }
    /**
     * @description Merge currentPath to parentPath.
     * @param parentPath
     * @param currentPath
     * @returns whole path
     */
    static mergePath(parentPath: string, currentPath: string): string {
        return !parentPath ? currentPath : `${parentPath}-${currentPath}`
    }
    /**
     * @description transform indexPath to lodash.get path.
     * @description indexToLodashPath('0-1-2') -> '[0].children[1].children[2]'
     * @param indexPath
     * @returns lodash usable path
     */
    static indexToLodashPath(indexPath: string): string {
        if (!indexPath) {
            return ''
        }
        return `[${indexPath.replace(/-/g, '].children[')}]`
    }
    /**
     * @param path
     * @returns By default, return parent path.
     * @returns If you set allPath as true, return every path from top level node to tail
     */
    static getWholePath(path: string) {
        const indexes = path.split('-')
        let prevIndex = ''

        return map(indexes, path => {
            prevIndex = prevIndex === '' ? path : `${prevIndex}-${path}`
            return prevIndex
        })
    }
    /**
     * @param ids ids
     * @param isSameChain true -> BFS, false -> DFS
     * @returns treeNodes
     */
    public getTreeNodes(ids: string[], isSameChain = false): insideTreeNodeType[] {
        const idsLen = size(ids)
        if (idsLen <= 0) {
            return []
        }
        const nodes: insideTreeNodeType[] = []
        const DFS = (_treeList: insideTreeNodeType[]) => {
            each(_treeList, treeNode => {
                if (includes(ids, treeNode.__id__)) {
                    nodes.push(treeNode)
                }
                if (size(nodes) >= idsLen) {
                    return false
                }
                if (isArray(treeNode.__children__)) {
                    DFS(treeNode.__children__)
                }
            })
        }
        const BFS = (_treeList: insideTreeNodeType[]) => {
            let idIndex = 0
            let index = 0
            while (true) {
                const treeNode = _treeList[index]
                if (treeNode.id === ids[idIndex]) {
                    nodes.push(treeNode)
                    idIndex += 1
                    index = 0
                    _treeList = treeNode.__children__
                }
                if (idIndex >= idsLen || !_treeList) {
                    break
                }
            }
        }
        isSameChain ? BFS(this.treeList) : DFS(this.treeList)
        return nodes
    }

    public async reverseLoadNode(nodeId: string): Promise<void> {
        let treeNode: treeNodeType = await this.fetchNode(nodeId)
        const childrenFieldName = this.fieldNames.children
        const idFieldName = this.fieldNames.id
        while (true) {
            const insideNode = this.getTreeNodes([treeNode[idFieldName]])[0]
            if (size(insideNode) > 0) {
                const insideNodeChildren = TreeActions.transformTreeList(
                    treeNode[childrenFieldName],
                    insideNode,
                    this.fieldNames
                )
                insideNode.__children__ = insideNode[childrenFieldName] = insideNodeChildren
                break
            }
            const node: treeNodeType = await this.fetchParentNode(treeNode)
            if (size(treeNode) > 0) {
                const children: treeNodeType['children'] = node[childrenFieldName]
                const treeNodeInNode = find(children, o => o[idFieldName] === treeNode[idFieldName])
                set(treeNodeInNode, childrenFieldName, treeNode[childrenFieldName])
            }
            treeNode = node
        }
    }
}
