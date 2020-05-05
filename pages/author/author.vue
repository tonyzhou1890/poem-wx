<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
		<view class="filter-wrapper">
      <input
        class="filter-input"
        placeholder="搜索(此页为不完全列表)"
        v-model="filterText"
      />
    </view>
    <view class="list-wrapper">
      <uni-load-more
        v-if="loading"
        status="loading"
      ></uni-load-more>
      <uni-indexed-list
        :options="list"
        @click="handleClickAuthor"
      ></uni-indexed-list>
    </view>
	</view>
</template>

<script>
  import { sort } from '../../utils/util.js'
  import { authorList } from '../../service/api.js'
	export default {
		data() {
			return {
				filterText: '',
        loading: false,
        data: [],
        bgc: ''
			}
		},
    computed: {
      list() {
        const s = Date.now()
        let temp = []
        let tempItem = null
        let _data = JSON.parse(JSON.stringify(this.data))
        // 数据分组
        for (let i = 0, len = _data.length; i < len; i++) {
          // 是否过滤
          if (this.filterText && _data[i].xingming.indexOf(this.filterText) === -1) continue
          
          tempItem = null
          for (let tempIndex = 0, tempLen = temp.length; tempIndex < tempLen; tempIndex++) {
            if (temp[tempIndex].letter === _data[i].xingpy) {
              tempItem = temp[tempIndex]
              break
            }
          }
          // tempItem = temp.find(item => item.letter === this.data[i].xingpy)
          if (tempItem) {
            tempItem.data.push(_data[i].xingming)
          } else {
            temp.push({
              letter: _data[i].xingpy,
              data: [_data[i].xingming]
            })
          }
        }
        console.log(Date.now() - s)
        // 分组排序
        temp.sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
        // sort(temp, (a, b) => {
        //   return a.letter < b.letter
        // })
        console.log(Date.now() - s)
        return temp
      }
    },
    onLoad() {
      this.getAuthorList()
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
		methods: {
      // 获取作者列表
			getAuthorList() {
        this.loading = true
        authorList({
          page: 1,
          rows: 1000
        })
          .then(data => {
            this.data = data.data.data
          })
          .finally(e => {
            this.loading = false
          })
      },
      // 点击作者
      handleClickAuthor(e) {
        uni.navigateTo({
          url: '../authorPoem/authorPoem?author=' + encodeURIComponent(e.item.name)
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    .filter-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .filter-input {
        height: 26px;
        line-height: 26px;
        background-color: $light-bgc;
        padding-left: 10px;
      }
    }
    .list-wrapper {
      width: calc(100% - 10px);
      height: calc(100% - 46px);
      position: relative;
      left: 10px;
      /deep/ .uni-indexed-list__title-wrapper, /deep/ .uni-indexed-list__list {
        background-color: transparent;
      }
    }
  }
</style>
