// 회원가입
exports.signUp = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `INSERT INTO USER(user_id, user_pw, user_nickname) VALUES("${req.body.id}", "${req.body.pw}", "${req.body.nickname}")`
    await connection.query(Query1)
    const Query2 = `SELECT user_idx FROM USER WHERE user_id = "${req.body.id}"`
    const user_idx = await connection.query(Query2)
    console.log('success')
    return user_idx[0]
  }).catch(error => {
    return next(error)
  })
}

exports.selectIdol = (Transaction, req, next) => {
  Transaction(async (connection) => {
    let idol_idx = []
    for (const i in req.body.idol) {
      const Query1 = `
     SELECT idol_idx FROM IDOL WHERE idol_name = "${req.body.idol[i].idol_name}"
      `
      const result = await connection.query(Query1)
      idol_idx[i] = result[0]
    }
    for (const i in idol_idx) {
      const Query2 = `
    INSERT INTO FAN(user_idx, idol_idx ) VALUES(${req.headers.user_idx}, ${idol_idx[i].idol_idx})
        `
      await connection.query(Query2)
    }
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

// 로그인

exports.signIn = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT user_idx, user_id, user_pw FROM USER WHERE user_id = "${req.body.id}" AND user_pw = "${req.body.pw}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.comfirmId = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT user_id FROM USER WHERE user_id = "${req.body.id}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.comfirmPw = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT user_nickname FROM USER WHERE user_nickname = "${req.body.nickname}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
