<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">{{customTitle}}</block>
		</cu-custom>
		<scroll-view scroll-y :style="{height:scroll_height +'px'}">
			<view id="scroll">
				<loading v-if="loading" class="animation-fade" style="position: relative; top: 450rpx;"></loading>
				<view class="cu-list menu-avatar animation-fade" v-else>
					<image src="../../static/commodity/search-none.png" class="max-width" mode="widthFix" v-if="followerInfo.length==0"></image>
					<view class="cu-item animation-fade" v-for="(item,index) in followerInfo" :key="index" @click="navigateUserShow(item.user_id)">
						<view class="cu-avatar round image-size" :style="[{backgroundImage:'url('+item.user_avatar+')'}]"></view>
						<view class="content">
							<view class="notice-title">{{item.user_name}}</view>
							<view class="text-gray text-sm notice-content">
								<text class="padding-right-sm">ID: {{item.user_number}}</text>
								<text v-if="item.user_school">{{item.user_school}}</text>
							</view>
						</view>
						<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 30rpx;"
						 v-if="!item.user_follow" @click.stop="tooglrUserFollow(item.user_id,index)">关注</button>
						<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 30rpx; background-color: #BBBBBB;"
						 v-else @click.stop="tooglrUserFollow(item.user_id,index)">已关注</button>
					</view>
				</view>
			</view>
		</scroll-view>
		<notification ref="notification" :isdistance="true" style="z-index: 999;"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				user_id: 0,
				followerInfo: [],
				scroll_height: 700,
				loading: false,
				modalName: '',
				links: {},
				type: 0,
			}
		},
		computed: {
			customTitle: function() {
				if (this.type == 1) {
					return '用户关注'
				} else {
					return '用户粉丝'
				}
			}
		},
		onLoad(option) {
			this.user_id = option.user_id;
			this.type = option.type;
			this.loading = true;
			if (this.type == 1) {
				Vue.prototype.$http.request({
					url: '/users/attention',
					method: 'POST',
					params: {
						user_id: this.user_id,
					},
				}).then(res => {
					this.followerInfo = res.data.data;
					this.loading = false;
				})
			} else {
				Vue.prototype.$http.request({
					url: '/users/follower',
					method: 'POST',
					params: {
						user_id: this.user_id,
					},
				}).then(res => {
					this.followerInfo = res.data.data;
					this.loading = false;
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '快来围观微校～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			tooglrUserFollow(user_id, index) {
				Vue.prototype.$http.request({
					url: '/users/follow',
					method: 'POST',
					params: {
						accept_id: user_id,
					},
				}).then(res => {
					this.followerInfo[index].user_follow = !this.followerInfo[index].user_follow;
					if (this.followerInfo[index].user_follow) {
						this.$store.dispatch('attentionIncrement');
					} else {
						this.$store.dispatch('attentionDecrement');
					}
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
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
							that.scroll_height = that.screen_height - res.top;
						}).exec();
					}
				});
			},
			navigateUserShow(user_id) {
				uni.navigateTo({
					url: '/pages/user-show/user-show?user_id=' + user_id
				})
			}
		}
	}
</script>

<style src="./user-follower.css">
</style>
