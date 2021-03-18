
const isNumber = (param): param is number  => {
    return typeof param === 'number';
};

const isString = (param): param is string => {
    return typeof param === 'string';
};

const isBoolean = (param): param is boolean => {
    return typeof param === 'boolean';
};

const typeChecks = {
    isNumber,
    isString,
    isBoolean,
};

export default typeChecks;