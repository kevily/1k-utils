## Type

```typescript
function getFileAccept<
    T extends
        | 'excel'
        | 'xls'
        | 'xlsx'
        | 'word'
        | 'doc'
        | 'docx'
        | 'image'
        | 'jpg'
        | 'png'
        | 'gif'
        | 'webp'
        | 'video'
        | 'audio',
    S extends keyof acceptType[T]
>(fileType: T | T[]): string
```

## Usage

```typescript
getFileAccept('xls')
// => 'application/vnd.ms-excel'
getFileAccept(['xls', 'xlsx'])
getFileAccept('excel')
// => 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
getFileAccept(['excel', 'image'])
//  => 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpg, image/jpeg,png,image/png, image/x-png,image/gif, image/webp'
```
