const { Router } = require('express'); 
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { login } = require('../controllers/auth');

const router = Router();

/**
 * Main url 127.0.0.1:8080/api/auth
*/

router.post('/',[
    check('email','El correo es invalido.').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

module.exports = router;