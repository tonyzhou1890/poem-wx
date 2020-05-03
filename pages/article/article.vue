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
    <view class="collect">
      <image
        v-if="isCollected"
        src='../../static/images/collect2.png'
        @click="handleCollection(true)"
      ></image>
      <image
        v-else
        src='../../static/images/collect.png'
        @click="handleCollection(true)"
      ></image>
    </view>
		<view v-if="!loading" class="title">
      <text>{{ data.mingcheng }}</text>
    </view>
    <view v-if="!loading" class="author">
      <text>{{ data.chaodai }}/{{ data.zuozhe }}</text>
    </view>
    <view v-if="!loading" class="content">
      <text>{{ data.yuanwen }}</text>
    </view>
	</view>
</template>

<script>
  import { getById } from '../../service/api.js'
  import { storageKeys } from '../../utils/config.js'
	export default {
		data() {
			return {
        loading: false,
				data: {},
        isCollected: false,
        id: null,
        bgc: ''
			}
		},
    onLoad(options) {
      this.id = options.id
      if (!this.id) {
        uni.showToast({
          icon: 'none',
          title: '参数错误'
        })
      } else {
        this.getPoem(options.id)
      }
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
    onShow() {
      this.handleCollection()
    },
		methods: {
      // 获取诗词内容
			getPoem(id) {
        this.loading = true
        getById({ id })
          .then(data => {
            this.data = data.data
            uni.setNavigationBarTitle({
              title: this.data.mingcheng
            })
          })
          .finally(e => {
            this.loading = false
          })
      },
      // 是否收藏
      handleCollection(action) {
        let collection = uni.getStorageSync(storageKeys.collection) || []
        collection = Array.isArray(collection) ? collection : []
        
        if (collection.find(item => Number(item._id) === Number(this.id))) {
          this.isCollected = true
        } else {
          this.isCollected = false
        }
        // 如果是收藏/取消操作
        if (action) {
          if (this.isCollected) {
            let index = null
            collection.map((item, i) => {
              if (Number(item._id) === Number(this.id)) index = i
            })
            collection.splice(index, 1)
          } else {
            collection.unshift({
              ...this.data,
              yuanwen: undefined
            })
          }
          try {
            uni.setStorageSync(storageKeys.collection, collection)
            this.isCollected = !this.isCollected
          } catch (e) {
            console.log(e)
          }
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    text-align: center;
    line-height: 2.0;
    .collect {
      width: 26px;
      height: 26px;
      position: absolute;
      right: 10px;
      top: 10px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      padding-top: 50px;
      font-size: 20px;
      color: $main-text-color;
    }
    .author {
      color: $main-color;
    }
    .content {
      color: $third-text-color;
    }
  }
</style>
