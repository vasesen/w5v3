
const  debounce = (fn, delay=300) =>{
  let timer = null;
  return function (){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
      timer = null
    },delay)
  }
}


const throttle = (fn, delay=300) => {
  let timer  = null 
  return  function () {
    if(timer) return
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
      timer = null
    },delay)
  }
}

/**
 * js 缓冲函数
 * arguments.callee 属性包含当前正在执行的函数。
 * callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。
 * 这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为“匿名函数”)内。
 * ES5 严格模式 已禁止用该api
 */
const multistep = (steps,arguments,delay=300) => {
   let tasks = steps.concat() 
   setTimeout(() => {
    let tasks = tasks.shift();
    tasks.apply(null,arguments ||[])
    if(tasks.length > 0) {
      setTimeout(arguments.callee,25)
    }else{
      callback()
    }
   },delay)
}
