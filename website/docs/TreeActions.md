---
title: TreeActions
---

## Types

```typescript
class TreeActions {
    public treeList: insideTreeNodeType[]
    protected fieldNames: configType['fieldNames']
    protected fetchNode: configType['fetchNode']
    protected fetchParentNode: configType['fetchParentNode']
    /**
     *
     * @param treeList
     * @param parentTree
     * @param fieldNames default: {id: 'id', children: children}
     */
    static transformTreeList: (
        treeList: treeNodeType[],
        parentTree?: insideTreeNodeType,
        fieldNames?: configType['fieldNames']
    ) => insideTreeNodeType[]
    /**
     * @description Merge currentPath to parentPath.
     * @param parentPath
     * @param currentPath
     * @returns whole path
     */
    static mergePath: (parentPath: string, currentPath: string) => string
    /**
     * @description transform indexPath to lodash.get path.
     * @description indexToLodashPath('0-1-2') -> '[0].children[1].children[2]'
     * @param indexPath
     * @returns lodash usable path
     */
    static indexToLodashPath: (indexPath: string) => string
    /**
     * @param path
     * @returns By default, return parent path.
     * @returns If you set allPath as true, return every path from top level node to tail
     */
    static getWholePath: (path: string) => string[]
    /**
     * @param ids ids
     * @param isSameChain true -> BFS, false -> DFS
     * @returns treeNodes
     */
    public getTreeNodes: (ids: string[], isSameChain = false) => insideTreeNodeType[]

    public reverseLoadNode: (nodeId: string) => Promise<void>
}
```

## Usage

```typescript
import { TreeActions } from '1k-utils'
import { insideTreeNodeType } from '1k-utils/esm/TreeActions'
import { cloneDeep, omit } from 'lodash'

const SEARCH_LIST = [
    {
        title: '1',
        id: '1',
        children: [
            {
                title: '1-1',
                id: '1-1',
                children: [
                    {
                        title: '1-1-1',
                        id: '1-1-1'
                    }
                ]
            }
        ]
    },
    {
        title: '2',
        id: '2',
        children: [
            {
                title: '2-1',
                id: '2-1',
                children: [
                    {
                        title: '2-1-1',
                        id: '2-1-1'
                    }
                ]
            }
        ]
    }
]
const INSIDE_SEARCH_LIST = TreeActions.transformTreeList(SEARCH_LIST)

const TREE_LIST = [
    cloneDeep(omit(SEARCH_LIST[0], ['children'])),
    cloneDeep(omit(SEARCH_LIST[1], ['children']))
]
const INSIDE_TREE_LIST: insideTreeNodeType[] = TreeActions.transformTreeList(TREE_LIST)

const originTreeAction = new TreeActions(SEARCH_LIST, {
    fetchNode: async () => ({}),
    fetchParentNode: async () => ({})
})

const treeActions = new TreeActions(TREE_LIST, {
    fetchNode: async nodeId => {
        return originTreeAction.getTreeNodes([nodeId])[0]
    },
    fetchParentNode: async node => {
        const parentId = TreeActions.getWholePath(node.id).slice(-2, -1)
        return originTreeAction.getTreeNodes(parentId)[0]
    }
})

TreeActions.transformTreeList(TREE_LIST) // INSIDE_TREE_LIST
//TREE_LIST -> INSIDE_TREE_LIST
TreeActions.getWholePath('1-1-1') // ['1', '1-1', '1-1-1']
TreeActions.mergePath('1-1', '1') // '1-1-1'
TreeActions.indexToLodashPath('1-1-1') // '[1].children[1].children[1]'

await treeActions.reverseLoadNode('1-1-1')
await treeActions.reverseLoadNode('2-1-1')
// treeActions.treeList -> TreeActions.transformTreeList(SEARCH_LIST)

treeActions.getTreeNodes([SEARCH_LIST[0].id, SEARCH_LIST[0].children[0].id], true)
// [INSIDE_SEARCH_LIST[0], INSIDE_SEARCH_LIST[0].__children__[0]]
treeActions.getTreeNodes([SEARCH_LIST[0].id, SEARCH_LIST[1].children[0].id])
// [ INSIDE_SEARCH_LIST[0], INSIDE_SEARCH_LIST[1].__children__[0] ]
```
