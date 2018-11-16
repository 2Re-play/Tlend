const { Router } = require('express')

const idolCtrl = require('../controller/idolController')
const { multer } = require('../../config/s3bucket')

const upload = multer('reward')

const idol = Router()

/* GET home page. */
idol.post('/', upload.fields([
  { name: 'image' },
]), idolCtrl.postIdol)

idol.post('/member', upload.fields([
  { name: 'image' },
]), idolCtrl.postMember)

idol.get('/home/:idol_idx', idolCtrl.home)

module.exports = idol
