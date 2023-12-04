var express = require('express');
var router = express.Router();
var categoriaService = require('../service/categoriaService');

router.get('/categorias/:id',async function(req, res, next) {
  try{
      var id = req.params.id;
      var categorias = await categoriaService.getCategoriasByUserId(parseInt(id));
      res.render('users/categorias',{
        layout: 'layout',
        categorias
    });
  }catch(error){
    console.log(error);
  }
});

module.exports = router;
