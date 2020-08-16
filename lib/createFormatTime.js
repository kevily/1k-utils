import isArray from 'lodash/isArray';
import each from 'lodash/each';
import size from 'lodash/size';
const DATE_FORMAT = {
    DD: 'YYYY-MM-DD',
    HH: 'YYYY-MM-DD HH',
    mm: 'YYYY-MM-DD HH:mm',
    ss: 'YYYY-MM-DD HH:mm:ss'
};
const formatFn = {
    unix(fn, time, format, defaultValue) {
        return time ? fn(time * 1000).format(format) : defaultValue;
    },
    default(fn, time, format, defaultValue) {
        return time ? fn(time).format(format) : defaultValue;
    }
};
/**
 *
 * @param fn dayjs | moment
 * @param format 时间格式字段
 * @param time 需要被格式化的数据
 * @param defaultValue 值不存在的时候使用
 */
function createFormatTime(fn, format, dataType = 'default') {
    return function (time, defaultValue) {
        if (isArray(time)) {
            const formatTime = createFormatTime(fn, format, dataType);
            let _times = [];
            each(time, t => {
                if (t) {
                    _times.push(formatTime(t, ''));
                }
            });
            return size(_times) === size(time) ? _times.join('~') : defaultValue;
        }
        return formatFn[dataType](fn, time, DATE_FORMAT[format], defaultValue);
    };
}
export default createFormatTime;
