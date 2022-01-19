---
title: getFileAccept
---

## Type

```typescript
interface accept {
    excel: string
    xls: string
    xlsx: string
    word: string
    doc: string
    docx: string
    image: string
    jpg: string
    png: string
    gif: string
    webp: string
    video: string
    mp4: string
    audio: string
    mp3: string
    flac: string
}
function getFileAccept<T extends keyof accept>(fileType: T | T[]): string
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
