<template>
	<view class="container">
		<image
      class="background"
      src="../../static/images/welcomeBg.png"
    />
    <view class="index-wrapper">
      <!-- 标题 -->
      <view class="title">
        <text class="title-text">品词轩</text>
        <text class="title-sub-text">在古典中寻找一方宁静</text>
      </view>
      <!-- 按钮 -->
      <view class="button-wrapper">
        <button
          type="default"
          @tap="startApp"
        >开启旅程</button>
      </view>
      <!-- 底部说明链接 -->
      <view class="text-link-wrapper">
        <text
          class="text-link"
          @tap="show"
        >《应用说明》</text>
      </view>
      <!-- 应用说明 -->
      <view
        class="pop-view"
        v-if="showDocument"
      >
        <image
          class="close-icon"
          src="../../static/svgs/close.svg"
          @tap="close"
        ></image>
        <rich-text
          class="document"
          :nodes="document"
        ></rich-text>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
        showDocument: false,
        document: `<section style="color: #333; background-color: white; width: 100%; height: 100%;">
          <h1 style="text-align: center; font-size: 20px">《应用说明》</h1>
          <ul>
            <li>本应用免费使用。</li>
            <li>应用中收藏的诗词记录只会存储在本地，不会上传服务器。</li>
          </ul>
        </section>`
			}
		},
		methods: {
      // 进入 app
      startApp() {
        console.log('tab')
        uni.switchTab({
          url: '../home/home',
          fail(e) {
            console.log(e)
          }
        })
      },
      // 打开应用说明弹窗
      show() {
        this.showDocument = true
      },
      // 关闭应用说明弹窗
      close() {
        this.showDocument = false
      }
		}
	}
</script>

<style lang="scss">
  @mixin full {
    width: 100%;
    height: 100%;
  }
  page {
    background-color: $main-color;
    @include full;
  }
	.container {
    @include full;
    position: relative;
    .background {
      width: 100%;
      height: 750rpx;
    }
    .index-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      @include full;
      .title {
        position: absolute;
        top: 200rpx;
        width: 100%;
        text-align: center;
        color: white;
        display: flex;
        flex-direction: column;
        .title-text {
          font-size: 28px;
          font-weight: bold;
          line-height: 2.5;
          letter-spacing: 4px;
        }
        .title-sub-text {
          font-size: 14px;
          letter-spacing: 2px;
        }
      }
      .button-wrapper {
        position: absolute;
        bottom: 400rpx;
        width: 100%;
        button {
          width: 78px;
          height: 30px;
          line-height: 26px;
          font-size: 14px;
          background-color: #45aeb6;
          color: white;
          padding: 0;
          border: 2px solid gray;
          border-radius: 10px;
        }
      }
      .text-link-wrapper {
        position: absolute;
        width: 100%;
        bottom: 20px;
        color: white;
        text-align: center;
        font-size: 14px;
      }
      .pop-view {
        position: absolute;
        z-index: 2;
        @include full;
        background-color: white;
        padding: 20px;
        box-sizing: border-box;
        .close-icon {
          position: absolute;
          margin: 0 auto;
          bottom: 20px;
          left: 50%;
          transform: translateX(-20px);
          width: 40px;
          height: 40px;
        }
        .document {
          @include full;
        }
      }
    }
	}
</style>
