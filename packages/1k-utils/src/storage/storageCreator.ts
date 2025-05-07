import { isNil } from 'es-toolkit'
import { BaseStorage } from './baseStorage'
import { storageConfigType } from './type'

export class StorageCreator<DATA> {
    readonly baseStorage: BaseStorage
    readonly key: string
    readonly defaultValue: DATA | undefined

    constructor(key: string, config: storageConfigType<DATA>) {
        this.baseStorage = new BaseStorage(config)
        this.key = key
        this.defaultValue = config.defaultValue
        this.init()
    }

    public get(isOnlyGet?: boolean): DATA | undefined {
        return this.baseStorage.get(this.key, isOnlyGet)
    }

    public set(val: DATA): boolean {
        return this.baseStorage.set(this.key, val)
    }

    public remove(): DATA | undefined {
        return this.baseStorage.remove(this.key)
    }
    reset() {
        if (isNil(this.defaultValue)) {
            this.remove()
        } else {
            this.set(this.defaultValue)
        }
    }
    init(newValue?: DATA) {
        const oldValue = this.get()
        if (oldValue) {
            return
        }
        const defaultValue = newValue || this.defaultValue
        if (isNil(defaultValue)) {
            return
        }
        this.set(defaultValue)
    }
}

export function create<DATA = any>(key: string, config: storageConfigType<DATA>) {
    if (!(config.driver instanceof globalThis.Storage)) {
        throw new Error('The parameter must be Storage.')
    }
    return new StorageCreator<DATA>(key, config)
}
