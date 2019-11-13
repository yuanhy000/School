<template>
	<view class="flow-box margin-top-sm margin-bottom margin-left-xs margin-right-xs" v-show="display">
		<view class="commodityItem animation-fade" :class="left[index] == 1 ? 'left' : ''" :style="'top:' + top[index] + 'px;'"
		 :id="'item'+index" v-for="(item, index) in newList" :key="index" :data-index="index" @click="choose(item.commodity_id)"
		 :data-class="'scale-up'">
			<view class="bg-white shadow border-radius margin-bottom">
				<image class="item-picture" mode="widthFix" :src="item.commodity_images[0].image_url" style="width: 100%; display: block;"
				 lazy-load=true></image>
				<view class="flex-direction padding-top-sm padding-left-sm padding-right-sm justify-around commodity-info">
					<text class="text-sm commodity-name-text">{{item.commodity_name}}</text>
					<text class="commodity-description-text">{{item.commodity_description}}</text>
					<view class="flex justify-between align-center">
						<text class="price-text">¥<text style="font-size: 32rpx;margin-left: 4rpx;">{{item.commodity_price}}</text></text>
						<text class="text-xs cuIcon-likefill price-text" v-if="item.commodity_likes!=0"><text class="margin-left-xs">{{item.commodity_likes}}</text></text>
					</view>
				</view>
				<view class="commodity-user-info flex align-center">
					<image class="cu-avatar avatar-shadow" style="border-radius: 10rpx;" :src="item.commodity_user.user_avatar"> </image>
					<text class="commodity-user-name margin-left-sm">{{item.commodity_user.user_name}}</text>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		props: {
			// 数据列表
			list: {
				type: Array,
				default () {
					return []
				}
			},
			// 加载动画
			loading: {
				type: Boolean,
				default: false
			},
			init: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				mark: 0,
				newList: [],
				boxHeight: [],
				top: [],
				left: [],
				loadingTop: 0,
				display: false,
			}
		},
		watch: {
			// 数据
			list: function(newVal, oldVal) {
				this.mark = oldVal.length;
				if (newVal != oldVal) {
					this.newList = this.list;
					// this.display = false;
					this.$nextTick(function() {
						setTimeout(() => {
							this.display = true;
						}, 260)
						setTimeout(() => {
							this.waterFall();
						}, 300)
					})
				}
			},
			init: function(newVal, oldVal) {
				this.mark = 0;
				this.newList = [];
				this.boxHeight = [];
				this.top = [];
				this.left = [];
				this.loadingTop = 0;
				this.display = false;
				setTimeout(() => {
					this.display = true;
				}, 260)
			}
		},
		methods: {
			// 瀑布流定位
			waterFall() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.commodityItem').boundingClientRect(res => {
					// console.log(res)
					let len = this.newList.length;
					let height = 0;
					for (let i = this.mark; i < len; i++) {
						height = res[i].height;
						if (i < 2) {
							this.$set(this.newList[i], 'top', 0);
							this.$set(this.newList[i], 'left', i);
							this.boxHeight.push(height);
							this.top.push(0);
							this.left.push(i);
						} else {
							let minHeight = this.boxHeight[0];
							let index = 0;
							if (minHeight > this.boxHeight[1]) {
								minHeight = this.boxHeight[1];
								index = 1;
							}
							this.boxHeight[index] = minHeight + height + 5;
							this.top.push(minHeight + 5);
							this.left.push(index);
							this.$set(this.newList[i], 'top', minHeight + 5);
							this.$set(this.newList[i], 'left', index);
							this.loadingTop = this.boxHeight[index];
						}
					}
				}).exec();
			},
			// 选中
			choose(commodity_id) {
				this.$emit('click', commodity_id);
			}
		}
	}
</script>

<style scoped>
	.flow-box {
		position: relative;
		color: #1a1a1a;
		padding-bottom: var(--window-bottom);
	}

	.flow-box .commodityItem {
		position: absolute;
		left: 10upx;
		width: calc(50% - 20upx);
		border-radius: 20rpx;
		border: none;
		background-color: transparent;
	}

	.flow-box .left {
		left: 380upx;
	}

	.flow-box .user {
		display: flex;
		width: 220upx;
		overflow: hidden;
		font-size: 26upx;
		color: #666;
	}

	.item-picture {
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		z-index: 500;
	}

	.commodity-name-text {
		font-weight: 700;
		font-size: 28rpx;
		color: #222222;
	}

	.commodity-description-text {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
		font-size: 23rpx;
		width: 100%;
		line-height: 40rpx;
	}

	.like-color {
		color: #DE5145;
	}

	.price-text {
		color: #DE5145;
		font-size: 26rpx;
		font-weight: 700;
	}

	.commodity-info {
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #c8c8c8;
	}

	.commodity-user-info {
		padding: 16rpx;
	}

	.commodity-user-name {
		font-weight: 700;
		color: #222222;
		font-size: 26rpx;
	}
</style>
