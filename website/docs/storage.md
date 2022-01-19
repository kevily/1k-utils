---
title: storage
---

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
```

## Usage

```javascript
const _storage = storage('local' | 'session')
_storage.set('key', { key: '111' })
// => { key: '111' }
_storage.get('key')
// => { key: '111' }
_storage.remove('key')
// => { key: '111' }
storage('local').set('key', '2', (oldVal, newVal) => {
    return {
        ...oldVal,
        key2: newVal
    }
})
// => { key: '111', key2: '2' }
```
