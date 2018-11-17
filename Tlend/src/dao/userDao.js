// 회원가입
exports.signUp = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const Query1 = `INSERT INTO USER(user_id, user_pw, user_nickname) VALUES("${req.body.id}", "${req.body.pw}", "${req.body.nickname}")`
    await connection.query(Query1)
    const Query2 = `
     SELECT user_idx FROM USER WHERE user_id = "${req.body.id}"`
    const user_idx = await connection.query(Query2)
    const Query3 = `
     SELECT idol_idx FROM IDOL WHERE idol_name = "${req.body.idolName1}"
      `
    const idol_idx1 = await connection.query(Query3)
    const Query4 = `
     SELECT idol_idx FROM IDOL WHERE idol_name = "${req.body.idolName2}"
      `
    const idol_idx2 = await connection.query(Query4)
    const Query5 = `
     SELECT idol_idx FROM IDOL WHERE idol_name = "${req.body.idolName3}"
        `
    const idol_idx3 = await connection.query(Query5)
    const Query6 = `
    INSERT INTO FAN(user_idx, idol_idx ) VALUES(${user_idx[0].user_idx}, ${idol_idx1[0].idol_idx})
        `
    await connection.query(Query6)
    const Query7 = `
    INSERT INTO FAN(user_idx, idol_idx ) VALUES(${user_idx[0].user_idx}, ${idol_idx2[0].idol_idx})
        `
    await connection.query(Query7)
    const Query8 = `
    INSERT INTO FAN(user_idx, idol_idx ) VALUES(${user_idx[0].user_idx}, ${idol_idx3[0].idol_idx})
        `
    await connection.query(Query8)

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
