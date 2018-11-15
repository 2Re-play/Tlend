exports.percent = (currentMoney, goalMoney) => {
  return new Promise((resolve) => {
    const result = currentMoney / goalMoney * 100
    console.log(result)
    resolve(result)
  })
}
