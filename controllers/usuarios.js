const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))


    ])
    res.json({
        msg: 'get API -  controlador',
        total,
        usuarios
    });
};

const usuariosPost = async (req = request, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.json({
        msg: 'posttttt API -  controlador',
        usuario
    });
};


usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO validar contra la base de datos

    if (password) {
        // Encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put API --- controlador',
        usuario
    });
};

usuariosPath = (req, res = response) => {
    res.json({ msg: 'patchAPI - controlador' });
};
usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)

    //borrar cambiando el estado

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'delete API - controlador',
        id, usuario
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete

}