const { Router } = require('express')

const mediaCtrl = require('../controller/mediaController')
const { multer } = require('../../config/s3bucket')

const upload = multer('reward')

const media = Router()

/* GET home page. */
media.post('/:idol_idx', upload.fields([
  { name: 'video' },
  { name: 'detail_image' },
  { name: 'title_image' },
]), mediaCtrl.postMedia)

media.get('/:media_idx', mediaCtrl.getMedia)


module.exports = media
