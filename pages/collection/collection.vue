<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <!-- 头像 -->
    <view class="avatar-wrapper">
      <open-data
        class="avatar"
        type="userAvatarUrl"
      ></open-data>
    </view>
    <!-- 收藏数量 -->
    <view class="collection-number">
      <text>共收藏{{ data.length }}篇</text>
    </view>
    <!-- 收藏列表 -->
    <poem-list
      :list="data"
      hasDelete
      @click-item="handleClickItem"
      @delete-item="handleDeleteItem"
    ></poem-list>
	</view>
</template>

<script>
  import PoemList from '../../components/poem-list/poem-list.vue'
  import { storageKeys } from '../../utils/config.js'
	export default {
    components: {
      PoemList
    },
		data() {
			return {
        data: [],
        bgc: ''
			}
		},
    onLoad() {
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
    onShow() {
      this.handleCollection()
    },
		methods: {
      // 收藏
      handleCollection(action, id) {
        let collection = uni.getStorageSync(storageKeys.collection) || []
        collection = Array.isArray(collection) ? collection : [],
        collection.map(item => {
          item.title = item.mingcheng
          item.author = item.chaodai + '/' + item.zuozhe
          item.summary = item.zhaiyao
        })
        
        this.data = collection
        
        if (action && id) {
          let index = null
          collection.map((item, i) => {
            if (Number(item._id) === Number(id)) {
              index = i
            }
          })
          
          if (index !== null) {
            collection.splice(index, 1)
            try {
              uni.setStorageSync(storageKeys.collection, collection)
              this.data = collection
            } catch (e) {
              console.log(e)
            }
          }
        }
      },
      // 查看详情
      handleClickItem(item) {
        uni.navigateTo({
          url: '../article/article?id=' + item._id
        })
      },
      // 删除收藏
      handleDeleteItem(item) {
        this.handleCollection(true, item._id)
      }
		}
	}
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    .avatar-wrapper {
      margin: 20px auto;
      box-sizing: border-box;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      background-color: $light-bgc;
    }
    .collection-number {
      text-align: center;
      font-size: 18px;
      line-height: 2;
      padding-bottom: 10px;
    }
  }
</style>
