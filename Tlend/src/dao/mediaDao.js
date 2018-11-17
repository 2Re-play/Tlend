exports.postMedia = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const videoData = req.files.video[0]
    const imageData1 = req.files.detail_image[0]
    const imageData2 = req.files.title_image[0]

    // const detailImg = req.files.detailImage[0]
    const Query1 = `INSERT INTO
            MEDIA(
                idol_idx,
                media_title)
            VALUES (
                ${req.params.idol_idx},
                "${req.body.media_title}"               
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT media_idx FROM MEDIA WHERE media_title = "${req.body.media_title}"`
    const media_idx = await connection.query(Query2)
    const Query3 = `
          INSERT INTO IMAGE
            (media_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${media_idx[0].media_idx},
            "${imageData1.originalname}",
            "${imageData1.transforms[0].key}",
            "${imageData1.transforms[0].location}",
            "${imageData1.transforms[0].size}")`
    await connection.query(Query3)
    const Query4 = `
          INSERT INTO MEDIA_TITLE_IMAGE
            (media_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${media_idx[0].media_idx},
            "${imageData2.originalname}",
            "${imageData2.transforms[0].key}",
            "${imageData2.transforms[0].location}",
            "${imageData2.transforms[0].size}")`
    await connection.query(Query4)

    const Query5 = `
    INSERT INTO VIDEO
            (media_idx, video_originalName, video_key, video_location, video_size) 
      VALUES(${media_idx[0].media_idx},
            "${videoData.originalname}",
            "${videoData.key}",
            "${videoData.location}",
            "${videoData.size}")
    `
    await connection.query(Query5)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}


exports.getMediaDetail = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
      m.idol_idx ,media_idx, image_key AS detail_image, video_key
    FROM
      (IMAGE
        JOIN
      VIDEO USING (media_idx)) JOIN MEDIA m USING(media_idx)
    WHERE
      media_idx = ${req.params.media_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
