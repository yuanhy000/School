<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">用户主页</block>
		</cu-custom>
		<scroll-view scroll-y :style="{height:scroll_height +'px'}" id="scroll">
			<view class="user-avatar-container" style="background: url(../../static/user/user.jpg);">
				<view class="user-item-container flex align-center animation-fade" v-if="!loading">
					<image class="cu-avatar xl avatar-shadow margin-left-lg margin-right" :src="userInfo.user_avatar" style="border-radius: 20rpx;">
					</image>
					<view class="flex-column justify-around">
						<view class="text-white text-bold text-lg margin-bottom-xs" style="letter-spacing: 2rpx;">{{userInfo.user_name}}</view>
						<view class="text-white text-school margin-bottom-xs"><span class="margin-right-xs">用户ID:</span>{{userInfo.user_number}}</view>
						<view class="flex align-center">
							<text class="text-school cuIcon-locationfill margin-right-xs"></text>
							<view class="text-white text-school" v-if="userInfo.user_school == '' || userInfo.user_school==null">该用户没有选择学校</view>
							<view class="text-white text-school" v-else>{{userInfo.user_school}}</view>
						</view>
					</view>
					<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 50rpx; background-color: #BBBBBB;"
					 v-if="!userInfo.user_follow" @click="tooglrUserFollow">关注</button>
					<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 50rpx; background-color: #BBBBBB;"
					 v-else @click="tooglrUserFollow">已关注</button>
				</view>
			</view>
			<view class="user-info-container flex align-center justify-around animation-fade" v-if="!loading">
				<view class="flex-column align-center" @click.stop="navigateUserfollowers(1)">
					<view class="user-info-title-ftext margin-bottom-sm">关注</view>
					<view class="text-bold text-theme-color">{{userInfo.user_attentions}}</view>
				</view>
				<view class="flex-column align-center" @click.stop="navigateUserfollowers(0)">
					<view class="user-info-title-ftext margin-bottom-sm">粉丝</view>

					<view class="text-bold text-theme-color">{{userInfo.user_followers}}</view>
				</view>
				<view class="flex-column align-center" @click.stop="navigateUserInformation(0)">
					<view class="user-info-title-ftext margin-bottom-sm">动态</view>
					<view class="text-bold text-theme-color">{{userInfo.user_article_count}}</view>
				</view>
			</view>
			<loading v-if="loading" class="animation-fade" style="position: relative; top: 100rpx;"></loading>
			<view class="cu-list menu sm-border card-menu margin-bottom-xl shadow-lg animation-fade" style="position: relative; top: -50rpx;"
			 v-else>
				<view class="cu-item shadow bg-white margin-bottom-xl margin-left-xs margin-right-xs show-radius flex-column"
				 @click.stop="navigateUserInformation(0)">
					<view class="flex align-center justify-between max-width padding-top">
						<view class="text-bold text-theme-color">最近动态</view>
						<view class="text-sm text-theme-color">更多<text class="cuIcon-right margin-left-xs" style="font-size: 400;"></text></view>
					</view>
					<view class="max-width text-sm margin-top-xs margin-bottom margin-top activity_content" v-if="userInfo.user_articles.length==0">没有发布任何动态</view>
					<view class="max-width" v-else>
						<view class="text-content padding-right margin-bottom-xs text-bold text-black margin-top-sm  max-width" v-if="userInfo.user_articles[0].article_title">
							{{userInfo.user_articles[0].article_title}}
						</view>
						<view class="text-content text-sm margin-top-xs  padding-right-sm margin-bottom activity_content max-width">
							<text decode="true">{{userInfo.user_articles[0].article_content}}</text>
						</view>
						<view class="grid flex-sub col-3 grid-square margin-bottom-xs max-width">
							<block v-for="(imgItem,index) in userInfo.user_articles[0].article_images" :key="index">
								<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage" :data-url="imgItem.image_url"
								 v-if="index<3">
								</view>
							</block>
						</view>
					</view>
				</view>
				<view class="cu-item shadow bg-white margin-bottom-xl margin-left-xs margin-right-xs show-radius flex-column"
				 @click.stop="navigateUserInformation(1)">
					<view class="flex align-center justify-between max-width padding-top">
						<view class="text-bold text-theme-color">最近活动</view>
						<view class="text-sm text-theme-color">更多<text class="cuIcon-right margin-left-xs" style="font-size: 400;"></text></view>
					</view>
					<view class=" max-width text-sm margin-top-xs margin-bottom margin-top activity_content" v-if="userInfo.user_activities.length==0">没有发布任何活动</view>
					<view class="max-width" v-else>
						<view class="text-content padding-right margin-bottom-xs text-bold text-black margin-top-sm  max-width" v-if="userInfo.user_activities[0].activity_name">
							#{{userInfo.user_activities[0].activity_name}}#
						</view>
						<view class="text-content text-sm margin-top-xs padding-right-sm margin-bottom activity_content max-width">
							<text decode="true">{{userInfo.user_activities[0].activity_content}}</text>
						</view>
						<view class="grid flex-sub col-3 grid-square margin-bottom-xs max-width">
							<block v-for="(imgItem,index) in userInfo.user_activities[0].activity_images" :key="index">
								<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage" :data-url="imgItem.image_url"
								 v-if="index<3">
								</view>
							</block>
						</view>
					</view>
				</view>
				<view class="cu-item shadow bg-white margin-bottom-xl margin-left-xs margin-right-xs show-radius flex-column"
				 @click.stop="navigateUserInformation(2)">
					<view class="flex align-center justify-between max-width padding-top">
						<view class="text-bold text-theme-color">最近招募</view>
						<view class="text-sm text-theme-color">更多<text class="cuIcon-right margin-left-xs" style="font-size: 400;"></text></view>
					</view>
					<view class=" max-width text-sm margin-top-xs margin-bottom margin-top activity_content" v-if="userInfo.user_recruits.length==0">没有发布任何招募</view>
					<view class="max-width" v-else>
						<view class="text-content padding-right margin-bottom-xs text-bold text-black margin-top-sm  max-width" v-if="userInfo.user_recruits[0].recruit_title">
							{{userInfo.user_recruits[0].recruit_title}}
						</view>
						<view class="text-content text-sm margin-top-xs  padding-right-sm margin-bottom activity_content max-width">
							<text decode="true">{{userInfo.user_recruits[0].recruit_content}}</text>
						</view>
						<view class="grid flex-sub col-3 grid-square margin-bottom-xs max-width">
							<block v-for="(imgItem,index) in userInfo.user_recruits[0].recruit_images" :key="index">
								<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage" :data-url="imgItem.image_url"
								 v-if="index<3">
								</view>
							</block>
						</view>
					</view>
				</view>
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
				loading: false
			};
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onShareAppMessage(res) {
			return {
				title: '快来围观微校～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		onLoad(options) {
			this.user_id = options.user_id;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/users/show',
				method: 'POST',
				params: {
					user_id: this.user_id
				},
			}).then(res => {
				this.userInfo = res.data.data;
				if (this.userInfo.user_articles.length != 0) {
					this.userInfo.user_articles[0].article_content = this.userInfo.user_articles[0].article_content.replace(
						/<br\/\>/g, "\n");
				}
				if (this.userInfo.user_activities.length != 0) {
					this.userInfo.user_activities[0].activity_content = this.userInfo.user_activities[0].activity_content.replace(
						/<br\/\>/g, "\n");
				}
				if (this.userInfo.user_recruits.length != 0) {
					this.userInfo.user_recruits[0].recruit_content = this.userInfo.user_recruits[0].recruit_content.replace(
						/<br\/\>/g, "\n");
				}
				setTimeout(() => {
					this.loading = false;
				}, 100)
			})
		},
		mounted() {
			setTimeout(() => {
				this.getHeight();
			}, 200)
		},
		methods: {
			navigateUserInformation(index) {
				uni.navigateTo({
					url: '/pages/user-information/user-information?user_id=' + this.user_id + '&current_tab=' + index
				})
			},
			tooglrUserFollow() {
				Vue.prototype.$http.request({
					url: '/users/follow',
					method: 'POST',
					params: {
						accept_id: this.user_id,
					},
				}).then(res => {
					this.userInfo.user_follow = !this.userInfo.user_follow;
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
			hideModal(e) {
				this.showToast = false;
			},
			navigateUserfollowers(index) {
				uni.navigateTo({
					url: '/pages/user-follower/user-follower?user_id=' + this.user.user_id + '&type=' +
						index
				})
			}
		},
	}
</script>
<style src="./user-show.css">
</style>
