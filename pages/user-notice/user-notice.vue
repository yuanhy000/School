<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">消息提示</block>
		</cu-custom>
		<scroll-view scroll-y :style="{height:scroll_height +'px'}" @scrolltolower="loadNextPage">
			<view class="cu-list menu-avatar" id="scroll">
				<image src="../../static/commodity/search-none.png" class="max-width" mode="widthFix" v-if="noticeInfo.length==0"></image>
				<view class="cu-item animation-fade" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in noticeInfo"
				 :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
				 @click="navigateTarget(index)">
					<view class="cu-avatar round image-size" :style="[{backgroundImage:'url('+item.request_user.user_avatar+')'}]"></view>
					<view class="content">
						<view class="notice-title" v-if="item.notification_type=='commodity_comment'">商品留言</view>
						<view class="notice-title" v-if="item.notification_type=='article_comment'">动态评论</view>
						<view class="notice-title" v-if="item.notification_type=='activity_comment'">活动评论</view>
						<view class="notice-title" v-if="item.notification_type=='activity_team'">活动报名</view>
						<view class="notice-title" v-if="item.notification_type=='recruit_comment'">招募评论</view>
						<view class="text-gray text-sm notice-content">
							{{item.notification_content}}</view>
					</view>
					<view class="action margin-right-xs">
						<view class="text-grey text-xs " style="line-height: 36rpx;">{{item.display_time}}</view>
					</view>
					<view class="move" @tap.stop="deleteNotice(item.notification_id,index)">
						<view class="bg-red" style="letter-spacing: 4rpx;">删除</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="animation-fade"></loading>
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
				noticeInfo: [],
				scroll_height: 700,
				loading: false,
				modalName: '',
				links: {}
			}
		},
		onLoad(option) {
			this.user_id = option.user_id;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/users/notification',
				method: 'POST',
				params: {
					user_id: this.user_id,
				},
			}).then(res => {
				this.noticeInfo = res.data.data;
				this.links = res.data.links;
				for (let index in this.noticeInfo) {
					this.formatNotificationTime(index);
				}
				this.loading = false;
				this.$store.dispatch('clearNoticeCount');
			})
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			loadNextPage() {
				if (!this.links.next) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: this.links.next,
					method: 'POST',
					params: {
						user_id: this.user_id,
					},
				}).then(res => {
					this.links = res.data.links;
					this.noticeInfo.push.apply(this.noticeInfo, res.data.data);
					for (let index in this.noticeInfo) {
						this.formatNotificationTime(index);
					}
					this.loading = false;
				})
			},
			deleteNotice(notice_id, index) {
				Vue.prototype.$http.request({
					url: '/notifications/delete',
					method: 'POST',
					params: {
						notification_id: notice_id
					},
				}).then(res => {
					this.noticeInfo.splice(index, 1);
					this.$refs.notification.open({
						type: 'success',
						content: '删除成功',
						timeout: 1500,
						isClick: false
					});
				}).catch(error => {
					this.$refs.notification.open({
						type: 'warn',
						content: '删除失败',
						timeout: 1500,
						isClick: false
					});
				});
			},
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			navigateTarget(index) {
				switch (this.noticeInfo[index].notification_type) {
					case 'commodity_comment':
						uni.navigateTo({
							url: '/pages/commodity/commodity?commodity_id=' + this.noticeInfo[index].notification_target_id + '&comment=1'
						})
						break;
					case 'article_comment':
						uni.navigateTo({
							url: '/pages/article/article?article_id=' + this.noticeInfo[index].notification_target_id + '&comment=1'
						})
						break;
					case 'activity_comment':
						uni.navigateTo({
							url: '/pages/activity/activity?activity_id=' + this.noticeInfo[index].notification_target_id + '&comment=1'
						})
						break;
					case 'recruit_comment':
						uni.navigateTo({
							url: '/pages/recruit/recruit?recruit_id=' + this.noticeInfo[index].notification_target_id + '&comment=1'
						})
						break;
				}
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
			formatNotificationTime(index) {
				let time = this.noticeInfo[index].notification_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.noticeInfo[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.noticeInfo[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.noticeInfo[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.noticeInfo[index].notification_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.noticeInfo[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.noticeInfo[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.noticeInfo[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.noticeInfo[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.noticeInfo[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.noticeInfo[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.noticeInfo[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.noticeInfo[index].display_time = this.noticeInfo[index].notification_created;
					}
				}
			},
		}
	}
</script>

<style src="./user-notice.css">
</style>
