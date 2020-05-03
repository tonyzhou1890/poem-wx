<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <uni-load-more
      v-if="loading"
      status="loading"
    ></uni-load-more>
		<view
      class="section"
      v-for="(item, index) in types"
      :key="index"
    >
      <view class="section-title">{{ item.title }}</view>
      <view class="section-content">
        <text
          v-for="(tag, tIndex) in data[index]"
          :key="tIndex"
          class="tag"
          @click="handleClickTag(tag, item.type)"
        >{{ tag['text'] }}</text>
      </view>
    </view>
	</view>
</template>

<script>
  import { tagsByType } from '../../service/api.js'
	export default {
		data() {
			return {
        loading: false,
				types: [{
          type: 'fenlei',
          title: '分类'
        }, {
          type: 'chaodai',
          title: '朝代'
        }, {
          type: 'congshu',
          title: '丛书'
        }],
        data: [],
        bgc: ''
			}
		},
    onLoad() {
      this.getTags()
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
		methods: {
      // 获取标签
			getTags() {
        this.loading = true
        Promise.all(this.types.map(item => {
          return tagsByType({ type: item.type })
        }))
          .then(res => {
            this.types.map((item, index) => {
              if (item.type === 'congshu') {
                res[index].data.map(tag => tag.text = `《${tag.text}》`)
              }
              this.data[index] = res[index].data
            })
          })
          .finally(e => {
            this.loading = false
          })
      },
      // 点击标签
      handleClickTag(tag, type) {
        uni.navigateTo({
          url: `../typePoem/typePoem?tag=${encodeURIComponent(tag.text)}&type=${type}`
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    color: $main-text-color;
    .section {
      .section-title {
        background-color: #f7f7f7;
        border-bottom: 1px solid #e5e5e5;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
      }
      .section-content {
        line-height: 36px;
        .tag {
          padding: 0 10px;
          margin: 10px;
          display: inline-block;
          white-space: pre-wrap;
        }
      }
    }
  }
</style>
