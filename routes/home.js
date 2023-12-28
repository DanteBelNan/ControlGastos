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
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    res.redirect('/home/'+month+'/'+year);
});


router.get('/:month/:year',async function(req, res, next) {
    var month = req.params.month;
    var year = req.params.year;
    if(month == 0){
        year--;
        month = 12;
    }
    if (month == 13){
        year++;
        month = 1;
    }
    const currentDate = new Date();
    if((month < 1 || month > 12 || !month) || (!year || year < 1900) ){
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
        res.redirect('/home/'+month+'/'+year);
    }
    if(year > currentDate.getFullYear() || (month > currentDate.getMonth()+1 && year == currentDate.getFullYear())){
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
        res.redirect('/home/'+month+'/'+year);
    }


    var categorias = await categoriasService.getCategoriasByUserId(res.locals.id_usuario)
    var movimientos = await movimientosService.getMovimientosByUserIdAndMes(res.locals.id_usuario,month, year)
    var filteredCategoriasA = [];
    var filteredCategoriasD = [];
    categorias.forEach(categoria => {
        categoria.total = 0
        categoria.movimientos = []
        movimientos.forEach(movimiento => {
            if(movimiento.idCategoria == categoria.idCategoria){
                categoria.movimientos.push(movimiento);
                categoria.total += movimiento.monto
            }
        });
        if(categoria.total > 0){
            if(categoria.deb_acr == 0){
                filteredCategoriasD.push(categoria);
            }else{
                filteredCategoriasA.push(categoria)
            }
        }
    });
    res.render('home/home', {
        layout: 'layout',
        month: month,
        year: year,
        categoriasD: filteredCategoriasD,
        categoriasA: filteredCategoriasA,
        nextMonth: parseInt(month)+1,
        previousMonth: parseInt(month)-1,
        nextYear: parseInt(year)+1,
        previousYear:parseInt( year)-1,
    });
});

module.exports = router;
