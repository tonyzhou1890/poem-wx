<template>
	<view
    class="container"
    :style="{
      color,
      fontSize: fontSize + 'px'
    }"
  >
		<text>{{ text }}</text>
	</view>
</template>

<script>
	export default {
    name: 'empty',
    props: {
      text: {
        type: String,
        default: '暂无数据'
      },
      color: {
        type: String,
        default: '#333'
      },
      fontSize: {
        type: [String, Number],
        default: 14
      }
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.container {
  width: 100%;
  text-align: center;
}
</style>
