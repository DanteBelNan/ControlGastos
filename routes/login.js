var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILER_USR,
      pass: process.env.MAILER_PWD
    }
  });

router.get('/login', function(req,res,next){
  res.render('login/login',{
      layout: 'layout',
  });
});

router.post('/login',async function(req,res,next)  {
  try{
    if(!req.session){
      req.session = {} //Inicializamos la sesión si por alguna razon no se inicio
    }
    var username = req.body.username.toLowerCase();
    var password = req.body.password;


    var data = await userService.getUserByUserNameAndPassword(username,password);
    if(data != undefined){
      req.session.id_usuario = data["idUsuario"];
      req.session.username = data["username"];
      req.session.mail = data["mail"];
      req.session.rol = data["rol"];
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      res.redirect('/home/'+month+'/'+year);
    }else{
      res.render('login/login', {
        layout: 'layout',
        error: true,
        message: "Credenciales incorrectas"
    });
    }
  }catch(error){
    console.log(error)
  }
})

router.get('/register', async(req,res,next) => {
  res.render('login/register',{
      layout: 'layout',
  });
})

router.post('/register', async (req,res,next) => {
  try{
      if (!req.session) {
          req.session = {}; // Inicializa req.session si no está definido
      }

      if(req.body.username == "" || req.body.password ==  "" || req.body.password2 == "" || req.body.mail == ""){
          res.render('login/register', {
              layout: 'layout',
              error: true,
              message: "Todos los campos deben de estar llenos"
          });
      }
      if(req.body.password != req.body.password2 ){
          res.render('login/register', {
              layout: 'layout',
              error: true,
              message: "Las contraseñas deben de ser iguales"
          });
      }

      var createdUser = {
          username: req.body.username,
          password: req.body.password,
          mail: req.body.mail,
          idRol: 2 //rol de usuario
        };
      var newUser = await userService.createUser(createdUser).then(newUser => {
          res.render('login/login', {
              layout: 'layout',
              register: true,
              RegisterMessage: "Usuario registrado exitosamente"
          })
      })
  } catch (error) {
    res.render('login/login', {
      layout: 'layout',
      error: true,
      message: error.message
  })
  }
})

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login')  
});

/* Handleo la pagina normal */
router.get('/', function(req, res, next) {
  try{
    req.session.id_usuario ? res.redirect('/home') : res.redirect('/login');
  }catch(error){
    console.log(error);
  }
});



module.exports = router;
