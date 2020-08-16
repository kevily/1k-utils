## Types

```typescript
function mergePath(parentPath: string, currentPath: string): string
function indexToLodashPath(indexPath: string): string
function getParentPath(indexPath: string, allPath?: boolean): undefined | string | string[]
function customize({ treeList, setTreeNode, parentTree, childrenKey }): treeNode[]
function getTreeNodes(treeList: any[], ids: string[], isSameChain?: boolean): any[]
function loadParentTree(
    treeList: any[],
    nodeId: string,
    fetchTreeNode: (parentId: string) => Promise<treeNode>
): Promise<treeNode>
```

## Usage

```typescript
import treeActions from '../src/treeActions'
import _ from 'lodash'

const TREE_LIST = [
    {
        title: '1',
        id: '1',
        children: [
            {
                title: '1-1',
                id: '1-1',
                ParentId: '1',
                children: [
                    {
                        title: '1-1-1',
                        id: '1-1-1',
                        ParentId: '1-1'
                    }
                ]
            }
        ]
    }
]
const LEVEL_TOP = TREE_LIST[0]
const LEVEL_1 = TREE_LIST[0].children[0]
const LEVEL_2 = TREE_LIST[0].children[0].children[0]

const IDS = ['1-1-1']

treeActions.getParentPath('1-1-1')
// => '1-1'
treeActions.getParentPath('1-1-1', true)
// => ['1', '1-1']
treeActions.mergePath('1-1', '1')
// => '1-1-1'
treeActions.indexToLodashPath('1-1-1')
// => '[1].children[1].children[1]'
treeActions.getTreeNodes(TREE_LIST, IDS)
// => [LEVEL_2]
treeActions.getTreeNodes(TREE_LIST, [LEVEL_TOP.id, LEVEL_1.id, LEVEL_2.id], true)
// => [LEVEL_TOP, LEVEL_1, LEVEL_2]
const treeList = _.cloneDeep(TREE_LIST)
const result = treeActions.customize({
    treeList,
    childrenKey: 'children',
    setTreeNode: treeNode => {
        treeNode.custom = 'custom'
    }
})
// result/treeList => [
//     {
//         title: '1',
//         id: '1',
//         indexPath: '0',
//         custom: 'custom',
//         children: [
//             {
//                 title: '1-1',
//                 id: '1-1',
//                 ParentId: '1',
//                 indexPath: '0-0',
//                 custom: 'custom',
//                 children: [
//                     {
//                         title: '1-1-1',
//                         id: '1-1-1',
//                         ParentId: '1-1',
//                         indexPath: '0-0-0',
//                         custom: 'custom'
//                     }
//                 ]
//             }
//         ]
//     }
// ]

const treeList = treeActions.customize({
    treeList: [_.omit(LEVEL_TOP, 'children')],
    childrenKey: 'children'
})
const result = await treeActions.loadParentTree(treeList, '1-1-1', async nodeId => {
    const treeNode = await Promise.resolve(treeActions.getTreeNodes(TREE_LIST, [nodeId]))
    return treeActions.customize({ treeList: treeNode, childrenKey: 'children' })[0]
})
// result => { ParentId: '1-1', id: '1-1-1', indexPath: '0-0-0', title: '1-1-1' }
// treeList => [
//     {
//         title: '1',
//         id: '1',
//         indexPath: '0',
//         children: [
//             {
//                 title: '1-1',
//                 id: '1-1',
//                 ParentId: '1',
//                 indexPath: '0-0',
//                 children: [
//                     {
//                         title: '1-1-1',
//                         id: '1-1-1',
//                         ParentId: '1-1',
//                         indexPath: '0-0-0'
//                     }
//                 ]
//             }
//         ]
//     }
// ]
```
