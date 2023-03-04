import { isNil, isBoolean } from 'lodash'

const KEYS = new Set<string>()
interface configType {
    key: string
    isOnlyGet: boolean
}
class Storage<DATA> {
    private storage: globalThis.Storage
    private config: configType
    constructor(storage: globalThis.Storage, config: configType) {
        this.storage = storage
        this.config = config
    }
    public get(isOnlyGet?: boolean): DATA {
        const isClear = isBoolean(isOnlyGet) ? isOnlyGet : this.config.isOnlyGet
        let newVal = this.storage.getItem(this.config.key)
        if (isNil(newVal)) {
            return newVal
        }
        if (isClear) {
            this.storage.removeItem(this.config.key)
        }
        try {
            newVal = JSON.parse(newVal)
        } catch (err) {}

        return newVal as DATA
    }
    public set(val: DATA) {
        try {
            this.storage.setItem(this.config.key, JSON.stringify(val))
            return true
        } catch {
            return false
        }
    }
    public remove(): DATA {
        const val = this.get()
        if (!isNil(val)) {
            this.storage.removeItem(this.config.key)
        }

        return val as DATA
    }
}

export default function createStorage<DATA>(type: 'session' | 'local') {
    if (type !== 'session' && type !== 'local') {
        throw new Error('The parameter must be session or local.')
    }
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    const instance = (key: string, config?: Omit<configType, 'key'>) => {
        if (KEYS.has(key)) {
            throw new Error(`${key} storage already initialized!`)
        }
        const storageInstace = new Storage<DATA>(storage, { key, ...config })
        KEYS.add(key)
        return storageInstace
    }
    const getAllData = (keys: string[]) => {
        const result: { [key: string]: any } = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            let val = storage.getItem(key)
            try {
                val = JSON.parse(val)
            } catch (err) {}
            result[key] = val
        }
        return result
    }

    instance.getMyAllKeys = () => [...KEYS]
    instance.getMyAllData = () => getAllData(instance.getMyAllKeys())
    instance.getAllKeys = () => {
        const len = storage.length
        const keys: string[] = []
        for (let i = 0; i < len; i++) {
            keys.push(storage.key(i))
        }
        return keys
    }
    instance.getAllData = () => getAllData(instance.getAllKeys())
    instance.clearMyAllData = () => {
        const keys = instance.getMyAllKeys()
        for (let i = 0; i < keys.length; i++) {
            storage.removeItem(keys[i])
        }
    }
    instance.clearAllData = () => storage.clear()

    return instance
}
