import { round, divide } from 'lodash'

/**
 * @example toPercentage(10, 100) => 10
 * @param {Number} precision default: 2
 */
export default function numToPercentage(dividend: number, divisor: number, precision = 2): number {
    let rate = 0
    if (divisor > 0) {
        rate = round(divide(dividend || 0, divisor) * 100, precision)
        rate = rate > 100 ? 100 : rate
    }
    return rate
}
