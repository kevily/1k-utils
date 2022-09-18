import qs from 'qs'
import isObject from 'lodash/isObject'

export default function (url: string, query: Record<string, any>): string {
    if (!url || !isObject(query) || Array.isArray(query)) {
        return url
    }
    let mark = '?'
    if (url.endsWith('?') || url.endsWith('&')) {
        mark = ''
    } else if (url.includes('?')) {
        mark = '&'
    }
    return url + mark + qs.stringify(query)
}
