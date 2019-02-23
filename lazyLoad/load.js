class Throttle {
  constructor() {
      this.timer = false
  }
  init() {
      return function (callback, delay, that) {
          if (this.timer) {
              return false;
          }
          this.timer = true
          callback.call(that)

          setTimeout(() => {
              this.timer = false;
          }, delay)
      }
  }
}
let throttle = (function () {
  let thr = new Throttle()
  thr = thr.init().bind(thr)
  return thr
})()

let viewport = (function () {
  let pageWidth = window.innerWidth
  let pageHeight = window.innerHeight
  if (typeof pageHeight != 'number') {
    if (document.compatMode == 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth
      pageHeight = document.documentElement.clientHeight
    } else {
      pageWidth = document.body.clientWidth
      pageWidth = document.body.clientWidth
    }
  }
  return {
    pageWidth,
    pageHeight
  }
})()

  
  function _isShow(context, key) {
    let top = context.$refs[key][0].getBoundingClientRect().top,
    bottom = context.$refs[key][0].getBoundingClientRect().bottom,
    screenHeight = window.screen.height
   
    if (bottom<0 || top > viewport.pageHeight ) { // screenHeight*2
      return false
    } else {
      return true
    }
  }

  function loadImg() {
    let src, datasrc
    for (let key in this.$refs) {
      src = this.$refs[key][0].src
      datasrc = this.$refs[key][0].dataset.src
      if (_isShow(this, key) && !src && datasrc) {
        this.$refs[key][0].src = datasrc
      }
    }
  }

export default {
  throttle,
  loadImg
}