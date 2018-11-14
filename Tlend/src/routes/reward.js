const { Router } = require('express')
const { multer } = require('../../config/s3bucket')

const rewardCtrl = require('../controller/rewardController')

const upload = multer('reward')
const reward = Router()

/* GET home page. */
const cpUpload = upload.fields([{ name: 'image', maxCount: 5 }, { name: 'detailImage', maxCount: 1 }])
reward.post('/', cpUpload, rewardCtrl.postReward)


module.exports = reward
