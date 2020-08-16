import size from 'lodash/size'
import { ruleType } from './index'

export type validatorsFn = (rule: any, value: any) => boolean
export type validatorsType = {
    [key in keyof ruleType]: validatorsFn
}

const validators: validatorsType = {
    required(rule, value) {
        return rule ? !!value : true
    },
    minLen(rule, value) {
        return size(value) >= rule
    },
    maxLen(rule, value) {
        return size(value) <= rule
    }
}

export default validators
