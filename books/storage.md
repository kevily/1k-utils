## Types

| api     | types                                                                                  |
| ------- | -------------------------------------------------------------------------------------- |
| storage | ( type: 'local' or 'session' ) => Function: get or set or remove                       |
| get     | ( key: string ) => value                                                               |
| set     | ( key: string, newVal: any, before: ( oldval: any, newVal: any ) => newVal ) => newVal |
| remove  | ( key: string ) => value                                                               |

## Usage

```javascript
const _storage = storage('local' | 'session')
_storage.set('key', { key: '111' }, (oldVal, newVal) => {
    console.log(oldVal)
    console.log(newVal)
})
// => { key: '111' }
_storage.get('key')
// => { key: '111' }
_storage.remove('key')
// => { key: '111' }
```
