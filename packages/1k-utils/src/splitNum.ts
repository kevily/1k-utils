import { toString, size } from 'es-toolkit/compat'

/**
 *  @example split(12, 6) => ['0', '0', '0', '0', '1', '2']
 */
export default function splitNum(target: number, len?: number): string[] {
    let result = toString(target).split('')
    if (len) {
        result = Array(len - size(result))
            .fill('0')
            .concat(result)
    }
    return result
}
