<script>
  import { IMG_BASE_URL } from './utils/config.js'
export default {
  globalData: {
    imgPrefix: IMG_BASE_URL,
    bgc: [
      IMG_BASE_URL + '/bgc/slice_0_0.jpg',
      IMG_BASE_URL + '/bgc/slice_0_1.jpg',
      IMG_BASE_URL + '/bgc/slice_0_2.jpg',
      IMG_BASE_URL + '/bgc/slice_1_0.jpg',
      IMG_BASE_URL + '/bgc/slice_1_1.jpg'
    ]
  },
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page {
  width: 100%;
  height: 100%;
}
</style>
