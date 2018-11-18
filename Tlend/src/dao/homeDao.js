exports.myBaby = (Transaction, req, next) => {
  let result
  const idol_name = []
  return Transaction(async (connection) => {
    const Query1 = `SELECT idol_idx FROM FAN WHERE user_idx = ${req.headers.user_idx}`
    const idol_idx = await connection.query(Query1)
    for (const i in idol_idx) {
      const Query2 = `
            SELECT idol_idx, idol_name, image_key FROM IDOL JOIN IMAGE USING(idol_idx)WHERE idol_idx = ${idol_idx[i].idol_idx}`
      result = await connection.query(Query2)

      // const idol = {
      // }
      console.log('111111', result)
      idol_name.push(result[0])
    }
    console.log(idol_name)
    return idol_name
  }).catch(error => {
    return next(error)
  })
}


exports.ranking = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT 
    IFNULL(REWARD.idol_idx , SUPPORT.idol_idx) as a_idol, IFNULL(reward_currentMoney,0) as reward_currentMoney, IFNULL(SUPPORT.idol_idx, REWARD.idol_idx) as b_idol, IFNULL(support_currentMoney,0) as support_currentMoney
FROM
    (SELECT 
        idol_idx, SUM(reward_currentMoney) reward_currentMoney
    FROM
        REWARD
    GROUP BY idol_idx) AS REWARD
        LEFT JOIN
    (SELECT 
        idol_idx, SUM(support_currentMoney) AS support_currentMoney
    FROM
        SUPPORT
    GROUP BY idol_idx) AS SUPPORT ON REWARD.idol_idx = SUPPORT.idol_idx 
UNION 
SELECT 
    REWARD.idol_idx as a_idol, reward_currentMoney, SUPPORT.idol_idx as b_idol, support_currentMoney
FROM
    (SELECT 
        idol_idx, SUM(reward_currentMoney) reward_currentMoney
    FROM
        REWARD
    GROUP BY idol_idx) AS REWARD
        RIGHT JOIN
    (SELECT 
        idol_idx, SUM(support_currentMoney) AS support_currentMoney
    FROM
        SUPPORT
    GROUP BY idol_idx) AS SUPPORT ON REWARD.idol_idx = SUPPORT.idol_idx;`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.idxToName = (Transaction, itemRanking, next) => {
  const idol_name = []
  let result1
  return Transaction(async (connection) => {
    for (const i in itemRanking) {
      const Query1 = `
            SELECT idol_name FROM IDOL WHERE idol_idx = ${itemRanking[i]}`
      result1 = await connection.query(Query1)
      idol_name.push(result1[0])
    }
    return idol_name
  }).catch(error => {
    return next(error)
  })
}

exports.getMedia = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
      media_idx,
      media_title,
      a.image_key
    FROM
      MEDIA_TITLE_IMAGE a
    JOIN MEDIA b USING (media_idx)`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getIdolMedia = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
      media_idx,
      media_title,
      b.image_key
    FROM
      MEDIA a
    JOIN MEDIA_TITLE_IMAGE b USING (media_idx) WHERE idol_idx = ${req.params.idol_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
