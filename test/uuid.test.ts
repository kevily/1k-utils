import uuid from '../src/uuid'

test('uuid', () => {
    expect(typeof uuid()).toBe('string')
})
