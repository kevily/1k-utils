export interface treeNodeType {
    [key: string]: any;
}
export declare function BFS(treeList: treeNodeType[], childrenKey: string, setTreeNode: (treeNode: treeNodeType, index: number) => void): void[];
