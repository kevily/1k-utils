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
function getSuffixFileType<T extends keyof acceptType>() {}

export default function <T extends keyof acceptType, S extends keyof acceptType[T]>(
    fileType: T | T[],
    suffix?: S | Array<S>
) {
    let result: string = ''
    if (Array.isArray(fileType)) {
        result = getAllFileTye<T>(fileType)
    } else {
    }

    return result
}
