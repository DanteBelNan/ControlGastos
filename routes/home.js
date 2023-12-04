var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

router.get('/', function(req, res, next) {
    res.render('home/home', {
        layout: 'layout',
    });
});

module.exports = router;
