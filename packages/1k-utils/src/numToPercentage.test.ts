import { test, expect } from 'vitest'
import numToPercentage from './numToPercentage'

test('numToPercentage', () => {
    expect(numToPercentage(10, 100)).toEqual(10)
    expect(numToPercentage(10, 0)).toEqual(0)
})
