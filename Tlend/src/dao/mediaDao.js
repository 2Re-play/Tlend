exports.postMedia = (Transaction, req, next) => {
  Transaction(async (connection) => {
    const videoData = req.files.video[0]
    const imageData = req.files.image[0]
    // const detailImg = req.files.detailImage[0]
    const Query1 = `INSERT INTO
            MEDIA(
                idol_idx,
                media_title,
                media_description)
            VALUES (
                ${req.params.idol_idx},
                "${req.body.media_title}",
                "${req.body.media_description}"
                     )`
    await connection.query(Query1)
    const Query2 = `
      SELECT media_idx FROM MEDIA WHERE media_title = "${req.body.media_title}"`
    const media_idx = await connection.query(Query2)
    const Query3 = `
          INSERT INTO IMAGE
            (media_idx, image_originalName, image_key, image_location, image_size) 
      VALUES(${media_idx[0].media_idx},
            "${imageData.originalname}",
            "${imageData.transforms[0].key}",
            "${imageData.transforms[0].location}",
            "${imageData.transforms[0].size}")`
    await connection.query(Query3)

    const Query4 = `
    INSERT INTO VIDEO
            (media_idx, video_originalName, video_key, video_location, video_size) 
      VALUES(${media_idx[0].media_idx},
            "${videoData.originalname}",
            "${videoData.key}",
            "${videoData.location}",
            "${videoData.size}")
    `
    await connection.query(Query4)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}
