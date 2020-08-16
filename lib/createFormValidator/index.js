import size from 'lodash/size';
import includes from 'lodash/includes';
import get from 'lodash/get';
import validators from './validators';
function validateField(validateFields, fieldname) {
    return size(validateFields) > 0 ? includes(validateFields, fieldname) : true;
}
/**
 * @params rules 验证规则
 * @params dataSource 要验证的数据
 * @params validateFields 需要验证的字段名，不填则默认为全部
 * @return 基于传入的验证规则生成的验证器
 */
export default function createFormValidator(ruleConfigs) {
    return function (dataSource, validateFields) {
        let validatedResult = {
            result: true,
            message: ''
        };
        for (let i = 0; i < ruleConfigs.length; i++) {
            let ruleConfig = ruleConfigs[i];
            for (let j = 0; j < ruleConfig.rules.length; j++) {
                const rule = ruleConfig.rules[j];
                const canValidateRule = validateField(validateFields, ruleConfig.fieldname);
                const value = dataSource[ruleConfig.fieldname];
                if (canValidateRule) {
                    // validate
                    // ----------------------------------------------------------------------
                    const currentValidator = get(validators, rule.name, false);
                    let result = validatedResult.result;
                    if (currentValidator) {
                        result = currentValidator(rule.rule, value);
                    }
                    else if (rule.name === 'validator') {
                        result = rule.rule(value);
                    }
                    // error
                    // ----------------------------------------------------------------------
                    if (!result) {
                        validatedResult.result = result;
                        validatedResult.message = rule.message;
                        return validatedResult;
                    }
                }
            }
        }
        return validatedResult;
    };
}
