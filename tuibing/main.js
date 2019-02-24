class Pos {
  constructor (card=[], ) {
    this.card = card
    this.sat = []
  }
  getCard (card) { // 牌
    this.card.push(card)
  }
  clear () { // 清牌
    this.card = []
    this.sat = []
  }
  isPair () { // 是否是对子
    if (this.card.length && this.card.length == 2) {
      return this.card[0] == this.card[1]
    }
  }
  pointNum () { // 牌的点数
    return (this.card[0] +this.card[1]) % 10
  }
  betMoney (peoArr) { //押注人 {who: , money: }
    this.sat.push(peoArr)
  }
}

class Player {
  constructor (money=0) {
    this.money = money
    this.in = 0
  }
  capital (x) { // 押的底钱。
    this.in = x
    this.money = this.money - x
    return this.in
  }
  win (x) {
    this.money = this.money + x 
  }
  doubleLose () { // 双倍输，总钱数再减去本次压得钱
    this.money = this.money - this.in
    return this.in
  }
}

const Poker = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10]

// shaizi 
function shaizi () {
  return Math.random()*10 + 1
} 

// 随机发牌函数
function deliverCard () {
  if (!Poker.length) {
    Poker.push(1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10)
  }
  let pos = Math.floor( Math.random() * Poker.length )
  // console.log(pos)
  let temp = Poker[pos]
  Poker.splice(pos,1)
  return temp
}


// 输赢。
// 赢得规则。
// 如果是对，返回第一张牌的比较。赏金*2
// 如果不是对，返回结果 - 10的比较
// 一个是对，一个不是对，对赢。

function win (x, y) {
  let temp = {
    win:true,
    type:1, // 1：没有对子 2：有对子
  }
  if (x.isPair() && y.isPair() ) {
    temp.win = x.card[0] - y.card[0] >= 0
    temp.type = 2
  } else if (x.isPair() || y.isPair() ) {
    temp.win = x.isPair()
    temp.type = 2
  } else {
    temp.win = x.pointNum() - y.pointNum() >= 0
    temp.type = 1
  }
  return temp
 }

 function zhuangWin(zhuoziPos) {
  zhuoziPos.sat.forEach( item => {
    zhuang.win(item[1])
  })
}

function zhuangWin2 (zhuoziPos) {
  zhuoziPos.sat.forEach( item => {
    zhuang.win(item[1] * 2)
    item[0].doubleLose()
  })
}

function zhuangLose (zhuoziPos) {
  zhuoziPos.sat.forEach( item => {
    item[0].win(item[1]) // 取回本钱
    item[0].win(zhuang.capital(item[1])) // 庄家赔等量的钱
  })
}
function zhuangLose2 (zhuoziPos) {
  zhuoziPos.sat.forEach( item => {
    item[0].win(item[1]) // 取回本钱
    item[0].win(zhuang.capital(item[1] * 2)) // 庄家赔2倍的钱
  })
}

//赢家收钱，输家赔钱
function settle (zhuozi) {
  for (let i = 1; i< zhuozi.length; i++ ) {
    let winObj = win(zhuozi[0], zhuozi[i])
    if (winObj.win) { // 两种赢法，对子的赢和普通的赢。
      if (winObj.type === 1) { // 普通赢法。
        zhuangWin(zhuozi[i])
      } else {
        zhuangWin2(zhuozi[i])
      }
    } else {
      if (winObj.type === 1) { // 普通输法。
        zhuangLose(zhuozi[i])
      } else {
        zhuangLose2(zhuozi[i])
      }
    }
  }
}




// 初始化牌桌
let pos0 = new Pos()
let pos1 = new Pos()
let pos2 = new Pos()
let pos3 = new Pos()

// 牌桌
let zhuozi = [pos0, pos1, pos2, pos3]

// 初始化玩家

let zhuang = new Player(1000)
let player1 = new Player(1000)
let player2 = new Player(1000)
let player3 = new Player(1000)


export default {
  zhuozi,

  zhuang,
  player1,
  player2,
  player3,
  shaizi,
  deliverCard,
  settle,
  Poker
}
