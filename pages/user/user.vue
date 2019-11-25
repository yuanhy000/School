<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="user-avatar-container" style="background: url(../../static/user/user.jpg);">
				<view class="user-avatar-container flex align-center">
					<image class="cu-avatar xl avatar-shadow margin-left-lg margin-right" :src="user.user_avatar" style="border-radius: 20rpx;">
					</image>
					<view class="flex-column justify-around">
						<view class="text-white text-bold text-lg margin-bottom-xs" style="letter-spacing: 2rpx;">{{user.user_name}}</view>
						<view class="text-white text-school margin-bottom-xs"><span class="margin-right-xs">用户ID:</span>{{user.user_number}}</view>
						<view class="flex align-center">
							<text class="text-school cuIcon-locationfill margin-right-xs"></text>
							<view class="text-white text-school">{{user.user_school}}</view>
						</view>
					</view>
					<!-- 					<button @getuserinfo="bindGetUserInfo" class="avatar-button cu-avatar xl avatar-shadow" open-type="getUserInfo"
					 v-else style="background-image:url(./../../static/user/click-me.png);" plain=true>
					</button> -->
				</view>
			</view>
			<view class="user-info-container flex align-center justify-around">
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">关注</view>
					<view class="text-bold text-theme-color">{{user.user_attentions}}</view>
				</view>
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">粉丝</view>

					<view class="text-bold text-theme-color">{{user.user_followers}}</view>
				</view>
				<view class="flex-column align-center">
					<view class="user-info-title-ftext margin-bottom-sm">动态</view>
					<view class="text-bold text-theme-color">{{user.user_article_count}}</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-bottom-xl shadow-lg" style="position: relative; top: -50rpx;">
				<view class="cu-item arrow" @tap="navigateSchool">
					<view>
						<text class="cuIcon-like text-theme-color margin-right"></text>
						<text class="category-title">我喜欢的</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="navigateSchool">
					<view>
						<text class="cuIcon-favor text-theme-color margin-right"></text>
						<text class="category-title">我收藏的</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="navigateSchool">
					<view>
						<text class="cuIcon-read text-theme-color margin-right"></text>
						<text class="category-title">切换学校</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="navigateOrganization">
					<view>
						<text class="cuIcon-friend text-theme-color margin-right"></text>
						<text class="category-title">组织认证</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view>
						<text class="cuIcon-notice text-theme-color margin-right"></text>
						<text class="category-title">消息通知</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view>
						<text class="cuIcon-settings text-theme-color margin-right"></text>
						<text class="category-title">反馈问题</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<notification ref="notification" :isdistance="true" style="z-index: 999;"></notification>
	</view>
</template>

<script>
	import imageButton from '../../components/image-button/image-button.vue'
	import Vue from 'vue'
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				authorized: false,
				userInfo: {},
				modalName: null,
			};
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
				notification: state => state.Notification
			}),
		},
		watch: {
			'$store.state.Notification.notification_content': function() {
				if (this.notification.notification_display) {
					this.$refs.notification.open({
						type: this.notification.notification_type,
						content: this.notification.notification_content,
						timeout: 1500,
						isClick: false
					});
				}
				this.$store.dispatch('initNotification')
			}
		},
		components: {
			imageButton: imageButton
		},
		mounted() {
			setTimeout(() => {
				console.log(this.user)
			}, 200)
		},
		methods: {
			bindGetUserInfo(event) {
				const userInfo = event.detail.userInfo
				if (userInfo) {
					this.userInfo = userInfo;
					this.$store.dispatch('updateUserInfo', userInfo).then(res => {
						this.$store.dispatch('authorized');
					});
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			navigateSchool() {
				uni.navigateTo({
					url: '/pages/choose-index/choose-index'
				})
			},
			navigateOrganization() {
				uni.navigateTo({
					url: '/pages/apply-organization/apply-organization'
				})
			}
		},
	}
</script>

<style src="./user.css">
</style>
