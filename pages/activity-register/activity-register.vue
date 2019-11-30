<template>
	<view class="addition-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">活动报名</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="margin-left user-info-title text-theme-color margin-bottom">队伍名称：</view>
				<view class="cu-tabbar-height bg-white margin-left margin-right  border-radius bg-white shadow flex align-center margin-bottom-xl">
					<input class="margin-left margin-right text-sm max-width" type="text" placeholder="快填一个队伍名称吧～" v-model="teamName" />
				</view>
				<view class="margin-left user-info-title text-theme-color margin-top-xl">队伍成员：</view>
				<view class="cu-list menu card-menu margin-top margin-bottom-xl shadow bg-white">
					<view class="cu-item">
						<view class="flex max-width align-center">
							<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="user.user_avatar">
							</image>
							<view class="margin-right user-info-font text-bold text-black">
								{{user.user_name}}
							</view>
							<view class="margin-right user-info-font">
								用户ID: {{user.user_number}}
							</view>
						</view>
					</view>
					<block v-for="(item,index) in otherUser" v-bind:key="index">
						<view class="cu-item animation-fade">
							<view class="flex max-width align-center">
								<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="user.user_avatar">
								</image>
								<view class="margin-right user-info-font text-bold text-black">
									{{item.user_name}}
								</view>
								<view class="margin-right user-info-font">
									用户ID: {{item.user_number}}
								</view>
							</view>
						</view>
					</block>
					<view class="cu-item" @click="addNewUser">
						<text class="user-info-font text-theme-color text-bold">添加新成员</text>
						<image src="../../static/add/add-one.png" class="icon-image"></image>
					</view>
				</view>
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="submit" data-target="viewModal">
					确认报名
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showInput?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content user-info-title text-theme-color letter-spacing">添加新成员</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-theme-color"></text>
					</view>
				</view>
				<view class="padding-xl bg-white padding-top" style="letter-spacing: 2rpx;font-size: 26rpx;">
					<input class="margin-left margin-right text-sm add-one-input" type="text" placeholder="输入成员 ID" v-model="userNumber"
					 @input="searchTips" />
				</view>
				<view class="padding-left padding-bottom max-width animation-fade" style="height: 120rpx; background: #EEEEEE;"
				 v-if="showSearchUser" @click="pushNewUser">
					<view class="flex max-width align-center" style="height: 120rpx;">
						<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="searchUser.user_avatar">
						</image>
						<view class="margin-right user-info-font text-bold text-black">
							{{searchUser.user_name}}
						</view>
						<view class="margin-right user-info-font">
							用户ID: {{searchUser.user_number}}
						</view>
					</view>
				</view>
				<view class="flex align-center justify-center bg-white padding-bottom-xl user-info-font letter-spacing animation-fade"
				 v-if="showSearchError">
					没有找到相关成员
				</view>
			</view>
		</view>
		<notification ref="notification" :isdistance="true" style="z-index: 9999;"></notification>
		<view class="cu-modal" :class="showToast?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">报名提示</view>
					<view class="action" @tap="hideToast">
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
	import Vue from 'vue';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				activity_id: 0,
				scroll_height: 700,
				teamName: '',
				userNumber: '',
				showInput: false,
				inputTimeStamp: 0,
				showSearchUser: false,
				showSearchError: false,
				showToast: false,
				searchUser: {},
				otherUser: [],
				toastContent: ''
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onShareAppMessage(res) {
			return {
				title: '我正在线上报名活动，快来围观～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		onLoad(option) {
			this.activity_id = option.activity_id;
		},
		methods: {
			submit() {
				if (this.teamName == '') {
					this.toastContent = '队伍名称不能为空'
					this.showToast = true;
					return;
				}
				let teamUser = [];
				teamUser.push(this.user.user_id);
				if (this.otherUser.length != 0) {
					for (let item in this.otherUser) {
						teamUser.push(this.otherUser[item].user_id);
					}
				}
				Vue.prototype.$http.request({
					url: '/activities/team/create',
					method: 'POST',
					params: {
						activity_id: this.activity_id,
						team_name: this.teamName,
						team_user: teamUser,
					}
				}).then(res => {
					this.$refs.notification.open({
						type: 'success',
						content: '报名成功',
						timeout: 1500,
						isClick: false
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1500)
				})
			},
			pushNewUser() {
				if (this.user.user_id == this.searchUser.user_id) {
					this.$refs.notification.open({
						type: 'err',
						content: '该成员已加入队伍',
						timeout: 1500,
						isClick: false
					});
					return;
				}
				for (let index in this.otherUser) {
					if (this.otherUser[index].user_id == this.searchUser.user_id) {
						this.$refs.notification.open({
							type: 'err',
							content: '该成员已加入队伍',
							timeout: 1500,
							isClick: false
						});
						return;
					}
				}
				this.otherUser.push(this.searchUser);
				this.showInput = false;
				this.showSearchUser = false;
				this.userNumber = '';
				setTimeout(() => {
					this.searchUser = {};
				}, 1000)
			},
			addNewUser() {
				this.showInput = true;
			},
			hideModal() {
				this.showInput = false;
			},
			hideToast() {
				this.showToast = false;
			},
			searchTips(event) {
				this.showSearchError = false;
				this.showSearchUser = false;
				this.inputTimeStamp = event.timeStamp;
				setTimeout(() => {
					//1s后比较二者是否还相同（因为只要还有事件触发，inputTimeStamp就会被改写，不再是当前事件函数的时间戳）
					if (this.inputTimeStamp == event.timeStamp) {
						this.getUser();
					}
				}, 600);
			},
			getUser() {
				Vue.prototype.$http.request({
					url: '/users/search/number',
					method: 'POST',
					params: {
						user_number: this.userNumber
					},
				}).then(res => {
					this.searchUser = res.data.data;
					this.showSearchUser = true;
				}).catch(error => {
					this.showSearchError = true;
					console.log(error);
				})
			}
		}
	}
</script>

<style src="./activity-register.css">
</style>
