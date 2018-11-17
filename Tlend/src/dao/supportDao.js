// 리워드 상품 등록하기
exports.postSupport = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const imageData = req.files.image
    const detailImg = req.files.detailImage[0]
    const { item } = req.body
    const Query1 = `INSERT INTO
            SUPPORT(
                idol_idx,
                user_idx,
                support_title,
                support_description,
                support_goalMoney,
                support_startDate,
                support_finishDate,
                support_schedule)
            VALUES (
                ${req.body.idol_idx},
                ${req.body.user_idx},
                "${req.body.support_title}",
                "${req.body.support_description}",
                ${req.body.support_goalMoney},
                "${req.body.support_startDate}",
                "${req.body.support_finishDate}",
                "${req.body.support_schedule}"
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT support_idx FROM SUPPORT WHERE support_title = "${req.body.support_title}"`
    const support_idx = await connection.query(Query2)
    let Query3
    for (const i in imageData) {
      Query3 = `
          INSERT INTO IMAGE
            (support_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${support_idx[0].support_idx},
            "${imageData[i].originalname}",
            "${imageData[i].transforms[0].key}",
            "${imageData[i].transforms[0].location}",
            "${imageData[i].transforms[0].size}")`
      await connection.query(Query3)
    }

    let Query4
    for (const i in item) {
      Query4 = `
                INSERT INTO SUPPORT_ITEM(
                    item_title,
                    item_price,
                    support_idx)
                 VALUES(
                    "${req.body.item[i].item_title}",
                    ${req.body.item[i].item_price},
                    ${support_idx[0].support_idx})
                    `
      await connection.query(Query4)
    }
    const Query5 = `
          INSERT INTO DETAIL_IMAGE
            (reward_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${support_idx[0].support_idx},
            "${detailImg.originalname}",
            "${detailImg.transforms[0].key}",
            "${detailImg.transforms[0].location}",
            "${detailImg.transforms[0].size}")`
    await connection.query(Query5)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

exports.supportFund = (Transaction, next, req) => {
  Transaction(async (connection) => {
    const Query1 = `
     SELECT support_currentMoney FROM SUPPORT WHERE support_idx = ${req.params.support_idx}`
    const currentMoney = await connection.query(Query1)
    const sum = currentMoney[0].support_currentMoney + Number(req.body.itemPrice)
    const Query2 = `
      UPDATE SUPPORT SET support_currentMoney = ${sum} WHERE support_idx = ${req.params.support_idx}`
    await connection.query(Query2)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}


// reward total items
exports.getSupport = (connection, idol_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT 
    support_idx, support_title, user_nickname, image_key
FROM
    (SUPPORT r
    JOIN USER u USING (user_idx))
        JOIN
    IMAGE i USING (support_idx)
WHERE
    r.idol_idx = ${idol_idx}
GROUP BY support_idx`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
