const { map, mapKeys } = require("lodash-es")

//数组拍平
const flat =  (arr)  => {
  const isDeep = arr.some(item => item instanceof Array)
  if(!isDeep) return arr
  const res  = Array.prototype.concat.apply([],arr)
  return flat(res)
}

// flat([1,2,3,[4,5,6,[7,8,9]],10]) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 数组去重 hash 
//Array.from(new set(arr))
// const duplicate  = (arr) => {
//   map = new Map()
//   for(let i=0;i<arr.length;i++){
//     if(!map.has(arr[i])) map.set(arr[i],i)
//   }
//   let list = []
//   [...map].forEach(ele=> list.push(ele[0]))
//   return list
// }