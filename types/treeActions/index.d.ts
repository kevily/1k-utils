import getTreeNodes from './getTreeNodes';
import loadParentTree from './loadParentTree';
import customize from './customize';
export interface treeNode {
    id: string;
    ParentId?: string;
    children: treeNode[];
    indexPath: string;
    [key: string]: any;
}
declare const _default: {
    getTreeNodes: typeof getTreeNodes;
    loadParentTree: typeof loadParentTree;
    customize: typeof customize;
    mergePath(parentPath: string, currentPath: string): string;
    indexToLodashPath(indexPath: string): string;
    getParentPath(indexPath: string, allPath?: boolean): string | string[];
};
export default _default;
