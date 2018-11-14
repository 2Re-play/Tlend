const { Router } = require('express')
const { multer } = require('../../config/s3bucket')

const supportCtrl = require('../controller/supportController')

const upload = multer('reward')
const support = Router()

/* GET home page. */
const cpUpload = upload.fields([{ name: 'image', maxCount: 5 }, { name: 'detailImage', maxCount: 1 }])
support.post('/', cpUpload, supportCtrl.postSupport)


module.exports = support
