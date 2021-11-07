const PENDING = 'pending'
const RESOLVED ="resloved"
const REJECTED ='rejected'
class Promise {
  constructor(callback) {
    this.state = PENDING
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    callback(value => {
      if (this.state === 'PENDING') {
        this.state = RESOLVED
        this.value = value
        this.resolvedCallbacks.map(callback => callback(value))
      }
    },
      value => {
        if (this.state === 'PENDING') {
          this.state = REJECTED
          this.value = value
          this.rejectedCallbacks.map(callback => callback(value))
        }
      }
    )
  }
}

Promise.prototype.then = function(onFulfilled =()=>{}, onRejected = () => {}){
  if(this.state === PENDING){
    this.resolvedCallbacks.push(onFulfilled)
    this.rejectedCallbacks.push(onFulfilled)
  }

  if(this.state === RESOLVED){
    onFulfilled(this.value)
  }
}