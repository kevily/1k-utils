export interface dataType {
    [key: string]: any;
}
/**
 *
 * @param data 需要处理成地址参数的对象
 * @return 地址参数，不带问号
 */
declare function serialize(data?: dataType): string;
export default serialize;
