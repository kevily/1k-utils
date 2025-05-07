import { test, expect } from 'vitest'
import * as storage from '.'

const storageKeys = {
    test: 'test'
}
const value = {
    test: '1',
    test2: '2',
    test3: '3'
}
const testStorage = storage.create(storageKeys.test, {
    driver: storage.DRIVER.LOCAL,
    defaultValue: value
})

test('storage.keys', () => {
    expect(storage.local.keys()).toEqual(Object.keys(storageKeys))
})
test('storage.items', () => {
    expect(storage.local.items()).toEqual({
        [storageKeys.test]: testStorage.get()
    })
})
test('storage.get', () => {
    expect(testStorage.get()).toEqual(value)
})
