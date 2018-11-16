const { Transaction, getConnection } = require('../lib/dbConnection')
const supportDao = require('../dao/supportDao')


// 서포트 상품 등록하기
exports.postSupport = async (req, next) => {
  try {
    await supportDao.postSupport(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}

exports.postSupportFund = async (req, next) => {
  try {
    await supportDao.supportFund(Transaction, next, req)
  } catch (e) {
    console.log(e.message)
  }
}
