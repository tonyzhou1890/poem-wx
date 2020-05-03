<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <!-- tabs -->
    <cl-tabs
      tabWidth="100%"
      fontSize="16"
      type="hang"
      aniType="extend"
      backgroundColor="transparent"
      :center="true"
      :tabBars="tabs"
      :tabIndex="tabIndex"
      :selectColor="mainColor"
      :sliderColor="mainColor"
      @tabChange="handleTabChange"
    ></cl-tabs>
    <!-- list -->
    <scroll-view
      v-if="!tabIndex"
      class="list-scroll-view"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
    >
      <poem-list
        :list="data"
        @click-item="handleClickPoem"
      ></poem-list>
      <uni-load-more
        v-if="loading || isAll"
        :status="isAll ? 'noMore' : 'loading'"
      ></uni-load-more>
    </scroll-view>
    <!-- 作者信息 -->
    <view
      v-else
      class="author-info"
    >
      <text
        v-for="(para, index) in authorInfo.jieshaoArr"
        :key="index"
      >{{ para }}</text>
      <empty
        v-if="!authorInfo.jieshaoArr.length"
        text="暂无记录"
      ></empty>
    </view>
  </view>
</template>

<script>
  import Empty from '../../components/empty/empty.vue'
  import ClTabs from '../../components/cl-tabs/cl-tabs.vue'
  import PoemList from '../../components/poem-list/poem-list.vue'
  import { mainColor, storageKeys } from '../../utils/config.js'
  import { getPoemsByAuthor } from '../../service/api.js'
  export default {
    components: {
      Empty,
      ClTabs,
      PoemList
    },
    data() {
      return {
        author: '',
        authorInfo: {
          jieshaoArr: []
        },
        tabs: ['诗词', '作者'],
        tabIndex: -1, // 在 onload 再改为 0 ，因为 cl-tabs 组件有初始滑块不渲染的 bug
        mainColor,
        loading: false,
        rows: 20,
        page: 0,
        total: 0,
        data: [],
        isAll: false,
        bgc: ''
      }
    },
    onLoad(options) {
      this.tabIndex = 0
      this.author = decodeURIComponent(options.author)
      uni.setNavigationBarTitle({
        title: this.author
      })
      this.poemList()
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
    methods: {
      // tab改变
      handleTabChange(index) {
        this.tabIndex = index
      },
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
        getPoemsByAuthor({
          page: this.page + 1,
          rows: this.rows,
          author: this.author
        })
          .then(data => {
            this.data = this.data.concat(data.data.data.map(item => {
              item.title = item.mingcheng
              item.author = item.chaodai + '/' + item.zuozhe
              item.summary = item.zhaiyao
              return item
            }))
            this.page = this.page + 1
            this.total = data.data.total
            this.authorInfo = data.data.authorInfo || { jieshaoArr: [] }
            if (this.authorInfo.jieshao) {
              this.authorInfo.jieshaoArr = this.authorInfo.jieshao.split('\n')
            }
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
    overflow: auto;
    .list-scroll-view {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      height: calc(100% - 46px);
    }
    .author-info {
      box-sizing: border-box;
      padding: 10px;
      line-height: 1.5;
      text {
        display: block;
        white-space: pre-wrap;
        text-indent: 2em;
      }
    }
  }
</style>
