var express = require('express');
var router = express.Router();
var categoriaService = require('../service/categoriaService');

router.get('/categorias/:idUser',async function(req, res, next) {
  try{
      var id = req.params.idUser;
      var categorias = await categoriaService.getCategoriasByUserId(parseInt(id));
      res.render('users/ver_categorias',{
        layout: 'layout',
        categorias
    });
  }catch(error){
    console.log(error);
  }
});

//Evaluar si crear ruta nueva ya que voy a tener que repetir mucho esta validación
async function esMiCategoria(idCategoria, idUsuario){
  try{
    categoria = await categoriaService.getCategoriaById(idCategoria).then(categoria => {
      if(categoria.idUsuario != idUsuario){
        throw new Error("Esta categoria no es del usuario logueado ")
      }
    })
  }catch(error){
    throw error
  }
}

router.get('/categorias/modificar/:idCategoria',async function(req, res, next) {
  try{
    await esMiCategoria(req.params.idCategoria, req.session.id_usuario)
    res.render('users/mod_add_categorias', {
        layout: 'layout',
        modificar: true,
        crear: false,
    });
  }catch(error){
    res.redirect('/home')
  }
});

router.post('/categorias/modificar/:idCategoria',async function(req, res, next) {
  try{
    await esMiCategoria(req.params.idCategoria, res.session.id_usuario)
    //Darle funcionalidad luego de crear los formularios :D
    res.render('users/mod_add_categorias', {
        layout: 'layout',
    });
  }catch(error){
    res.redirect('/home')
  }
});

router.get('/categorias/crear/:idUsuario',async function(req, res, next) {
  var id = req.params.idUser;
  try{
    res.render('users/mod_add_categorias', {
        layout: 'layout',
        modificar: false,
        crear: true,
    });
  }catch(error){
    res.redirect('/home')
  }
});
router.post('/categorias/crear/:idUsuario',async function(req, res, next) {
  var id = req.params.idUser;
  try{
    res.render('users/mod_add_categorias', {
        layout: 'layout',
    });
  }catch(error){
    res.redirect('/home')
  }
});

module.exports = router;
