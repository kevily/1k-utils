import getFileAccept, { accept } from '../src/getFileAccept'

test('getFileAccept', () => {
    expect(getFileAccept('excel', 'xls')).toBe(accept.excel.xls)
    expect(getFileAccept('excel', 'xlsx')).toBe(accept.excel.xlsx)
    expect(getFileAccept('excel', ['xls'])).toBe(`${accept.excel.xls}`)
    expect(getFileAccept('excel', ['xls', 'xlsx'])).toBe(`${accept.excel.xls},${accept.excel.xlsx}`)
    expect(getFileAccept('excel')).toBe(`${accept.excel.xls},${accept.excel.xlsx}`)
    expect(getFileAccept(['excel', 'image'])).toBe(
        `${accept.excel.xls},${accept.excel.xlsx},${accept.image.jpg},${accept.image.png},${accept.image.gif},${accept.image.webp}`
    )
})
