import storage from '../src/storage'

const DATA = { test: '1', test2: '2', test3: '3' }
const DATA2 = { test: '1', test2: '2', test3: '3' }
const keys = {
    test: 'test',
    test2: 'test2'
}

test('storage', () => {
    // local
    // ----------------------------------------------------------------------
    storage('local').set(keys.test, DATA)
    expect(storage('local').get(keys.test)).toEqual(DATA)
    storage('local').set(keys.test2, DATA2)
    expect(storage('local').getKeys()).toEqual([keys.test, keys.test2])
    expect(storage('local').getAll()).toEqual({
        [keys.test]: DATA,
        [keys.test2]: DATA2
    })
    storage('local').clear()
    expect(storage('local').getAll()).toEqual({})
})
