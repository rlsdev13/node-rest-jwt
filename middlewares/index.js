const validateFields = require('./validate-fields');
const verifyJWT = require('./verify-jwt');

module.exports = {
    ...validateFields,
    ...verifyJWT
}