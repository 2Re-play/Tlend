const cf = require('aws-cloudfront-sign')
const options = require('../../config/cloudfront.json')
// cloudfront 키페어 아이디와 키페어.pem 으로 접속
async function video(filePath) {
  // var filePath = '1529152447911.jpeg'; // 업로드할때 디비에 s3에 저장된 파일이름을 저장
  const signedUrl = cf.getSignedUrl(`http://d1nby6wa4kk2z9.cloudfront.net/${filePath}`, options)    
  return signedUrl
}


module.exports.video = video
