## Types

```typescript
interface ruleConfigType {
    fieldname: string
    rules: [
        {
            name: 'required' | 'minLen' | 'maxLen' | 'validator'
            rule: string | number | boolean
            message: string
        }
    ]
}

function createFormValidator(
    ruleConfigs: ruleConfigType[]
): (
    dataSource: { [key: string]: any },
    validateFields?: Array<ruleConfigType['fieldname']>
) => {
    result: boolean
    message: string
}
```

## Usage

#### pass

```typescript
createFormValidator([
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
])({ name: '123' })
// => { result: true, message: '' }
```

#### required error

```typescript
createFormValidator([
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
])({ name: null })
// => { result: false, message: 'required error' }
```

#### maxLen error

```typescript
createFormValidator([
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
])({ name: '1234' })
// => { result: false, message: 'maxLen error' }
```

#### minLen error

```typescript
createFormValidator([
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
])({ name: '1' })
// => { result: false, message: 'minLen error' }
```

#### validator error

```typescript
createFormValidator([
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
])({ name: 'validator' })
/// => { result: false, message: 'validator error' }
```
