const { Transaction, getConnection } = require('../lib/dbConnection')
const supportDao = require('../dao/supportDao')


// 회원가입
exports.postSupport = async (req, next) => {
  try {
    await supportDao.postSupport(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}
