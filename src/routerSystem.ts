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
    constructor(routes: routesType) {
        this.restart(routes)
    }
    public restart(routes: routesType) {
        this.routes = isArray(routes) ? routes : []
    }

    /**
     * @return cloneDeep routes
     */
    public getRoot() {
        return cloneDeep(this.routes)
    }

    public add(route: routeType, pathname?: string) {
        const parentRoute = this.find(pathname).target?.routes || this.routes
        parentRoute.push(route)
    }
    /**
     * @return removed route
     */
    public remove(pathname?: string) {
        if (isString(pathname)) {
            const { path } = this.find(pathname)
            const currentIndex = path.pop()
            let parentRoutes = this.routes
            forEach(path, i => {
                parentRoutes = parentRoutes[i].routes
            })
            return first(pullAt(parentRoutes, [currentIndex]))
        }
        return void 0
    }
    public find(pathname: string) {
        const result = {
            path: [] as number[],
            target: {} as routeType
        }
        if (isString(pathname)) {
            let i = 0
            let currentRoutes = this.routes
            while (true) {
                const route = currentRoutes[i]
                if (pathname === route?.path) {
                    result.path.push(i)
                    result.target = route
                    break
                }
                // find parent
                // ----------------------------------------------------------------------
                if (startsWith(pathname, `${route.path}/`)) {
                    if (isArray(route.routes)) {
                        currentRoutes = route.routes
                        result.path.push(i)
                        i = 0
                        continue
                    } else {
                        break
                    }
                }
                i += 1
                if (size(currentRoutes) <= i) {
                    break
                }
            }
        }
        if (!isString(result.target?.path)) {
            result.path = []
            result.target = {}
        }
        return result
    }
    /**
     * @description Use 'assign' merge routeConfig.
     */
    public update(pathname: string, newRoute: routeType) {
        if (pathname && newRoute) {
            const { target } = this.find(pathname)
            assign(target, newRoute)
        }
    }
}
