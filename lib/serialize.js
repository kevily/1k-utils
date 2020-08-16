import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isObjectLike from 'lodash/isObjectLike';
import isArray from 'lodash/isArray';
import each from 'lodash/each';
const setRequestParams = (name, val, params) => {
    if (isNil(val)) {
        return;
    }
    if (isObject(val)) {
        for (const k in val) {
            setRequestParams(`${name}[${k}]`, val[k], params);
        }
    }
    else {
        params.push(`${name}=${encodeURIComponent(val)}`);
    }
};
/**
 *
 * @param data 需要处理成地址参数的对象
 * @return 地址参数，不带问号
 */
function serialize(data) {
    if (!isArray(data) && isObjectLike(data)) {
        let params = [];
        each(data, (val, key) => setRequestParams(key, val, params));
        return params.join('&');
    }
    return '';
}
export default serialize;
