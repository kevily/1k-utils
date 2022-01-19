import TreeActions, { insideTreeNodeType } from '../src/TreeActions'
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

test('static', () => {
    expect(TreeActions.transformTreeList(TREE_LIST)).toEqual(INSIDE_TREE_LIST)
    expect(TREE_LIST).toEqual(INSIDE_TREE_LIST)
    expect(TreeActions.getWholePath('1-1-1')).toEqual(['1', '1-1', '1-1-1'])
    expect(TreeActions.mergePath('1-1', '1')).toBe('1-1-1')
    expect(TreeActions.indexToLodashPath('1-1-1')).toBe('[1].children[1].children[1]')
})

test('reverseLoadNode', async () => {
    await treeActions.reverseLoadNode('1-1-1')
    await treeActions.reverseLoadNode('2-1-1')
    expect(treeActions.treeList).toEqual(TreeActions.transformTreeList(SEARCH_LIST))
})

test('getTreeNodes', async () => {
    expect(
        treeActions.getTreeNodes([SEARCH_LIST[0].id, SEARCH_LIST[0].children[0].id], true)
    ).toEqual([INSIDE_SEARCH_LIST[0], INSIDE_SEARCH_LIST[0].__children__[0]])
    expect(treeActions.getTreeNodes([SEARCH_LIST[0].id, SEARCH_LIST[1].children[0].id])).toEqual([
        INSIDE_SEARCH_LIST[0],
        INSIDE_SEARCH_LIST[1].__children__[0]
    ])
})
