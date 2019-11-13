<template>
	<view class="commodity-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Commodity</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 @click=cancelInput>
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in commodityInfo.commodity_images" :key="index" @click="viewImage" :data-url="commodityInfo.commodity_images[index].image_url">
					<image :src="item.image_url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white">
				<image class="cu-avatar lg avatar-shadow margin-right" style="border-radius: 20rpx;" :src="commodityInfo.commodity_user.user_avatar">
				</image>
				<view class="flex-column ">
					<text class="view-user-name">{{commodityInfo.commodity_user.user_name}}</text>
					<text class="view-user-location">发布于{{displayLocation}}</text>
				</view>
			</view>
			<view class="padding-top padding-bottom-sm padding-left padding-right flex align-center bg-white">
				<view class="flex-column ">
					<text class="price-text margin-bottom-sm">¥<text style="font-size: 42rpx;margin-left: 6rpx;">{{commodityInfo.commodity_price}}</text></text>
					<text class="commodity-name margin-bottom-sm">{{commodityInfo.commodity_name}}</text>
					<text class="commodity-description">{{commodityInfo.commodity_description}}</text>
				</view>
			</view>
			<view class="commodity-image-container flex-column align-center bg-white info-border-bottom padding-left padding-right padding-bottom-sm">
				<block v-for="(item,index) in commodityInfo.commodity_images" :key="index" @click="viewImage" :data-url="commodityInfo.commodity_images[index].image_url">
					<image :src="item.image_url" class="commodity-image margin-bottom-sm" mode="widthFix"></image>
				</block>
			</view>
			<view class="padding-top padding-bottom-sm padding-left-sm padding-right flex align-center bg-white margin-top">
				<text>评论列表</text>
			</view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade" v-show="display">
			<view class="flex">
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon"></text>
					<text class="text-xs text-theme-color">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="beginInput">
					<text class="cuIcon-messagefill text-theme-color commodity-icon"></text>
					<text class="text-xs text-theme-color">留言</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput">
					<text class="cuIcon-favorfill text-theme-color commodity-icon"></text>
					<text class="text-xs text-theme-color">收藏</text>
				</view>
			</view>
			<view class="search-form round" v-if="isInput">
				<text class="cuIcon-comment"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="看对眼就留言,问问更多细节～"
				 v-model="inputComment" confirm-type="search"></input>
			</view>
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm" v-if="!isInput">我想要</button>
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm" v-else @click="submitComment">留言</button>
		</view>
		<notification ref="notification" :isdistance="true"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	let qqmapsdk = new QQMapWX({
		key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
	});
	export default {
		data() {
			return {
				display: false,
				commodity_id: 0,
				scroll_height: 700,
				commodityInfo: [],
				imageList: [],
				displayLocation: '',
				isInput: false,
				inputComment: ''
			}
		},
		onLoad(option) {
			this.commodity_id = option.commodity_id;
			let that = this;
			Vue.prototype.$http.request({
				url: '/commodities/detail',
				method: 'POST',
				params: {
					commodity_id: this.commodity_id
				},
			}).then(res => {
				this.commodityInfo = res.data.data;
				for (let item in this.commodityInfo.commodity_images) {
					this.imageList.push(this.commodityInfo.commodity_images[item].image_url);
				}
				let location = this.commodityInfo.commodity_location.split(',')
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: location[0],
						longitude: location[1]
					},
					success(res) {
						that.displayLocation = res.result.address_component.city + res.result.address_component.district;
					}
				})
			});
		},
		mounted() {
			setTimeout(() => {
				this.display = true;
			}, 100)
			setTimeout(() => {
				this.getHeight();
			}, 200);
		},
		methods: {
			submitComment() {
				if (this.inputComment == '') {
					this.$refs.notification.open({
						type: 'warn',
						content: '留言不能为空～',
						timeout: 2000,
						isClick: true
					});
				}
			},
			beginInput() {
				this.isInput = true;
			},
			cancelInput() {
				this.isInput = false;
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
			},
			getHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight;
						that.screen_width = res.windowWidth;
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that);
						query.select('#scroll').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top - 55;
						}).exec();
					}
				});
			},
		}
	}
</script>

<style src="./commodity.css">
</style>
