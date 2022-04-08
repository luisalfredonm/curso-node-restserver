const {response, request} = require('express');

const usuariosGet = (req = request, res=response) => {
    const {q,nombre, apikey} = req.query;
    res.json({
        msg: 'get API -  controlador',
        q,
        nombre,
        apikey
    });
};


usuariosPost = (req = request, res= response) => {
    const { nombre,edad }  = req.body;
    res.json({
        msg: ' pors API -- controlador',
        nombre, edad
    });
};

usuariosPut = (req, res= response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API --- controlador',
        id
    });
};

usuariosPath = (req, res = response) => {
    res.json({msg: 'patchAPI - controlador'});
};
usuariosDelete = (req, res = response) => {
    res.json({msg: 'delete API - controlador'});
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete

}