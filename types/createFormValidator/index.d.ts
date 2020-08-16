export interface ruleType {
    required: boolean;
    minLen: number;
    maxLen: number;
    /** custom rule*/
    validator?: (value: any) => boolean;
}
export declare type ruleKeys = keyof ruleType;
declare type generatorRuleItem<K extends keyof ruleType> = {
    /** rule key */
    name?: K;
    /** rule value */
    rule?: ruleType[K];
    /** error message */
    message: string;
};
export interface ruleConfigType<F> {
    fieldname: F;
    rules: Array<generatorRuleItem<'required'> | generatorRuleItem<'minLen'> | generatorRuleItem<'maxLen'> | generatorRuleItem<'validator'>>;
}
/**
 * @params rules 验证规则
 * @params dataSource 要验证的数据
 * @params validateFields 需要验证的字段名，不填则默认为全部
 * @return 基于传入的验证规则生成的验证器
 */
export default function createFormValidator<F extends string>(ruleConfigs: ruleConfigType<F>[]): (dataSource: any, validateFields?: Array<F>) => {
    result: boolean;
    message: string;
};
export {};
