import * as base from './base';
import getTreeNodes from './getTreeNodes';
import loadParentTree from './loadParentTree';
import customize from './customize';
export default Object.assign(Object.assign({}, base), { getTreeNodes,
    loadParentTree,
    customize });
