import { toString, divide, times } from 'lodash'

/**
 * @example clipPercentageFromNum(65, 5) => [20, 20, 20, 5, 0]
 */
export default function clipPercentageFromNum(target: number, clipNum: number): string[] {
    const result = Array(clipNum).fill(0)
    const percentage = divide(100, clipNum)
    const fillNum = window.parseInt(toString(divide(target, percentage)))
    times(fillNum, i => {
        result[i] = percentage
    })
    if (fillNum < clipNum) {
        result[fillNum] = target - fillNum * percentage
    }
    return result
}
