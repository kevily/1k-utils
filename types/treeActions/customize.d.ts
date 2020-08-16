import { treeNode } from './index';
export interface anyObj {
    [key: string]: any;
}
export interface customizeArgType {
    treeList: any[];
    /** default 'children' */
    childrenKey?: string;
    setTreeNode?: (treeNode: anyObj, index: number, parentTree?: anyObj) => void;
    parentTree?: treeNode;
}
/**
 * @description Auto add indexPath.
 * @param parentTree
 * @param childrenKey default 'children'
 * @returns new TreeList,  children field === 'children'
 */
export default function customize({ treeList, setTreeNode, parentTree, childrenKey }: customizeArgType): treeNode[];
