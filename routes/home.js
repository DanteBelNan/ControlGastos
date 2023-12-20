var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
var movimientosService = require('../service/movimientosService')
var categoriasService = require('../service/categoriaService')

router.get('/',async function(req, res, next) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    var categorias = await categoriasService.getCategoriasByUserId(res.locals.id_usuario)
    var movimientos = await movimientosService.getMovimientosByUserIdAndMes(res.locals.id_usuario,currentMonth, currentYear)
    res.render('home/home', {
        layout: 'layout',
        movimientos: movimientos,
        currentMonth: currentMonth,
        currentYear: currentYear,
        categorias: categorias
    });
});

module.exports = router;
