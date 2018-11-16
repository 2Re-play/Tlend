const { Transaction, getConnection } = require('../lib/dbConnection')
const rewardDao = require('../dao/rewardDao')


// 회원가입
exports.postReward = async (req, next) => {
  try {
    await rewardDao.postReward(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}

exports.postRewardFund = async (req, next) => {
  try {
    await rewardDao.rewardFund(Transaction, next, req)
  } catch (e) {
    console.log(e.message)
  }
}
