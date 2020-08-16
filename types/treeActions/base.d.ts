/**
 * @description Merge currentPath to parentPath.
 * @param parentPath
 * @param currentPath
 * @returns whole path
 */
export declare function mergePath(parentPath: string, currentPath: string): string;
/**
 * @description transform indexPath to lodash.get path.
 * @description indexToLodashPath('0-1-2') -> '[0].children[1].children[2]'
 * @param indexPath
 * @returns lodash usable path
 */
export declare function indexToLodashPath(indexPath: string): string;
/**
 * @param indexPath
 * @param allPath By default is false.
 * @returns By default, return parent path.
 * @returns If you set allPath as true, return every path from top level node to tail
 */
export declare function getParentPath(indexPath: string, allPath?: boolean): undefined | string | string[];
