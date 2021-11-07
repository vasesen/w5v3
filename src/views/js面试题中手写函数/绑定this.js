/**
 * call,apply,bind 都可以改变函数的this指向
 * 如果对于传入的参数不确定，推荐使用apply
 * 对于有明确规定的参数，推荐使用call
 * 对于想先绑定一个新函数，不立马执行的使用bind
 */

Function.prototype.myCall = function(targetObj){
  targetObj.fn = this
  targetObj.fn()
  delete targetObj.fn
}

Function.prototype.myBind = function(){
  // 将参数拆解为数组 
  const args = Array.prototype.slice.call(arguments)
  //提取 this  args 的第一项
  const t = args.shift()
  const self = this
  return function() {
    return self.apply(t,args)
  }
}
