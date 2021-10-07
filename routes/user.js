const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, verifyJWT } = require('../middlewares');
const { dateValid, emailExist } = require('../helpers');

const { getUsers, postUser } = require('../controllers/user');

const router = Router();

/**
 * Main url 127.0.0.1:8080/api/user
*/


//validar role y jwt
router.get('/',[
    verifyJWT,
    check('limit').optional().isNumeric(),
    check('skip').optional().isNumeric(),
    validateFields
],getUsers);

router.post('/',[
    check('email','El email es requerido').notEmpty(),
    check('email','El formato del email es incorrecto').isEmail(),
    check('email').custom( emailExist ),
    check('password','La contraseña es requerida').notEmpty(),
    check('name','El nombre es requerido').notEmpty(),
    check('last_name','El apellido es requerido').notEmpty(),
    check('date_birth','La fecha de nacimiento es requeirda').custom( dateValid ),
    check('state','El estado es requerido').notEmpty(),
    validateFields
],postUser);

module.exports = router;