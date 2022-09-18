import TreeManage from './TreeManage'

export interface routeType {
    path: string
    routes?: routeType[]
    [key: string]: any
}

export default class RouterManage<R extends routeType, P extends R['path'] = R['path']> {
    private routesManage: TreeManage<R, P>
    constructor(routes: R[]) {
        this.routesManage = new TreeManage(routes, {
            fieldNames: {
                key: 'path',
                children: 'routes'
            }
        })
    }
    public init(routes: R[]) {
        this.routesManage.init(routes, {
            fieldNames: {
                key: 'path',
                children: 'routes'
            }
        })
    }
    public get routes(): R[] {
        return this.routesManage.tree
    }
    public has(path: P) {
        return this.routesManage.has(path)
    }
    public findIndexPath(path: P) {
        return this.routesManage.findIndexPath(path)
    }
    public findThePassingPath(path: P) {
        return this.routesManage.findThePassingPath(path)
    }
    public findThePassingRoute(path: P): R[] {
        return this.routesManage.findThePassingNode(path)
    }
    public findRoute(path: P): R {
        return this.routesManage.findNode(path)
    }
    public search(field: keyof R, values: string[], isSameChain = false): R[] {
        return this.routesManage.search(field, values, isSameChain)
    }
    public insert(indexPath: (string | number)[], newRoute: R, overwrite?: boolean): boolean {
        return this.routesManage.insert(indexPath, newRoute, overwrite)
    }
    public update(path: P, newRoute: Partial<R>): boolean {
        return this.routesManage.update(path, newRoute)
    }
    public remove(path: P): boolean {
        return this.routesManage.remove(path)
    }
}
