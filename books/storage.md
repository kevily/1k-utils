## Types

> Storage

```typescript
storage(key: 'local' | 'session'): Actions
```

> Actions

```typescript
function get( key: string ) => value

function set( key: string, newVal: any, before: ( oldval: any, newVal: any ) => newVal ) => newVal

function remove( key: string ) => value

function update( key: string, updater: (val: any) => void )
```





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
