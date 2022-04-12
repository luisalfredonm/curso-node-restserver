const {esRolValido, existeEmailenBD, existeUsuarioPorId} = require('../helpers/db-validators');

const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete,
        usuariosPath } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/',usuariosGet );

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRolValido),
        validarCampos,
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El passrword debe de ser de 6 letas').isLength({min:6}),
        check('correo').custom(existeEmailenBD),
        check('rol').custom( esRolValido), 
        validarCampos
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), validarCampos
], usuariosPost);

// router.post('/', [
//         
//          
//          check('correo','El correo no es valido').isEmail(),
//         // ])
// ],usuariosPost );

router.patch('/',usuariosPath );

router.delete('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],usuariosDelete );

module.exports = router;