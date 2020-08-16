import find from './lib/find'

export interface routeType {
    breadcrumb?: string
    path?: string
    routes?: routesType
    [key: string]: any
}
export type routesType = routeType[]

export default {
    find
}
