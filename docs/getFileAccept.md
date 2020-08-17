## Type

```typescript
const accept: {
    excel: {
        xls: string
        xlsx: string
    }
    word: {
        doc: string
        docx: string
    }
    image: {
        jpg: string
        png: string
        gif: string
        webp: string
    }
    video: {}
}
function getFileAccept<T extends keyof acceptType, S extends keyof acceptType[T]>(
    fileType: T | T[],
    suffix?: S | S[]
): string
```

## Usage

```typescript
getFileAccept('excel', 'xls')
getFileAccept('excel', ['xls'])
// => 'application/vnd.ms-excel'
getFileAccept('excel', ['xls', 'xlsx'])
getFileAccept('excel')
// => 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
getFileAccept(['excel', 'image'])
//  => 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpg, image/jpeg,png,image/png, image/x-png,image/gif, image/webp'
```
