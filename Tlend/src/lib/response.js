const _ = require('lodash')

exports.respondJson = (message, obj, res, status) => {

  console.log(status)
  res
    .status(status)
    .json({
      message,
      data: _.isEmpty(obj) ? {} : obj,
    })
  
}

exports.respondJson2 = (message, res, status) => {

  console.log(status)
  res
    .status(status)
    .json({
      message,
    })

}

exports.respondOnError = (message, res, status) => {

  console.log(status)
  res
    .status(status)
    .json({
      message,
    })
  
}
