import { compact, isBoolean, isNil } from 'es-toolkit'
import { times } from 'es-toolkit/compat'
import { baseConfigType } from './type'
import { DRIVER } from './constant'

export class BaseStorage {
    readonly config: baseConfigType
    constructor(config: baseConfigType) {
        this.config = config
    }
    get<DATA>(key: string, isClear = false): DATA | undefined {
        const { driver, isClearByGet } = this.config
        const $isClear = isBoolean(isClear) ? isClear : isClearByGet
        const newVal = driver.getItem(key)
        if (isNil(newVal)) {
            return void 0
        }
        if ($isClear) {
            driver.removeItem(key)
        }
        try {
            return JSON.parse(newVal)
        } catch {
            return void 0
        }
    }

    set<DATA>(key: string, val: DATA) {
        const { driver } = this.config
        try {
            driver.setItem(key, JSON.stringify(val))
            return true
        } catch {
            return false
        }
    }

    remove<DATA>(key: string): DATA | undefined {
        const { driver } = this.config
        const val = this.get<DATA>(key)
        if (!isNil(val)) {
            driver.removeItem(key)
        }
        return val
    }

    keys() {
        const { driver } = this.config
        return compact(times(driver.length, i => driver.key(i)))
    }

    items<DATA extends Record<string, any>>(): DATA {
        const result: Record<string, any> = {}
        this.keys().forEach(key => {
            result[key] = this.get(key)
        })
        return result as DATA
    }
}

export const local = new BaseStorage({ driver: DRIVER.LOCAL })
export const session = new BaseStorage({ driver: DRIVER.SESSION })
