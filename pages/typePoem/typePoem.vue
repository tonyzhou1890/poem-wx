<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <!-- list -->
    <scroll-view
      v-if="!tabIndex"
      class="list-scroll-view"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
    >
      <!-- img -->
      <image
        v-if="isType"
        class="type-image"
        :src="src"
      ></image>
      <poem-list
        :list="data"
        @click-item="handleClickPoem"
      ></poem-list>
      <uni-load-more
        v-if="loading || isAll"
        :status="isAll ? 'noMore' : 'loading'"
      ></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
  import Empty from '../../components/empty/empty.vue'
  import PoemList from '../../components/poem-list/poem-list.vue'
  import { poemListByTag } from '../../service/api.js'
  export default {
    components: {
      Empty,
      PoemList
    },
    data() {
      return {
        isType: false, // 是否是分类
        type: '',
        tag: '',
        loading: false,
        rows: 20,
        page: 0,
        total: 0,
        data: [],
        isAll: false,
        bgc: '',
        src: ''
      }
    },
    onLoad(options) {
      this.tag = decodeURIComponent(options.tag)
      this.type = options.type
      this.isType = this.type === 'fenlei'
      this.src = getApp().globalData.imgPrefix + `/fenlei/0${this.tag}.jpg`
      uni.setNavigationBarTitle({
        title: this.tag
      })
      this.poemList()
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
    methods: {
      // 进入详情
      handleClickPoem(e) {
        uni.navigateTo({
          url: '../article/article?id=' + e._id
        })
      },
      // 加载更多
      handleScrollToLower() {
        this.poemList()
      },
      // 获取诗词
      poemList() {
        if (this.loading) return
        if (this.isAll) return
        
        this.loading = true
        poemListByTag({
          page: this.page + 1,
          rows: this.rows,
          field: this.type,
          tag: this.type === 'congshu' ? this.tag.replace(/[《》]/g, '') : this.tag
        })
          .then(data => {
            this.data = this.data.concat(data.data.map(item => {
              item.title = item.mingcheng
              item.author = item.chaodai + '/' + item.zuozhe
              item.summary = item.zhaiyao
              return item
            }))
            this.page = this.page + 1
            this.total = data.total
            if (this.total === 0 || this.data.length >= this.total) {
              this.isAll = true
            } else {
              this.isAll = false
            }
          })
          .finally(e => {
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
    .type-image {
      width: 100%;
      height: 300rpx;
      background-color: $light-bgc;
      box-shadow: 0px 0px 5px $light-bgc;
    }
    .list-scroll-view {
      width: 100%;
      height: 100%;
    }
  }
</style>
