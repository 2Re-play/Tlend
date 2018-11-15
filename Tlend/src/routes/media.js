const { Router } = require('express')

const mediaCtrl = require('../controller/mediaController')
const { multer } = require('../../config/s3bucket')

const upload = multer('reward')

const media = Router()

/* GET home page. */
media.post('/', upload.fields([
  { name: 'video' },
  { name: 'image' },
]), mediaCtrl.postMedia)


module.exports = media
