import { ruleType } from './index';
export declare type validatorsFn = (rule: any, value: any) => boolean;
export declare type validatorsType = {
    [key in keyof ruleType]: validatorsFn;
};
declare const validators: validatorsType;
export default validators;
