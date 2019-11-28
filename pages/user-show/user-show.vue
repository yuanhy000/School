<template>
	<view id="scroll">
		<scroll-view scroll-y :style="{height:scroll_height +'px'}">
			<view class="user-avatar-container" style="background: url(../../static/user/user.jpg);">
				<view class="user-avatar-container flex align-center">
					<image class="cu-avatar xl avatar-shadow margin-left-lg margin-right" :src="userInfo.user_avatar" style="border-radius: 20rpx;">
					</image>
					<view class="flex-column justify-around">
						<view class="text-white text-bold text-lg margin-bottom-xs" style="letter-spacing: 2rpx;">{{userInfo.user_name}}</view>
						<view class="text-white text-school margin-bottom-xs"><span class="margin-right-xs">用户ID:</span>{{userInfo.user_number}}</view>
						<view class="flex align-center">
							<text class="text-school cuIcon-locationfill margin-right-xs"></text>
							<view class="text-white text-school" v-if="userInfo.user_school != '' && userInfo.user_school!=null">{{userInfo.user_school}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="user-info-container flex align-center justify-around">
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">关注</view>
					<view class="text-bold text-theme-color">{{userInfo.user_attentions}}</view>
				</view>
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">粉丝</view>

					<view class="text-bold text-theme-color">{{userInfo.user_followers}}</view>
				</view>
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">动态</view>
					<view class="text-bold text-theme-color">{{userInfo.user_article_count}}</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-bottom-xl shadow-lg" style="position: relative; top: -50rpx;">
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showToast?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-theme-color"></text>
					</view>
				</view>
				<view class="padding-xl" style="letter-spacing: 2rpx;font-size: 26rpx;">
					{{toastContent}}
				</view>
			</view>
		</view>
		<notification ref="notification" :isdistance="true" style="z-index: 999;"></notification>
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
				user_id: 0,
				userInfo: {},
				showToast: false,
				toastContent: '',
				scroll_height: 700,
			};
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onLoad(options) {
			this.user_id = options.user_id;
			Vue.prototype.$http.request({
				url: '/users/show',
				method: 'POST',
				params: {
					user_id: this.user_id
				},
			}).then(res => {
				this.userInfo = res.data.data;
			})
		},
		mounted() {
			setTimeout(() => {
				this.getHeight();
			}, 200)
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
						query.select('#scroll').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top - 55;
						}).exec();
					}
				});
			},
			hideModal(e) {
				this.showToast = false;
			},
		},
	}
</script>
<style src="./user-show.css">
</style>
