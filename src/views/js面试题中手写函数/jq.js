// 手写jQ
class Jquery{
  constructor(selector){
    const result = document.querySelector(selector)
    const length = result.length
    for(let i= 0;i<length;i++){
      this[i] = result[i]
    }
    this.length = length
    this.selector = selector
  }
  get(index) {
    return this[index]
  }
  each(fn){
    for (let i =0;i<this.length;i++){
      const elem = this[i]
      fn(elem)
    }
  }
  on(type,fn){
    return this.each(ele=>{
      ele.addEventListener(type,fn,false)
    })
  }
}

Jquery.prototype.message = function(info){
  alert(info)
}