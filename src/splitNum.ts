import { toString, concat, size } from 'lodash'

/**
 *  @example split(12, 6) => ['0', '0', '0', '0', '1', '2']
 */
export default function splitNum(target: number, len?: number): string[] {
    let result = toString(target).split('')
    if (len) {
        result = concat(Array(len - size(result)).fill('0'), result)
    }
    return result
}
