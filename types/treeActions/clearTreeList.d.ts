export interface anyObj {
    [key: string]: any;
}
declare type loopTreeNodeType = (treeNode: anyObj, index: number) => void;
/**
 * @description 用于把数据整理为前端可用的数据，预设部分字段数据，便于开发
 * @param arg 对象
 * @returns 整理过后的节点
 */
export default function clearTreeList(treeList: anyObj[], loopTreeNode: loopTreeNodeType, parentTree?: {}): any[];
export {};
