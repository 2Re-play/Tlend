exports.postIdol = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const imageData = req.files.image[0]
    const reward_banner = req.files.reward_banner[0]
    const support_banner = req.files.support_banner[0]
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
    const Query4 = `
          INSERT INTO IMAGE
            (reward_banner_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${idol_idx[0].idol_idx},
            "${reward_banner.originalname}",
            "${reward_banner.transforms[0].key}",
            "${reward_banner.transforms[0].location}",
            "${reward_banner.transforms[0].size}")`
    await connection.query(Query4)
    const Query5 = `
          INSERT INTO IMAGE
            (support_banner_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${idol_idx[0].idol_idx},
            "${support_banner.originalname}",
            "${support_banner.transforms[0].key}",
            "${support_banner.transforms[0].location}",
            "${support_banner.transforms[0].size}")`
    await connection.query(Query5)
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
    const Query = `SELECT 
    reward_idx,
    reward_title,
    user_nickname,
    reward_finishDate,
    reward_currentMoney,
    reward_goalMoney,
    i.image_key
FROM
   (REWARD r JOIN IMAGE i USING(reward_idx))
        JOIN
    USER USING (user_idx)
WHERE
    r.idol_idx = ${req.params.idol_idx} GROUP BY reward_idx`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getSupport = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT support_idx, support_title, user_nickname, image_key, support_finishDate, support_currentMoney, support_goalMoney FROM (SUPPORT s JOIN IMAGE USING(support_idx)) JOIN USER USING(user_idx) WHERE s.idol_idx = ${req.params.idol_idx} GROUP BY support_idx ;`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getTopReward = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT reward_banner_idx, image_key as bannerImage FROM IMAGE WHERE reward_banner_idx = ${req.params.idol_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getTopSupport = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT support_banner_idx, image_key as bannerImage FROM IMAGE WHERE support_banner_idx = ${req.params.idol_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getSupportDefault = (Transaction, req, next) => {

  return Transaction(async (connection) => {
    console.log()
    const Query1 = `SELECT support_title, support_currentMoney, support_goalMoney, support_finishDate, support_startDate, support_schedule FROM SUPPORT WHERE support_idx = ${req.params.support_idx}`
    const supportData = await connection.query(Query1) // idol group
    const Query2 = `SELECT image_key FROM IMAGE WHERE support_idx = ${req.params.support_idx}`
    const supportImage = await connection.query(Query2) //  array
    const Query3 = `SELECT item_title,item_price FROM SUPPORT_ITEM WHERE support_idx = ${req.params.support_idx}`
    const price = await connection.query(Query3)
    const Query4 = `SELECT image_key FROM DETAIL_IMAGE WHERE support_idx = ${req.params.support_idx}`
    const detailImg = await connection.query(Query4)
    console.log('success')
    const result = [
      supportImage,
      price,
      supportData,
      detailImg,
    ]
    return result
  }).catch(error => {
    return next(error)
  })
}

// exports.getSupportDetail = (Transaction, req, next) => {
//   return Transaction(async (connection) => {
//     const Query1 = `SELECT support_title, support_currentMoney, support_goalMoney, support_finishDate, support_schedule FROM SUPPORT WHERE support_idx = ${req.params.support_idx}`
//     const supportData = await connection.query(Query1) // idol group
//     const Query2 = `SELECT image_key FROM IMAGE WHERE support_idx = ${req.params.support_idx}`
//     const supportImage = await connection.query(Query2) //  array
//     const Query3 = `SELECT image_key FROM DETAIL_IMAGE WHERE support_idx = ${req.params.support_idx}`
//     const detailImg = await connection.query(Query3)
//     const Query4 = `SELECT item_price FROM SUPPORT_ITEM WHERE support_idx = ${req.params.support_idx}`
//     const price = await connection.query(Query4)
//     console.log('success')
//     console.log('111111', supportImage)
//     const result = [
//       supportImage,
//       price,
//       supportData,
//       detailImg,
//     ]
//     return result
//   }).catch(error => {
//     return next(error)
//   })
// }

exports.getRewardDefault = (Transaction, req, next) => {

  return Transaction(async (connection) => {
    const Query1 = `SELECT reward_title, reward_description, reward_currentMoney, reward_goalMoney, reward_finishDate, reward_startDate,reward_shipping, reward_schedule FROM REWARD WHERE reward_idx = ${req.params.reward_idx}`
    const rewardData = await connection.query(Query1) // idol group
    const Query2 = `SELECT image_key FROM IMAGE WHERE reward_idx = ${req.params.reward_idx}`
    const rewardImage = await connection.query(Query2) //  array
    const Query3 = `SELECT item_title,item_price, item_list FROM REWARD_ITEM WHERE reward_idx = ${req.params.reward_idx}`
    const price = await connection.query(Query3)
    const Query4 = `SELECT image_key FROM DETAIL_IMAGE WHERE reward_idx = ${req.params.reward_idx}`
    const detailImg = await connection.query(Query4)
    console.log('success')
    const result = [
      rewardImage,
      price,
      rewardData,
      detailImg,
    ]
    return result
  }).catch(error => {
    return next(error)
  })
}
//
// exports.getRewardDetail = (Transaction, req, next) => {
//   return Transaction(async (connection) => {
//     const Query1 = `SELECT reward_title, reward_currentMoney, reward_goalMoney, reward_finishDate, reward_schedule FROM REWARD WHERE reward_idx = ${req.params.reward_idx}`
//     const rewardData = await connection.query(Query1) // idol group
//     const Query2 = `SELECT image_key FROM IMAGE WHERE reward_idx = ${req.params.reward_idx}`
//     const rewardImage = await connection.query(Query2) //  array
//     const Query3 = `SELECT image_key FROM DETAIL_IMAGE WHERE reward_idx = ${req.params.reward_idx}`
//     const detailImg = await connection.query(Query3)
//     const Query4 = `SELECT item_price FROM REWARD_ITEM WHERE reward_idx = ${req.params.reward_idx}`
//     const price = await connection.query(Query4)
//     console.log('success')
//     console.log('111111', rewardImage)
//     const result = [
//       rewardImage,
//       price,
//       rewardData,
//       detailImg,
//     ]
//     return result
//   }).catch(error => {
//     return next(error)
//   })
// }

exports.getIdol = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT DISTINCT idol_idx, idol_name, image_key FROM IDOL JOIN IMAGE USING(idol_idx) ORDER BY idol_idx ASC'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
