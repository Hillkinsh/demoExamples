<template>
    <div>
        <div class="mod-coursePackageDetail">
            <img v-for="(img,idx) in staticConfig.backgroundUrls" 
            :ref="'img'+idx"
            :key="idx"
            style="width:100%"
            :data-src="img" 
            alt="" 
             />
        </div>
        
    </div>
</template>
<script>
    import load from './load.js'
   
    const staticConfig = {
        backgroundUrls: [
            'https://img.vipkidstatic.com/beeschool/server/1548745804150/1.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745823195/2.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745836794/3.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745851052/4.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745864326/5.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745879453/6.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745892306/7.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745905364/8.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745918639/9.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745930980/10.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745942460/11.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745953581/12.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745964541/13.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745976232/14.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745988013/15.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548745999023/16.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548746010600/17.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548746021985/18.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548746033571/19.jpg',
            'https://img.vipkidstatic.com/beeschool/server/1548746045930/20.jpg',
        ]
    }

    let  methods = {
         watchScroll () { // 监听滚动事件。
            window.addEventListener('scroll',  () => {
                return load.throttle(load.loadImg, 50, this) 
            }, true)

            // load.loadImg.call(this)
        }

    } 
   

export default {
    async created() {
        this.watchScroll()
    },
    methods,
    data() {
        return {
            staticConfig:staticConfig
        };
  },
};
</script>
<style scoped>
img {
    min-height: 500px;
    vertical-align: bottom;
}
</style>
