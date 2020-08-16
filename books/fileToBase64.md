## Types

```typescript
function (file: Blob | File): Promise<any>
```

## Usage

```typescript
fileToBase64(file)
// then => 'data:...'

fileToBase64('')
// catch => 'File resolution failed'
```
