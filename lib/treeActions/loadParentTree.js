var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getTreeNodes from './getTreeNodes';
import customize from './customize';
import { indexToLodashPath } from './base';
import size from 'lodash/size';
import get from 'lodash/get';
import set from 'lodash/set';
import findIndex from 'lodash/findIndex';
export default function (treeList, nodeId, fetchTreeNode) {
    return __awaiter(this, void 0, void 0, function* () {
        //  lastNode.id === nodeId
        // ----------------------------------------------------------------------
        let node = getTreeNodes(treeList, [nodeId]);
        let lastNode = get(node, [0], {});
        if (size(node) <= 0) {
            let lastNodeIndexPath = get(node, '[0].indexPath', '');
            node = yield fetchTreeNode(nodeId);
            while (true) {
                const parentNode = yield fetchTreeNode(node.ParentId);
                const parentDataSource = getTreeNodes(treeList, [parentNode.id]);
                // Exists in the treeList, or parentNode is not exist
                // ----------------------------------------------------------------------
                if (!parentNode.ParentId || size(parentDataSource) > 0) {
                    node = customize({
                        treeList: [node],
                        parentTree: parentDataSource[0]
                    })[0];
                    lastNodeIndexPath = indexToLodashPath(lastNodeIndexPath);
                    lastNode = get(node, `children${lastNodeIndexPath}`);
                    // Merge to treeList
                    // ----------------------------------------------------------------------
                    set(treeList, indexToLodashPath(node.indexPath), node);
                    break;
                }
                // Merge children to parentNode, and assign parentNode to node
                // ----------------------------------------------------------------------
                const nodeIndex = findIndex(parentNode.children, (o) => o.id === node.id);
                parentNode.children[nodeIndex] = node;
                node = parentNode;
                // Record lastNodeIndexPath，used for pick lastNode
                // ----------------------------------------------------------------------
                lastNodeIndexPath = lastNodeIndexPath ? nodeIndex + lastNodeIndexPath : `${nodeIndex}`;
            }
        }
        return lastNode;
    });
}
