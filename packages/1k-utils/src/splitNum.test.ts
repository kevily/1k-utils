import { test, expect } from 'vitest'
import splitNum from './splitNum'

test('splitNum', () => {
    expect(splitNum(12, 6)).toEqual(['0', '0', '0', '0', '1', '2'])
})
