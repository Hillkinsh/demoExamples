<template>
  <div></div>
</template>
<script>
import main from './main.js'

let zhuozi = main.zhuozi

function run () { // 最基本玩法。各玩家每次不改策略。
  // 押钱
  // 玩家自由押钱，庄家无需押钱。
  zhuozi[1].betMoney([main.player1, main.player1.capital(1)])
  zhuozi[2].betMoney([main.player2, main.player2.capital(1)])
  zhuozi[3].betMoney([main.player3, main.player3.capital(1)])

  // 摇骰子
  let start = Math.floor(main.shaizi() ) % 4 - 0

  // 发牌
  for (let i=start; i < start + 8; i++) {
    main.zhuozi[i%4].getCard(main.deliverCard())
  }



  main.settle(zhuozi) 
  console.log(main.zhuang)
  console.log(main.player1)
  console.log(main.player2)
  console.log(main.player3)
  console.log('---------------------------------')
  // 清桌子
  zhuozi[0].clear()
  zhuozi[1].clear()
  zhuozi[2].clear()
  zhuozi[3].clear()
 
}

// 开始下一局。
// run()
// for (let i=0; i<700;i++) {
//   run()
// }

function run2 () { // 加倍玩法、即2^(n+1) -1
  // 押钱
  // 玩家自由押钱，庄家无需押钱。
  if (main.player1.loseArr.length) {
    let length = main.player1.loseArr.length
    let temp = main.player1.loseArr[length - 1] + Math.pow(2, length)
    if (temp > 500 ) temp = 500
    zhuozi[1].betMoney([main.player1, main.player1.capital(temp)])
  } else {
    zhuozi[1].betMoney([main.player1, main.player1.capital(1)])
  }
  zhuozi[2].betMoney([main.player2, main.player2.capital(1)])
  zhuozi[3].betMoney([main.player3, main.player3.capital(1)])

  // 摇骰子
  let start = Math.floor(main.shaizi() ) % 4 - 0

  // 发牌
  for (let i=start; i < start + 8; i++) {
    main.zhuozi[i%4].getCard(main.deliverCard())
  }



  main.settle(zhuozi) 
  // console.log(main.zhuang)
  console.log(main.player1)
  // console.log(main.player2)
  // console.log(main.player3)
  console.log('---------------------------------')
  // 清桌子
  zhuozi[0].clear()
  zhuozi[1].clear()
  zhuozi[2].clear()
  zhuozi[3].clear()
 
}

for (let i=0; i<1000;i++) {
  run2()
}


export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>

</style>
