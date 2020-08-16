import { routeType, routesType } from '../index'
import isArray from 'lodash/isArray'
import size from 'lodash/size'
import startsWith from 'lodash/startsWith'

function chain(routes: routesType, pathname: string): routesType {
    const result: routesType = []
    let target: routeType = {}
    let i = 0
    while (true) {
        target = routes[i]
        if (!target || pathname === target.path) {
            result.push(target)
            break
        }
        // find parent
        // ----------------------------------------------------------------------
        if (startsWith(pathname, target.path)) {
            if (isArray(target.routes)) {
                routes = target.routes
                i = 0
                result.push(target)
                continue
            } else {
                break
            }
        }
        i += 1
        if (size(routes) <= i) {
            break
        }
    }
    return result
}

function flat(routes: routesType, pathname: string): routesType {
    const result: routesType = []
    for (let index = 0; index < routes.length; index++) {
        const route = routes[index]
        if (startsWith(pathname, route.path)) {
            result.push(route)
            if (pathname === route.path) {
                break
            }
        }
    }
    result.sort((a, b) => size(a.path) - size(b.path))
    return result
}

export default function (routes: routesType, pathname: string, isChain = false): routesType {
    return isChain ? chain(routes, pathname) : flat(routes, pathname)
}
