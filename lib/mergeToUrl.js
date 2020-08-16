import serialize from './serialize';
import isObject from 'lodash/isObject';
export default function (url, query) {
    if (!url || !isObject(query) || Array.isArray(query)) {
        return url;
    }
    let mark = '?';
    if (url.endsWith('?') || url.endsWith('&')) {
        mark = '';
    }
    else if (url.includes('?')) {
        mark = '&';
    }
    return url + mark + serialize(query);
}
