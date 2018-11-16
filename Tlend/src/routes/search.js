const { Router } = require('express')

const searchCtrl = require('../controller/searchController')

const search = Router()

/* GET home page. */
search.get('/support', searchCtrl.getSearchSupport)
search.get('/reward', searchCtrl.getSearchReward)
search.get('/idol', searchCtrl.getSearchIdol)

module.exports = search
