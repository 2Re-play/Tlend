exports.myBaby = (Transaction, req, next) => {
  let result
  const idol_name = []
  return Transaction(async (connection) => {
    const Query1 = `SELECT idol_idx FROM FAN WHERE user_idx = ${req.headers.user_idx}`
    const idol_idx = await connection.query(Query1)
    for (const i in idol_idx) {
      const Query2 = `
            SELECT idol_name FROM IDOL WHERE idol_idx = ${idol_idx[i].idol_idx}`
      result = await connection.query(Query2)
      idol_name.push(result[0].idol_name)
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
  return Transaction(async (connection) => {
    const Query1 = `
            SELECT idol_name FROM IDOL WHERE idol_idx = ${itemRanking.first}`
    const result1 = await connection.query(Query1)

    const Query2 = `
            SELECT idol_name FROM IDOL WHERE idol_idx = ${itemRanking.second}`
    const result2 = await connection.query(Query2)
    const Query3 = `
          SELECT idol_name FROM IDOL WHERE idol_idx = ${itemRanking.third}`
    const result3 = await connection.query(Query3)
    idol_name.push(result1[0], result2[0], result3[0])
    return idol_name
  }).catch(error => {
    return next(error)
  })
}

exports.getMedia = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
      media_title,
      b.video_key
    FROM
      MEDIA a
    JOIN VIDEO b USING (media_idx)`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
