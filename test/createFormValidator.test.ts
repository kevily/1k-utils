import createFormValidator from '../src/createFormValidator'

test('passed', () => {
    const formatValidator = createFormValidator([
        {
            fieldname: 'name',
            rules: [
                {
                    name: 'required',
                    rule: true,
                    message: 'required error'
                },
                {
                    name: 'maxLen',
                    rule: 3,
                    message: 'maxLen error'
                },
                {
                    name: 'minLen',
                    rule: 2,
                    message: 'minLen error'
                },
                {
                    name: 'validator',
                    rule(value) {
                        return value === '123'
                    },
                    message: 'validator error'
                }
            ]
        }
    ])
    expect(formatValidator({ name: '123' })).toEqual({ result: true, message: '' })
})

test('required errpr', () => {
    const formatValidator = createFormValidator([
        {
            fieldname: 'name',
            rules: [
                {
                    name: 'required',
                    rule: true,
                    message: 'required error'
                }
            ]
        }
    ])
    expect(formatValidator({ name: null })).toEqual({ result: false, message: 'required error' })
})

test('maxLen errpr', () => {
    const formatValidator = createFormValidator([
        {
            fieldname: 'name',
            rules: [
                {
                    name: 'maxLen',
                    rule: 3,
                    message: 'maxLen error'
                }
            ]
        }
    ])
    expect(formatValidator({ name: '1234' })).toEqual({ result: false, message: 'maxLen error' })
})

test('minLen errpr', () => {
    const formatValidator = createFormValidator([
        {
            fieldname: 'name',
            rules: [
                {
                    name: 'minLen',
                    rule: 2,
                    message: 'minLen error'
                }
            ]
        }
    ])
    expect(formatValidator({ name: '1' })).toEqual({ result: false, message: 'minLen error' })
})

test('validator errpr', () => {
    const formatValidator = createFormValidator([
        {
            fieldname: 'name',
            rules: [
                {
                    name: 'validator',
                    rule(value) {
                        return value === '123'
                    },
                    message: 'validator error'
                }
            ]
        }
    ])
    expect(formatValidator({ name: 'validator' })).toEqual({
        result: false,
        message: 'validator error'
    })
})
