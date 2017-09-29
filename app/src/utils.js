/**
 * 四舍五入
 * @param origin 原来的操作数
 * @param bit 小数点后保留的位数
 * @param floor 是否向下取整
 * @return {number} 返回取整后的数字
 */
const rounding = (origin, bit = 3, floor = true) => {
  if (origin === undefined || bit === undefined) {
    console.error('err', origin, bit)
    return
  }
  if (floor) {
    return Math.floor(origin * Math.pow(10, bit)) / Math.pow(10, bit)
  } else {
    return Math.ceil(origin * Math.pow(10, bit)) / Math.pow(10, bit)
  }

}
/**
 * 计算规定个数的正弦值
 * @param {number} num =需要生成的正弦值的个数
 * @return {{xIndex: Array, sineRes: Array}} x轴的Index和对应的sin值
 */
const calcSine = (num) => {
  if (num) {
    let xIndex = []
    let sineRes = []
    for (let i = 0; i < num; i++) {
      let xIndexItem = 2 * i * Math.PI / num
      let sineResItem = Math.sin(xIndexItem)
      xIndex.push(xIndexItem)
      sineRes.push(sineResItem)
    }
    return {xIndex, sineRes}
  } else {
    console.log('please input the number')
  }
}
export {rounding, calcSine}