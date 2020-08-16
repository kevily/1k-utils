import size from 'lodash/size';
const validators = {
    required(rule, value) {
        return rule ? !!value : true;
    },
    minLen(rule, value) {
        return size(value) >= rule;
    },
    maxLen(rule, value) {
        return size(value) <= rule;
    }
};
export default validators;
