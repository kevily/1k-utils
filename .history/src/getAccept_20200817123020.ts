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
        png: 'image/png',
    },
}

type acceptType = typeof accept

export default function <T extends keyof acceptType>(fileType: T, suffix?: keyof acceptType[T]) {
    let result = accept[fileType]
    if (suffix) {
        result = result[suffix]
    }

    return result
}
