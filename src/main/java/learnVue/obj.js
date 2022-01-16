let car = {}
let val = 3000
Object.defineProperty(car, 'price', {
  enumerable: true,
  configurable: true,
  get(){
    console.log('price read')
    return val
  },
  set(newVal){
    console.log('price write')
    val = newVal
  }
})

