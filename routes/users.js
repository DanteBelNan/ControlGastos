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

router.get('/categorias/modificar/:idCategoria', function(req, res, next) {
  //Chequear que la categoria correspondiente sea del usuario que esta logeado
  res.render('users/mod_add_categorias', {
      layout: 'layout',
  });
});
//Evaluar si crear ruta nueva ya que voy a tener que repetir mucho esta validación
router.post('/categorias/modificar/:idCategoria', function(req, res, next) {
  //Chequear que la categoria correspondiente sea del usuario que esta logeado
  res.render('users/mod_add_categorias', {
      layout: 'layout',
  });
});

module.exports = router;
