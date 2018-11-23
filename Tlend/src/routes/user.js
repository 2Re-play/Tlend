const { Router } = require('express')

const userCtrl = require('../controller/userController')

const user = Router()

/* GET home page. */
user.post('/signup', userCtrl.signUp)
user.post('/idol', userCtrl.selectIdol)
user.post('/signin', userCtrl.signIn)
user.post('/comfirmId', userCtrl.confirmId)
user.post('/comfirmPw', userCtrl.confirmPw)


module.exports = user
