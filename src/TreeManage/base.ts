import { assign, clone, isFunction, map, omit, size } from 'lodash'

/**
 * @description Merge currentPath to parentPath.
 * @param parentPath
 * @param currentPath
 * @returns whole path
 */
export function mergePath(parentPath: string, currentPath: string): string {
    return !parentPath ? currentPath : `${parentPath}-${currentPath}`
}

/**
 * @description transform indexPath to lodash.get path.
 * @description indexToLodashPath([0,1,2]) -> '[0].children[1].children[2]'
 * @param indexPath
 * @param childrenFieldName
 * @returns lodash usable path
 */
export function indexPathToLodashPath(
    indexPath: (string | number)[],
    childrenFieldName = 'children'
): string {
    if (size(indexPath) <= 0) {
        return ''
    }
    return `[${indexPath.join(`].${childrenFieldName}[`)}]`
}

/**
 * @param path
 * @returns By default, return parent path.
 * @returns If you set allPath as true, return every path from top level node to tail
 */
export function getWholePath(path: string): string[] {
    const indexes = path.split('-')
    let prevIndex = ''

    return map(indexes, path => {
        prevIndex = prevIndex === '' ? path : `${prevIndex}-${path}`
        return prevIndex
    })
}

interface flatConfigType<T> {
    childrenField?: string
    depth?: number
    parentNode?: T
    iteratee?: (data: {
        node: T
        children: T[]
        prevNode?: T
        parentNode?: T
        index: number
    }) => void
}

export function flat<T extends Record<string, any>>(tree: T[], config?: flatConfigType<T>): T[] {
    const __config__ = assign<flatConfigType<T>, flatConfigType<T>>(
        { childrenField: 'children', depth: 1 },
        config || {}
    )
    const nodes: T[] = []
    let currentDepth = 0

    function run(tree: T[], parentNode?: T) {
        let prevNode: Partial<T> = {}
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i]
            const newNode = clone(omit(node, __config__.childrenField!)) as T
            const children = node[__config__.childrenField!]
            if (isFunction(__config__.iteratee)) {
                __config__.iteratee({
                    node: newNode,
                    children,
                    prevNode: prevNode as T,
                    parentNode,
                    index: i
                })
            }
            nodes.push(newNode)
            prevNode = newNode
            if (Array.isArray(children) && currentDepth < __config__.depth!) {
                currentDepth += 1
                run(children, newNode)
            }
        }
    }

    run(tree, __config__.parentNode)
    return nodes
}
