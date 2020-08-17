import getFileAccept from '../src/getFileAccept'

test('getFileAccept', () => {
    expect(getFileAccept('excel', ['xls', 'xlsx']))
})
