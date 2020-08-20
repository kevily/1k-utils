import storage from '../src/storage'

const DATA = { test: '1' }
const STRING = '1'

test('storage', () => {
    expect(storage('local').set('test', DATA)).toEqual(DATA)
    expect(storage('local').get('test')).toEqual(DATA)
    // val： string
    // ----------------------------------------------------------------------
    expect(storage('local').set('string', STRING)).toEqual(STRING)
    expect(storage('local').get('string')).toEqual(STRING)
    // session
    // ----------------------------------------------------------------------
    storage('session').set('test', DATA)
    expect(storage('session').get('test')).toEqual(DATA)
})
