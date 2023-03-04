import createStorage from '../src/createStorage'

const DATA = { test: '1', test2: '2', test3: '3' }
const DATA2 = { test: '1', test2: '2', test3: '3' }
const keys = {
    test: 'test',
    test2: 'test2'
}
const extra = {
    a: 'sss'
}

const localStorage = createStorage('local')

test('storage', () => {
    const testStoage = localStorage(keys.test)
    const test2Stoage = localStorage(keys.test2)
    testStoage.set(DATA)
    expect(testStoage.get()).toEqual(DATA)
    test2Stoage.set(DATA2)
    window.localStorage.setItem('extra', JSON.stringify(extra))
    expect(localStorage.getMyAllKeys()).toEqual([keys.test, keys.test2])
    expect(localStorage.getAllKeys()).toEqual([keys.test, keys.test2, 'extra'])
    expect(localStorage.getMyAllData()).toEqual({
        [keys.test]: DATA,
        [keys.test2]: DATA2
    })
    expect(localStorage.getAllData()).toEqual({
        [keys.test]: DATA,
        [keys.test2]: DATA2,
        extra
    })
    localStorage.clearMyAllData()
    expect(localStorage.getAllData()).toEqual({ extra })
    localStorage.clearAllData()
    expect(localStorage.getAllData()).toEqual({})
})
