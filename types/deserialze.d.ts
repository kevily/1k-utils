interface resultType {
    [key: string]: any;
}
/**
 *
 * @param data 需要被反序列化的字符串
 * @return 反序列化后的数据
 */
declare function deserialze(data: string): resultType;
export default deserialze;
