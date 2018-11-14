const { Router } = require('express')

// restart
const user = require('./user')
const reward = require('./reward')
const support = require('./support')

const router = Router()


/* GET home page. */
router.use('/user', user)
router.use('/reward', reward)
router.use('/support', support)


module.exports = router
