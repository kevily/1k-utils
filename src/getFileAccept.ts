import map from 'lodash/map'
import isArray from 'lodash/isArray'

function createAccept() {
    const accept = {
        // excel
        // ----------------------------------------------------------------------
        excel: '',
        xls: 'application/vnd.ms-excel,application/wps-office.xls',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/wps-office.xlsx',
        // word
        // ----------------------------------------------------------------------
        word: '',
        doc: 'application/msword,application/wps-office.doc',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/wps-office.docx',
        // image
        // ----------------------------------------------------------------------
        image: 'image/*',
        jpg: 'image/jpg, image/jpeg',
        png: 'image/png, image/x-png',
        gif: 'image/gif',
        webp: 'image/webp',
        // video
        // ----------------------------------------------------------------------
        video: 'video/*',
        mp4: 'video/mp4',
        // audio
        // ----------------------------------------------------------------------
        audio: 'audio/*',
        mp3: 'audio/mpeg',
        flac: 'audio/flac',
        // ppt
        // ------------------------------------------------------------------------
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        // pdf
        // ------------------------------------------------------------------------
        pdf: 'application/pdf',
        // other
        // ------------------------------------------------------------------------
        txt: 'text/plain'
    }
    accept.excel = `${accept.xls},${accept.xlsx}`
    accept.word = `${accept.doc},${accept.docx}`
    return accept
}

export type acceptType = ReturnType<typeof createAccept>

export default function <T extends keyof acceptType>(fileType: T | T[]) {
    const accept = createAccept()
    if (isArray(fileType)) {
        return map(fileType, value => accept[value]).join(',')
    }
    return accept[fileType] || ''
}
