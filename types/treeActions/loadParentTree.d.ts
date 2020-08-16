import { treeNode } from './index';
export default function (treeList: any[], nodeId: string, fetchTreeNode: (parentId: string) => Promise<treeNode>): Promise<treeNode>;
