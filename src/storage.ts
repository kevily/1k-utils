import isNil from 'lodash/isNil'

type storageType = 'session' | 'local'

class Storage {
    private storage: globalThis.Storage
    constructor(type: storageType) {
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage
    }
    public get(key: string): any {
        let newVal = this.storage.getItem(key)
        if (isNil(newVal)) {
            return newVal
        }
        try {
            newVal = JSON.parse(newVal)
        } catch (err) {}
        return newVal
    }
    public set(key: string, val: any) {
        this.storage.setItem(key, JSON.stringify(val))
    }
    public remove(key: string): any {
        const val = this.get(key)
        if (!isNil(val)) {
            this.storage.removeItem(key)
        }
        return val
    }
    public getKeys() {
        const len = this.storage.length
        const keys: string[] = []
        for (let i = 0; i < len; i++) {
            keys.push(this.storage.key(i))
        }
        return keys
    }
    public getAll() {
        const result: { [key: string]: any } = {}
        const keys = this.getKeys()
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            result[key] = this.get(key)
        }
        return result
    }
    public clear() {
        return this.storage.clear()
    }
}

export default function (type: storageType): Storage {
    if (type !== 'session' && type !== 'local') {
        throw new Error('The parameter must be session or local.')
    }
    return new Storage(type)
}
