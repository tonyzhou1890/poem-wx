<template>
  <view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <!-- 搜索层 -->
    <view class="search-wrapper">
      <search-bar
        class="search-bar"
        padding="0"
        borderWidth="0"
        radius="0"
        bgColor="#eee"
        @status-change="handleStatusChange"
        @confirm="handleConfirm"
        ref='searchBar'
      ></search-bar>
      <view v-if="showHistory" class="search-list">
        <view class="history-header">
          <text>搜索历史</text>
          <icon
            v-if="historyList.length"
            type="clear"
            size="20"
            @tap="handleClearHistory"
          ></icon>
        </view>
        <view class="history-body" v-if="historyList.length">
          <text
            v-for="(item, index) in historyList"
            :key="index"
            @tap="handleConfirm({ value: item }, true)"
          >{{ item }}</text>
        </view>
        <Empty v-else text='暂无历史'></Empty>
      </view>
    </view>
    <!-- 结果层 -->
    <view class="content-wrapper">
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
    </view>
  </view>
</template>

<script>
  import SearchBar from '../../components/search-bar/search-bar.vue'
  import Empty from '../../components/empty/empty.vue'
  import ClTabs from '../../components/cl-tabs/cl-tabs.vue'
  import PoemList from '../../components/poem-list/poem-list.vue'
  import { mainColor, storageKeys } from '../../utils/config.js'
  import { search } from '../../service/api.js'
  export default {
    components: {
      SearchBar,
      Empty,
      ClTabs,
      PoemList
    },
    data() {
      return {
        showHistory: false,
        historyList: [],
        tabs: ['作者', '标题', '诗词'],
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
    methods: {
      // 搜索框状态改变
      handleStatusChange(val) {
        this.showHistory = val.value
        if (this.showHistory) {
          this.historyList = uni.getStorageSync(storageKeys.search) || []
        }
      },
      // 确认搜索
      handleConfirm(val, isHistory) {
        const str = val.value && val.value.trim()
        if (str) {
          // 先获取缓存
          let temp = uni.getStorageSync(storageKeys.search)
          temp = Array.isArray(temp) ? temp : [];
          // 删除相同的值
          if (temp.indexOf(str) > -1) {
            temp.splice(temp.indexOf(str), 1)
          }
          // 将此次的值添加到首部
          temp.unshift(str)
          // 最多十个值
          temp = temp.slice(0, 10)
          try {
            uni.setStorageSync(storageKeys.search, temp)
          } catch (e) {
            console.log(e)
          }
          // 如果是历史
          if (isHistory) {
            this.$refs.searchBar.setInputText(val.value)
          }
          // 请求新数据
          this.tabIndex = 0
          this.poemList(true)
        } else {
          uni.showToast({
            icon: 'none',
            title: '没有搜索内容'
          })
        }
      },
      // 删除历史
      handleClearHistory() {
        try {
          uni.setStorageSync(storageKeys.search, [])
          this.historyList = []
        } catch (e) {
          console.log(e)
        }
      },
      // tab改变
      handleTabChange(index) {
        this.tabIndex = index
        this.poemList(true)
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
      poemList(reset) {
        if (this.loading) return
        // 是否需要重置
        if (reset) {
          this.total = 0
          this.isAll = false
          this.page = 0
          this.data = []
        }
        if (this.isAll) return
        let type = ''
        switch (this.tabIndex) {
          case 0:
            type = 'author'
            break
          case 1:
            type = 'title'
            break
          case 2:
            type = 'content'
            break
        }
        if (type) {
          this.loading = true
          search({
            page: this.page + 1,
            rows: this.rows,
            keyword: this.$refs.searchBar.searchVal,
            type
          })
            .then(data => {
              this.data = this.data.concat(data[type].data.map(item => {
                item.title = item.mingcheng
                item.author = item.chaodai + '/' + item.zuozhe
                item.summary = item.zhaiyao
                return item
              }))
              this.page = this.page + 1
              this.total = data[type].total
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
    },
    onLoad() {
      this.tabIndex = 0
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
    .search-wrapper {
      width: calc(100% - 20px);
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 2;

      .search-list {
        width: 100%;
        background-color: white;
        box-shadow: 2px 2px 2px $light-bgc;
        box-sizing: border-box;
        padding: 5px;
        .history-header {
          width: 100%;
          line-height: 1.6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          padding-bottom: 5px;
        }
        .history-body {
          border-top: 0.5px solid $light-bgc;
          text {
            font-size: 14px;
            margin: 5px;
            display: inline-block;
            padding: 5px;
            border-radius: 5px;
            border: 0.5px solid $light-bgc;
          }
        }
      }
    }
    .content-wrapper {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 46px;
      .list-scroll-view {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        height: calc(100% - 46px);
      }
    }
  }
</style>
