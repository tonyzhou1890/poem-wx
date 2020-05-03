<template>
	<view class="container">
		<view
      class="list-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="handleTap(item)"
    >
      <text v-if="!hasDelete" class="title">{{ item.title }}</text>
      <view v-else class="title delete">
        <text>{{ item.title }}</text>
        <image
          class="delete-img"
          src="../../static/images/deleteIcon.png"
          @click.stop="handleDelete(item)"
        ></image>
      </view>
      <text class="author">{{ item.author }}</text>
      <text class="summary">{{ item.summary }}</text>
    </view>
	</view>
</template>

<script>
	export default {
    name: 'poem-list',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      hasDelete:{
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      handleTap(item) {
        this.$emit('click-item', item)
      },
      handleDelete(item) {
        this.$emit('delete-item', item)
      }
    }
	}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .list-item {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 1px solid $light-bgc;
    text-align: center;
    &:last-child {
      border-bottom: none;
    }
    text {
      display: block;
      line-height: 2.3;
      &.title {
        font-size: 16px;
        color: $main-text-color;
      }
      &.author {
        font-size: 14px;
        color: $main-color;
      }
      &.summary {
        font-size: 14px;
        white-space: nowrap;
        color: $third-text-color;
      }
    }
    .delete {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      padding: 0 20px;
      .delete-img {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 8px;
      }
    }
  }
}
</style>
