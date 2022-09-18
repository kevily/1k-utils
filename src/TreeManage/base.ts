import { clone, map, omit, size } from 'lodash'

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

export function flat<T extends Record<string, any>>(
    tree: T[],
    childrenField = 'children',
    depth = 1
): T[] {
    const nodes: T[] = []
    let currentDepth = 0
    function run(tree: T[]) {
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i]
            nodes.push(clone(omit(node, childrenField)) as T)
            if (Array.isArray(node.tree) && currentDepth < depth) {
                currentDepth += 1
                run(node[childrenField])
            }
        }
    }
    run(tree)
    return nodes
}
