<template>
	<view
    class="container"
    :style="{
      backgroundImage: `url(${bgc})`
    }"
  >
    <!-- 搜索 -->
		<view
      class="search-wrapper"
      @tap="goToSearch"
    >
      <input
       class="placeholder"
       placeholder="请输入关键字"
       disabled
      ></input>
      <icon type="search" size="20"></icon>
    </view>
    <!-- banner -->
    <view class="banner-wrapper">
      <swiper
        class="swiper"
        autoplay
        indicator-dots="true"
        :interval="interval"
        :duration="duration"
        @tap="goToType"
      >
        <swiper-item
          v-for="item in imgs"
          :key="item.tag"
        >
          <image
            class="swiper-img"
            :data-tag="item.tag"
            :src="item.url"
          ></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 首页诗词列表 -->
    <scroll-view
      class="scroll-view"
      scroll-top="0"
    >
      <poem-list
        :list="data"
        @click-item="handleClickPoem"
      ></poem-list>
      <uni-load-more
        v-if="loading"
        status="loading"
      ></uni-load-more>
      <empty v-if="noData"></empty>
    </scroll-view>
	</view>
</template>

<script>
  import Empty from '../../components/empty/empty.vue'
  import PoemList from '../../components/poem-list/poem-list.vue'
  import { poemListRandom } from '../../service/api.js'
  const imgPrefix = getApp().globalData.imgPrefix
	export default {
    components: {
      Empty,
      PoemList
    },
		data() {
			return {
				interval: 2000,
        duration: 500,
        imgs: [
          {
            url: imgPrefix + '/fenlei/0春天.jpg',
            tag: '春天'
          },
          {
            url: imgPrefix + '/fenlei/0七夕.jpg',
            tag: '七夕'
          },
          {
            url: imgPrefix + '/fenlei/0荷花.jpg',
            tag: '荷花'
          }
        ],
        data: [],
        loading: false,
        noData: false,
        bgc: ''
			}
		},
		methods: {
			// 到搜索页
      goToSearch() {
        uni.navigateTo({
          url: '../search/search'
        })
      },
      // 获取随机诗词列表
      poemList() {
        this.loading = true
        poemListRandom()
          .then(data => {
            this.data = data.data.map(item => {
              item.title = item.mingcheng
              item.author = item.chaodai + '/' + item.zuozhe
              item.summary = item.zhaiyao
              return item
            })
          })
          .catch(e => {
            console.log(e)
          })
          .finally(e => {
            this.loading = false
            // 防止返回数据太快，看不到效果
            setTimeout(() => {
              uni.stopPullDownRefresh();
            }, 500)
            if (this.data.length === 0) {
              this.noData = true
            }
          })
      },
      // 进入诗词详情
      handleClickPoem(item) {
        uni.navigateTo({
          url: '../article/article?id=' + item._id
        })
      },
      // 跳转分类
      goToType(e) {
        uni.navigateTo({
          url: `../typePoem/typePoem?tag=${encodeURIComponent(e.target.dataset.tag)}&type=fenlei`
        })
      }
		},
    onLoad() {
      this.poemList()
      const bgc = getApp().globalData.bgc
      this.bgc = bgc[Math.floor(bgc.length * Math.random())]
    },
    onPullDownRefresh() {
      this.poemList()
    }
	}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    .search-wrapper {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      padding: 0 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: $light-bgc;
      .placeholder {
        flex: 1;
      }
    }
    .scroll-view {
      width: 100%;
    }
    .banner-wrapper {
      width: 100%;
      box-sizing: border-box;
      .swiper {
        width: 100%;
        height: 300rpx;
        background-color: $light-bgc;
        .swiper-img {
          width: 100%;
          height: 300rpx;
        }
      }
    }
  }
</style>
