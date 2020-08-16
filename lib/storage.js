import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import has from 'lodash/has';
const win = window;
const cache = {};
class Storage {
    constructor(type) {
        this.storage = type === 'local' ? win.localStorage : win.sessionStorage;
    }
    get(key) {
        let newVal = this.storage.getItem(key);
        if (isNil(newVal)) {
            return newVal;
        }
        try {
            newVal = JSON.parse(newVal);
        }
        catch (err) { }
        return newVal;
    }
    set(key, val, before) {
        let newVal = val;
        if (isFunction(before)) {
            const oldVal = this.get(key);
            newVal = before(oldVal, newVal);
        }
        this.storage.setItem(key, JSON.stringify(newVal));
        return newVal;
    }
    remove(key) {
        const val = this.get(key);
        if (!isNil(val)) {
            this.storage.removeItem(key);
        }
        return val;
    }
}
export default function (type) {
    if (type !== 'session' && type !== 'local') {
        throw new Error('参数必须是session与local其中一个');
    }
    if (!has(cache, type)) {
        cache[type] = new Storage(type);
    }
    return cache[type];
}
