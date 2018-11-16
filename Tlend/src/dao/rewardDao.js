// 리워드 상품 등록하기
exports.postReward = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const imageData = req.files.image
    const detailImg = req.files.detailImage[0]
    const { item } = req.body
    const Query1 = `INSERT INTO
            REWARD(
                idol_idx,
                user_idx,
                reward_title,
                reward_description,
                reward_goalMoney,
                reward_startDate,
                reward_finishDate,
                reward_shipping,
                reward_schedule)
            VALUES (
                ${req.body.idol_idx},
                ${req.body.user_idx},
                "${req.body.reward_title}",
                "${req.body.reward_description}",
                ${req.body.reward_goalMoney},
                "${req.body.reward_startDate}",
                "${req.body.reward_finishDate}",
                ${req.body.reward_shipping},
                "${req.body.reward_schedule}"
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT reward_idx FROM REWARD WHERE reward_title = "${req.body.reward_title}"`
    const reward_idx = await connection.query(Query2)
    let Query3
    for (const i in imageData) {
      Query3 = `
          INSERT INTO IMAGE
            (reward_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${reward_idx[0].reward_idx},
            "${imageData[i].originalname}",
            "${imageData[i].transforms[0].key}",
            "${imageData[i].transforms[0].location}",
            "${imageData[i].transforms[0].size}")`
      await connection.query(Query3)
    }

    let Query4
    for (const i in item) {
      Query4 = `
                INSERT INTO REWARD_ITEM(
                    item_title,
                    item_list,
                    item_price,
                    reward_idx)
                 VALUES(
                    "${req.body.item[i].item_title}",
                    "${req.body.item[i].item_list}",
                    ${req.body.item[i].item_price},
                    ${reward_idx[0].reward_idx})
                    `
      await connection.query(Query4)
    }
    const Query5 = `
          INSERT INTO DETAIL_IMAGE
            (reward_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${reward_idx[0].reward_idx},
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

// reward funding
exports.rewardFund = (Transaction, next, req) => {
  Transaction(async (connection) => {
    const Query1 = `
     SELECT reward_currentMoney FROM REWARD WHERE reward_idx = ${req.params.reward_idx}`
    const currentMoney = await connection.query(Query1)
    const sum = currentMoney[0].reward_currentMoney + Number(req.body.itemPrice)
    const Query2 = `
      UPDATE REWARD SET reward_currentMoney = ${sum} WHERE reward_idx = ${req.params.reward_idx}`
    await connection.query(Query2)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}
