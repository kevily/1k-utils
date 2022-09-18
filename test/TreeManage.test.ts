import TreeManage from '../src/TreeManage'
import { cloneDeep } from 'lodash'

const treeList = [
    {
        id: '/1',
        children: [
            {
                id: '/1/1'
            }
        ]
    },
    {
        id: '/2'
    }
]
const treeManage = new TreeManage(cloneDeep(treeList))
test('findRoute', () => {
    expect(treeManage.findNode('/1')).toEqual(treeList[0])
})

test('search', () => {
    expect(treeManage.search('id', ['/1'])).toEqual([treeList[0]])
})

test('findThePassingRoute', () => {
    expect(treeManage.findThePassingNode('/1')).toEqual([treeList[0]])
})

test('insert', () => {
    // Path is existed. So, can't insert,
    treeManage.insert([0, 1], { id: '/2' })
    expect(treeManage.tree).toEqual(treeList)
    // Parent is not existed. So, can't insert,
    treeManage.insert([0, 1, 0], { id: '/2/1' })
    expect(treeManage.tree).toEqual(treeList)
    // success
    treeManage.insert([1, 0], { id: '/2/1' })
    expect(treeManage.tree).toEqual([
        {
            id: '/1',
            children: [
                {
                    id: '/1/1'
                }
            ]
        },
        {
            id: '/2',
            children: [
                {
                    id: '/2/1'
                }
            ]
        }
    ])
})

test('remove', () => {
    treeManage.remove('/1/1')
    treeManage.remove('/2')
    expect(treeManage.tree).toEqual([
        {
            id: '/1',
            children: []
        }
    ])
})

test('has', () => {
    expect(treeManage.has('/1/1')).toBe(false)
    expect(treeManage.has('/2')).toBe(false)
    expect(treeManage.has('/1')).toBe(true)
})

test('init', () => {
    treeManage.init(cloneDeep(treeList))
    expect(treeManage.tree).toEqual(treeList)
})
