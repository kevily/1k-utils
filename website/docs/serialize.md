---
title: serialize
---

## Types

```typescript
function serialize(data?: { [key: string]: any }): string
```

## Usage

```typescript
serialize({ key: 'a', arr: ['111', 2] })
// => 'key=a&arr[0]=111&arr[1]=2'
serialize(['111', { a: '1' }])
// => ''
serialize('111')
// => ''
serialize(null)
// => ''
serialize()
// => ''
serialize(1)
// => ''
```
