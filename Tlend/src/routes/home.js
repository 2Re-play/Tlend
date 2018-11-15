const { Router } = require('express')

const homeCtrl = require('../controller/homeController')

const home = Router()

/* GET home page. */
home.get('/', homeCtrl.getHome)


module.exports = home
