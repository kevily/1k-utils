import nativeId from '../src/nativeId'

test('nativeId', () => {
    expect(typeof nativeId()).toBe('string')
})
