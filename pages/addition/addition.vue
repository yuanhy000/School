<template>
	<view class="addition-container ">
		<swiper id="swiper" class="card-swiper square-dot animation-fade" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="400" indicator-color="#8799a3" indicator-active-color="#416276" :style="{height:swiper_height +'px!important'}">
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-article.jpg" class="swiper-image bg-white shadow" mode="aspectFill" @tap="buttonSelect" :data-id="0"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-activity.jpg" class="swiper-image bg-white shadow" mode="aspectFill"  @tap="buttonSelect" :data-id="1"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-commodity.jpg" class="swiper-image bg-white shadow" mode="aspectFill"  @tap="buttonSelect" :data-id="2"></image>
			</swiper-item>
			<swiper-item :class="cardCur==index?'cur':''">
				<image src="../../static/add/addition-recruit.jpg" class="swiper-image bg-white shadow" mode="aspectFill"  @tap="buttonSelect" :data-id="3"></image>
			</swiper-item>
		</swiper>
		<view class="cu-modal" :class="showToast?'show':''">
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
				swiper_height: 700,
				buttonList: ['发布动态', '发布活动', '发布招募', '发布交易'],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				showToast: false,
				toastContent: ''
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		mounted() {
			// setTimeout(() => {
				this.getHeight();
			// }, 100)
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
				switch (this.selectIndex) {
					case 0:
						uni.navigateTo({
							url: '/pages/addition-article/addition-article'
						});
						break;
					case 1:
						if (this.user.user_organization == '') {
							this.toastContent = '只有学生组织才可发布活动，快去认证吧'
							this.showToast = true;
							return;
						}
						uni.navigateTo({
							url: '/pages/addition-activity/addition-activity'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/addition-recruit/addition-recruit'
						});
						break;
					case 3:
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
