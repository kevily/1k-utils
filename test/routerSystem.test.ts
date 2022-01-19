import RouterSystem, { routesType } from '../src/RouterSystem'
import _ from 'lodash'

const routes: routesType = [
    {
        path: '/home',
        breadcrumb: 'home',
        routes: [
            {
                path: '/home/child',
                breadcrumb: 'home/child',
                routes: [
                    {
                        path: '/home/child/child',
                        breadcrumb: 'home/child/child'
                    }
                ]
            }
        ]
    },
    {
        path: '/home2',
        breadcrumb: 'home2',
        routes: [
            {
                path: '/home2/child',
                breadcrumb: 'home2/child',
                routes: [
                    {
                        path: '/home2/child/child',
                        breadcrumb: 'home2/child/child'
                    }
                ]
            }
        ]
    }
]

test('routerSystem', () => {
    const router1 = new RouterSystem(_.cloneDeep(routes))
    expect(router1.find('/home2/child')).toEqual({ target: routes[1].routes[0], path: [1, 0] })
    expect(router1.find('/home2/3333')).toEqual({ target: {}, path: [] })
    router1.update('/home2/child', {
        breadcrumb: 'home2/child(updated)'
    })
    expect(router1.find('/home2/child')).toEqual({
        target: {
            ...routes[1].routes[0],
            breadcrumb: 'home2/child(updated)'
        },
        path: [1, 0]
    })

    const router2 = new RouterSystem(_.cloneDeep(routes))
    expect(router2.remove('/home2')).toEqual(routes[1])
    expect(router2.find('/home2')).toEqual({ target: {}, path: [] })
})
