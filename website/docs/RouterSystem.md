---
title: RouterSystem
---

## Types

```typescript
import {
    startsWith,
    isArray,
    size,
    assign,
    cloneDeep,
    forEach,
    pullAt,
    first,
    isString
} from 'lodash'

export interface routeType {
    breadcrumb?: string
    path?: string
    routes?: routeType[]
    [key: string]: any
}
export type routesType = routeType['routes']

export default class RouterSystem {
    protected routes: routesType
    public restart: (routes: routesType) => void

    /**
     * @return cloneDeep routes
     */
    public getRoot: () => routesType

    public add: (route: routeType, pathname?: string) => void
    /**
     * @return removed route
     */
    public remove: (pathname?: string) => routeType | void
    public find: (pathname: string) => {
        path: number[]
        target: routeType
    }
    /**
     * @description Use 'assign' merge routeConfig.
     */
    public update: (pathname: string, newRoute: routeType) => void
}
```

## Usage

```typescript
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

const router1 = new RouterSystem(_.cloneDeep(routes))
router1.find('/home2/child') // { target: routes[1].routes[0], path: [1, 0] }
router1.find('/home2/3333') // { target: {}, path: [] }
router1.update('/home2/child', {
    breadcrumb: 'home2/child(updated)'
})
router1.find('/home2/child')
//  target: { ...routes[1].routes[0], breadcrumb: 'home2/child(updated)' }, path: [1, 0] }

const router2 = new RouterSystem(_.cloneDeep(routes))
router2.remove('/home2') // routes[1]
router2.find('/home2') // { target: {}, path: [] }
```
