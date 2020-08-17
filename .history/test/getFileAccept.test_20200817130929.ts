import getFileAccept from '../src/getFileAccept'

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

test('getFileAccept', () => {
    expect(getFileAccept('excel', ['xls', 'xlsx'])).toBe(`${accept.excel.xls},${accept.excel.xlsx}`)
})
