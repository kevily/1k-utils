---
title: deserialze
---

## Types

```typescript
function deserialze(data: string): Object
```

## Usage

```typescript
const url = 'https://www.google.cn'
deserialze('a=1&b=2&c[a]=4&arr[0]=4')
deserialze('?&a=1&b=2&c[a]=4&arr[0]=4&?')
deserialze(url + '?key=0&arr[0]=1&arr[1]=2'))
deserialze(url + '?&key=0&arr[0]=1&arr[1]=2'))
// => {a: 1, b: 2, c: {a: 4}, arr: [4]}
```
