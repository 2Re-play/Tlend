exports.closingDate = (finishDate) => {
  return new Promise((resolve) => {
    console.log('날짜계산 1단계', finishDate.getTime())
    const currentDate = new Date()
    console.log('날짜계산 2단계', currentDate.getTime())
    const distance = finishDate.getTime() - currentDate.getTime()
    console.log('날짜계산 3단계', toString(distance))
    const day = Math.floor(distance / (1000 * 60 * 60 * 24)) * -1
    console.log('날짜계산 4단계', day)
    resolve(day)
  })
}
