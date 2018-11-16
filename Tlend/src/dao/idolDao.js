exports.postIdol = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const imageData = req.files.image[0]
    const Query1 = `INSERT INTO
            IDOL(
                idol_name, idol_company)
            VALUES (
                "${req.body.idol_name}",
                "${req.body.idol_company}"
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT idol_idx FROM IDOL WHERE idol_name = "${req.body.idol_name}"`
    const idol_idx = await connection.query(Query2)
    const Query3 = `
          INSERT INTO IMAGE
            (idol_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${idol_idx[0].idol_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")`
    await connection.query(Query3)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}


exports.postMemebr = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const imageData = req.files.image[0]
    const Query1 = `INSERT INTO
            IDOL_MEMBER(
                member_name, idol_idx)
            VALUES (
                "${req.body.member_name}",
                "${req.body.idol_idx}"
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT member_idx FROM IDOL_MEMBER WHERE member_name = "${req.body.member_name}"`
    const member_idx = await connection.query(Query2)
    const Query3 = `
          INSERT INTO IMAGE
            (member_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${member_idx[0].member_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")`
    await connection.query(Query3)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

exports.getHome = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT idol_idx, idol_name, idol_company, image_key as group_titleImg FROM IDOL JOIN IMAGE USING(idol_idx)WHERE idol_idx = ${req.params.idol_idx}`
    const idol_group = await connection.query(Query1) // idol group
    const Query2 = `SELECT member_name, member_idx, image_key as member_imgKey FROM IDOL_MEMBER JOIN IMAGE USING(member_idx) WHERE IDOL_MEMBER.idol_idx = ${req.params.idol_idx}`
    const idol_member = await connection.query(Query2) //  array
    idol_group.push(idol_member)
    console.log('success')
    return idol_group
  }).catch(error => {
    return next(error)
  })
}


exports.getReward = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT reward_idx, reward_title, user_nickname, image_key, reward_finishDate, reward_currentMoney, reward_goalMoney  FROM (REWARD r JOIN IMAGE USING(reward_idx)) JOIN USER USING(user_idx) WHERE r.idol_idx = ${req.params.idol_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getSupport = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT support_idx, support_title, user_nickname, image_key, support_finishDate, support_currentMoney, support_goalMoney FROM (SUPPORT s JOIN IMAGE USING(support_idx)) JOIN USER USING(user_idx) WHERE s.idol_idx = ${req.params.idol_idx} ;`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getTop = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT idol_idx, idol_name, idol_company, image_key as group_titleImg FROM IDOL JOIN IMAGE USING(idol_idx)WHERE idol_idx = ${req.params.idol_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
