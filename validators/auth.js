
const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('EL NOMBRE ES REQUERIDO'),
    check('email')
        .isEmail()
        .withMessage('NECESITA HABER UN E-MAIL VÁLIDO'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('LA CONSTRASEÑA NECESITA TENER 6 CARACTERES MINIMO.')
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('NECESITA HABER UN E-MAIL VÁLIDO'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('LA CONSTRASEÑA NECESITA TENER 6 CARACTERES MINIMO.')
];
