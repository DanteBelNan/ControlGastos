var express = require('express');
var router = express.Router();
var categoriaService = require('../service/categoriaService');

router.get('/categorias/ver/',async function(req, res, next) {
  try{
      var id = res.locals.id_usuario
      var categorias = await categoriaService.getCategoriasByUserId(id)
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
      }else{
        valorCategoria = categoria.nombre
        color = categoria.color
        return categoria;
      }
    })
  }catch(error){
    throw error
  }
}

router.get('/categorias/modificar/:idCategoria',async function(req, res, next) {
  try{
    valorCategoria = 0
    color = ""
    categoria = await esMiCategoria(req.params.idCategoria, req.session.id_usuario, valorCategoria).then(categoria => {
      console.log(categoria)
      res.render('users/mod_add_categorias', {
          layout: 'layout',
          modificar: true,
          crear: false,
          idCategoria: req.params.idCategoria,
          valorCategoria: valorCategoria,
          color: color,
      });
    })
  }catch(error){
    console.log(error)
    res.redirect('/home')
  }
});

router.post('/categorias/modificar/:idCategoria',async function(req, res, next) {
  try{
    await esMiCategoria(req.params.idCategoria, res.locals.id_usuario)
    var idCategoria = req.params.idCategoria
    var oldCategoria =  await categoriaService.getCategoriaById(idCategoria)
    if (req.body.nombre != "" || req.body.nombre != null){
      oldCategoria.nombre = req.body.categoria;
      oldCategoria.color = req.body.color;
    }else{
      res.redirect(req.headers.referer);
    }
    var categoria = categoriaService.modificarCategoria(oldCategoria,idCategoria).then(categoria => {
      res.redirect('/users/categorias/ver/')
    })
  }catch(error){
    res.redirect('/home')
  }
});

router.get('/categorias/crear/',async function(req, res, next) {
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
router.post('/categorias/crear/',async function(req, res, next) {
  var id = res.locals.id_usuario
  console.log(req.body)
  var categoria = {
    nombre: req.body.categoria,
    color: req.body.color,
    idUsuario: id
  }
  try{
    categoria = await categoriaService.createCategoria(categoria)
    res.redirect('/users/categorias/ver/')
  }catch(error){
    res.redirect('/home')
  }
});

router.get('/categorias/eliminar/:idCategoria', async function(req, res, next) {
  try{
    await esMiCategoria(req.params.idCategoria, res.locals.id_usuario)
    var idCategoria = req.params.idCategoria
    categoriaService.deleteCategoria(idCategoria).then(idCategoria => {
      res.redirect('/users/categorias/ver/')
    })
  }catch(error){
    res.redirect('/home')
  }
})

router.get('/movimientos/crear/', async function(req,res, next){
  try{
    var id = res.locals.id_usuario
    var categorias = await categoriaService.getCategoriasByUserId(id)
    res.render('users/mod_add_movimientos',{
      layout: 'layout',
      categorias,
      modificar: false,
      crear: true,
    });
  }catch(error){
    res.redirect('/home')
  }
})

router.post('/movimientos/crear/', async function(req,res, next){
  try{
    console.log(req.body)
    var id = res.locals.id_usuario
    var categorias = await categoriaService.getCategoriasByUserId(id)
    res.render('users/mod_add_movimientos',{
      layout: 'layout',
      categorias,
      modificar: true,
      crear: false,
    });
  }catch(error){
    res.redirect('/home')
  }
})

module.exports = router;
