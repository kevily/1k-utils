import map from 'lodash/map'
import isArray from 'lodash/isArray'

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
    video: {},
}

type acceptType = typeof accept

function getAllFileTye<T extends keyof acceptType>(fileTypes: T[]) {
    return map(fileTypes, (key) => map(accept[key], (value) => value)).join(',')
}

export default function <T extends keyof acceptType>(
    fileType: T | T[],
    suffix?: keyof acceptType[T]
) {
    let result: string = ''
    if (Array.isArray(fileType)) {
        result = getAllFileTye<T>(fileType)
    }

    return result
}
