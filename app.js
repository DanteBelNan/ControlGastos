var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config();

var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');

const session = require('express-session');
var fileUpload = require('express-fileupload');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: { maxAge: null},
  resave: false,
  saveUninitialized: true
}))

app.use(fileUpload({
useTempFiles: true,
tempFileDir: '/tmp/'
}));

const hbs = require('hbs'); //Un comparador que se utilizara dentro de los handlebars
hbs.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});


checkLogin = async(req,res,next) => {
  try{
    if(req.session.id_usuario){
      res.locals.id_usuario = req.session.id_usuario;
      res.locals.rol = req.session.rol;
      res.locals.username = req.session.username;
      next();
    }else{
      res.redirect('/login');
    }
  }catch(error){
    console.log(error);
  }
}

app.use('/', loginRouter);
app.use('/users', checkLogin, usersRouter);
app.use('/home', checkLogin, homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(process.env.DEBUG == 'true'){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error'); //Aca debo de tener una pagina para errores
  }else{
    res.render(req.session.id_usuario ? 'home/home' : 'login/login', {
      error: true,
      message: err.message
    })
  }

});

module.exports = app;
