const accept = {
    excel: {
        xls: 'application/vnd.ms-excel',
        xlsx: ' application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    word: {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    image: {
        jpg: 'image/jpg, image/jpeg',
        png: 'image/png, image/x-png',
        gif: 'image/gif',
        webp: 'image/webp',
    },
}

type acceptType = typeof accept

export default function <T extends keyof acceptType>(fileType: T, suffix?: keyof acceptType[T]) {
    let result: string = ''
    if (Array.isArray(fileType)) {
    }

    return result
}
