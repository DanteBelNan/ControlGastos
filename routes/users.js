var express = require('express');
var router = express.Router();
var categoriaService = require('../service/categoriaService');
var movimientosService = require('../service/movimientosService')
var userService = require('../service/userService')

router.get('/profile/',async function(req, res, next) {
  try{
      var id = res.locals.id_usuario
      var cantMovimientos = userService.getCantMovimientos(id)
      res.render('users/profile',{
        layout: 'layout',
        title: 'Profile: ' + res.locals.username,
        cantMovimientos: cantMovimientos
      });
  }catch(error){
    console.log(error);
  }
});

router.get('/categorias/ver/',async function(req, res, next) {
  try{
      var id = res.locals.id_usuario
      var categorias = await categoriaService.getCategoriasByUserId(id)
      res.render('users/ver_categorias',{
        layout: 'layout',
        title: 'Categorias',
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
        deb_acr = categoria.deb_acr
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
    deb_acr = 0
    categoria = await esMiCategoria(req.params.idCategoria, req.session.id_usuario, valorCategoria)
    res.render('users/mod_add_categorias', {
        layout: 'layout',
        title: 'Modificar Categoria',
        modificar: true,
        crear: false,
        idCategoria: req.params.idCategoria,
        valorCategoria: valorCategoria,
        deb_acr: deb_acr,
        color: color,
    });
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
      oldCategoria.deb_acr = req.body.deb_acr ? 1 : 0;
    }else{
      res.redirect(req.headers.referer);
    }
    console.log(oldCategoria)
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
        title: 'Crear categoria',
        modificar: false,
        crear: true,
    });
  }catch(error){
    res.redirect('/home')
  }
});
router.post('/categorias/crear/',async function(req, res, next) {
  var id = res.locals.id_usuario
  var categoria = {
    nombre: req.body.categoria,
    color: req.body.color,
    deb_acr: req.body.deb_acr ? 1 : 0,
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
    movimientos = await movimientosService.getMovimientosByidCategoria(parseInt(req.params.idCategoria));
    if(movimientos.length != 0){
      var id = res.locals.id_usuario
      var categorias = await categoriaService.getCategoriasByUserId(id)
      res.render('users/ver_categorias',{
        layout: 'layout',
        title: 'Categorias',
        categorias: categorias,
        error: true,
        message: "La categoria no se puede eliminar si tiene movimientos asignados"
      });
    }else{
      var idCategoria = req.params.idCategoria
      categoriaService.deleteCategoria(idCategoria).then(idCategoria => {
        res.redirect('/users/categorias/ver/')
      })
    }
  }catch(error){
    console.log(error)
    res.redirect('/home')
  }
})

router.get('/movimientos/crear/', async function(req,res, next){
  try{
    var id = res.locals.id_usuario
    var categorias = await categoriaService.getCategoriasByUserId(id)
    res.render('users/mod_add_movimientos',{
      layout: 'layout',
      title: 'Cargar movimiento',
      categorias,
      modificar: false,
      crear: true,
    });
  }catch(error){
    console.log(error);
    res.redirect('/home')
  }
})

router.post('/movimientos/crear/', async function(req,res, next){
  try{
    const fechaSeleccionada = req.body.fecha ? new Date(req.body.fecha) : new Date();
    fechaSeleccionada.setHours(fechaSeleccionada.getHours() - 3);
    req.body.fecha = fechaSeleccionada
    req.body.idUsuario = res.locals.id_usuario

 
    var created = await movimientosService.createMovimiento(req.body)
    res.redirect('/home')
  }catch(error){
    console.log(error);
    res.redirect('/home')
  }
})

module.exports = router;
