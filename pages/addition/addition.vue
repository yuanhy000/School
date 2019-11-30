<template>
	<view class="addition-container ">
		<loading v-if="loading" style="position: relative; top: 400rpx;"></loading>
		<swiper id="swiper" class="card-swiper square-dot animation-fade" :indicator-dots="true" :circular="true" interval="5000"
		 v-else duration="400" indicator-color="#8799a3" indicator-active-color="#416276" :style="{height:swiper_height +'px!important'}">
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-article.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect"
				 :data-id="0"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-activity.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect"
				 :data-id="1"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-topic.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect"
				 :data-id="2"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-recruit.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect"
				 :data-id="3"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-commodity.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect"
				 :data-id="4"></image>
			</swiper-item>
		</swiper>
		<view class="cu-modal" :class="showToast?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发布提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-theme-color"></text>
					</view>
				</view>
				<view class="padding-xl" style="letter-spacing: 2rpx;font-size: 26rpx;">
					{{toastContent}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				selectIndex: 0,
				swiper_height: 650,
				showToast: false,
				toastContent: '',
				loading: false,
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		mounted() {
			this.getHeight();
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 300)
		},
		methods: {
			getHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight;
						that.screen_width = res.windowWidth;
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that);
						query.select('#swiper').boundingClientRect(res => {
							that.swiper_height = that.screen_height - res.top - 80;
						}).exec();
					}
				});
			},
			hideModal(e) {
				this.showToast = false;
			},
			buttonSelect(e) {
				this.selectIndex = e.currentTarget.dataset.id;
				if (this.user.authentication == '' || this.user.authentication == null) {
					this.toastContent = '先去认证身份，再进行发布操作～～'
					this.showToast = true;
					return;
				}
				switch (this.selectIndex) {
					case 0:
						uni.navigateTo({
							url: '/pages/addition-article/addition-article'
						});
						break;
					case 1:
						if (this.user.user_organization == '' || this.user.user_organization == null || this.user.user_organization == undefined) {
							this.toastContent = '只有学生组织才能发布活动，快去认证吧～～'
							this.showToast = true;
							return;
						}
						uni.navigateTo({
							url: '/pages/addition-activity/addition-activity'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/addition-topic/addition-topic'
						});
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/addition-recruit/addition-recruit'
						});
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/addition-commodity/addition-commodity'
						});
						break;
				}
			}
		}
	}
</script>

<style src="./addition.css">
</style>
