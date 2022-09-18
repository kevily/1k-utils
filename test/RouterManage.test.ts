import RouterManage from '../src/RouterManage'
import { cloneDeep } from 'lodash'

const routes = [
    {
        path: '/1',
        routes: [
            {
                path: '/1/1'
            }
        ]
    },
    {
        path: '/2'
    }
]
const routerManage = new RouterManage(cloneDeep(routes))
test('findRoute', () => {
    expect(routerManage.findRoute('/1')).toEqual(routes[0])
})

test('search', () => {
    expect(routerManage.search('path', ['/1'])).toEqual([routes[0]])
})

test('findThePassingRoute', () => {
    expect(routerManage.findThePassingRoute('/1')).toEqual([routes[0]])
})

test('insert', () => {
    // Path is existed. So, can't insert,
    routerManage.insert([0, 1], { path: '/2' })
    expect(routerManage.routes).toEqual(routes)
    // Parent is not existed. So, can't insert,
    routerManage.insert([0, 1, 0], { path: '/2/1' })
    expect(routerManage.routes).toEqual(routes)
    // success
    routerManage.insert([1, 0], { path: '/2/1' })
    expect(routerManage.routes).toEqual([
        {
            path: '/1',
            routes: [
                {
                    path: '/1/1'
                }
            ]
        },
        {
            path: '/2',
            routes: [
                {
                    path: '/2/1'
                }
            ]
        }
    ])
})

test('remove', () => {
    routerManage.remove('/1/1')
    routerManage.remove('/2')
    expect(routerManage.routes).toEqual([
        {
            path: '/1',
            routes: []
        }
    ])
})

test('has', () => {
    expect(routerManage.has('/1/1')).toBe(false)
    expect(routerManage.has('/2')).toBe(false)
    expect(routerManage.has('/1')).toBe(true)
})

test('init', () => {
    routerManage.init(cloneDeep(routes))
    expect(routerManage.routes).toEqual(routes)
})
