/**
 * 随机取出数组中的几项
 * @param arr
 * @param count
 * @returns {*}
 */
export const getRandomArr = (arr, count) => {
  let shuffled = arr.slice(0)
  // 克隆一个数组，为了不影响外边的数据
  let i = arr.length
  let min = i - count
  let temp
  let index
  // 存下来数组信息  数组的长度
  // 通过改变数组项的位置 输出后边的几位
  while (--i > min) {
    // 随机生成出一个索引
    index = Math.floor((i + 1) * Math.random())
    // 将随机索引项暂存
    // 将数组后边的项与随机项调换
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 节流函数
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
