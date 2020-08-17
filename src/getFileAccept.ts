import map from 'lodash/map'
import isArray from 'lodash/isArray'

export const accept = {
    excel: {
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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

function getSuffixFileType<T extends keyof acceptType, S extends keyof acceptType[T]>(
    fileType: T,
    suffix: S | S[]
) {
    const current = accept[fileType]
    if (isArray(suffix)) {
        return map(suffix, (value) => current[value]).join(',')
    } else if (suffix) {
        return current[suffix]
    } else {
        return map(current, (value) => value).join(',')
    }
}

export default function <T extends keyof acceptType, S extends keyof acceptType[T]>(
    fileType: T | T[],
    suffix?: S | S[]
) {
    if (Array.isArray(fileType)) {
        return getAllFileTye<T>(fileType)
    } else {
        return getSuffixFileType<T, S>(fileType, suffix)
    }
}
