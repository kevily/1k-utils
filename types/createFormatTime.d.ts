export declare type formatType = keyof typeof DATE_FORMAT;
export declare type dataType = keyof typeof formatFn;
declare const DATE_FORMAT: {
    DD: string;
    HH: string;
    mm: string;
    ss: string;
};
declare const formatFn: {
    unix(fn: any, time: any, format: string, defaultValue: string): any;
    default(fn: any, time: any, format: string, defaultValue: string): any;
};
/**
 *
 * @param fn dayjs | moment
 * @param format 时间格式字段
 * @param time 需要被格式化的数据
 * @param defaultValue 值不存在的时候使用
 */
declare function createFormatTime(fn: Function, format: formatType, dataType?: dataType): (time: any | any[], defaultValue?: string) => string;
export default createFormatTime;
