---
title: mergeToUrl
---

## Types

```typescript
function mergeToUrl(url: string, query: Object): string
```

## Usage

```typescript
const url = 'https://www.google.cn'

mergeToUrl(url, { key: 'value' })
mergeToUrl(url + '?', { key: 'value' })
mergeToUrl(url + '?', { key: 'value' })
// => 'https://www.google.cn?key=value'
mergeToUrl(url + '?a=1', { key: 'value' })
// => 'https://www.google.cn?a=1&key=value'
// Don't do that
// ----------------------------------------------------------------------
mergeToUrl(url + '&', { key: 'value' })
```
