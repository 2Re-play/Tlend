const { Router } = require('express')

// restart
const user = require('./user')
const reward = require('./reward')
const support = require('./support')
const home = require('./home')
const media = require('./media')
const idol = require('./idol')

const router = Router()


/* GET home page. */
router.use('/user', user)
router.use('/reward', reward)
router.use('/support', support)
router.use('/home', home)
router.use('/media', media)
router.use('/idol', idol)


module.exports = router
