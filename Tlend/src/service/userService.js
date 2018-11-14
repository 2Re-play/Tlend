const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')


// 회원가입
exports.signup = async (req, next) => {
  try {
    await userDao.signUp(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}

// 로그인
exports.signIn = async (req) => {
  const connection = await getConnection()
  let result
  try {
    result = await userDao.signIn(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 아이디 중복확인
exports.confirmId = async (req) => {
  const connection = await getConnection()
  let result
  try {
    result = await userDao.comfirmId(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 비밀번호 중복확인
exports.confirmPw = async (req) => {
  const connection = await getConnection()
  let result
  try {
    result = await userDao.comfirmPw(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}
