import has from 'lodash/has'

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
        all: 'image/*',
    },
    video: {
        all: 'video/*',
    },
}

type acceptType = typeof accept

function getAllFileTye(fileTypes) {
    return fileTypes
        .forEach((t) => {
            const current: acceptType[T] = accept[t]
            if (has(current, 'all')) {
                return current.all
            } else {
            }
        })
        .join(',')
}

export default function <T extends keyof acceptType>(
    fileType: T | T[],
    suffix?: keyof acceptType[T]
) {
    let result: string = ''
    if (Array.isArray(fileType)) {
        result = getAllFileTye(fileType)
    }

    return result
}
