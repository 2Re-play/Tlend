const { Transaction, getConnection } = require('../lib/dbConnection')
const mediaDao = require('../dao/mediaDao')


// media insert
exports.postMedia = async (req, next) => {
  try {
    await mediaDao.postMedia(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}
