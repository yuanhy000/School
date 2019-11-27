<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">头条详情</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 @click="cancelInput()" :scroll-top="scroll_top">
			<view class="max-width bg-white padding-bottom-sm">
				<view class="text-content padding-left padding-right padding-bottom-sm text-bold text-black padding-top-sm text-lg">
					{{newsInfo.news_title}}
				</view>
				<view class="text-content padding-left padding-right padding-bottom">
					<text decode="true" space="ensp" style="letter-spacing: 1rpx;">{{newsInfo.news_content}}</text>
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom-xs ">
					<block v-for="(item,index) in newsInfo.news_images" :key="index">
						<image :src="item.image_url" class="max-width margin-bottom-sm" mode="widthFix" style="border-radius: 10rpx;"
						 @click.stop="viewImage" :data-url="item.image_url"></image>
					</block>
				</view>

				<view class="flex align-center max-width justify-end padding-bottom-xs padding-top-xs padding-right">
					<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{newsInfo.news_likes}}</text></text>
					<text class="commodity-other-info margin-right-sm">评论 ·<text class="margin-left-xs">{{newsInfo.news_comments_count}}</text></text>
					<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{newsInfo.news_views}}</text></text>
				</view>
			</view>
			<view class="padding-top padding-left padding-right flex align-center bg-white margin-top flex-column">
				<view class="comment-container-title info-border-bottom" id="comment">
					<text>全部留言</text>
				</view>
				<image src="../../static/commodity/none-default.png" class="none-default-image" mode="widthFix" v-if="!hasComment"></image>
				<view class="flex-column max-width padding-top-xs" v-else>
					<block v-for="(item,index) in newsInfo.news_comments" :key="index">
						<view class="margin-top-sm" v-show="index < comment_page*4">
							<view class="flex align-center justify-between">
								<view class="flex align-center">
									<image class="cu-avatar avatar-shadow margin-right-sm" style="border-radius: 10rpx;" :src="item.comment_user.user_avatar">
									</image>
									<text class="view-user-name">{{item.comment_user.user_name}}</text>
								</view>
								<view @click="likeComment(index,item.comment_id)">
									<text class="cuIcon-appreciate text-theme-color" v-if="!item.comment_like"></text>
									<text class="cuIcon-appreciatefill text-theme-color" v-else></text>
									<text class="text-theme-color margin-left-xs" v-show="item.comment_likes>0">{{item.comment_likes}}</text>
								</view>
							</view>
							<text class="text-content text-df flex margin-top-xs " style="margin-left: 85rpx; color: #222;">{{item.comment_content}}</text>
							<text class="info-border-bottom max-width padding-bottom-sm flex margin-right padding-top-xs time-text">{{item.display_time}}</text>
						</view>
					</block>
					<view class="max-width flex align-center justify-center padding-top-sm padding-bottom-sm" @click="displayMoreComments"
					 v-if="newsInfo.news_comments.length > comment_page*4">
						<text class="text-theme-color" style="font-weight: 700;">加载更多评论<text class="cuIcon-unfold margin-left-xs"></text></text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade-quick" v-show="display">
			<view class="flex">
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="likeNews">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon animation-fade-quick" v-if="newsInfo.news_like"></text>
					<text class="cuIcon-appreciate text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="CollectNews">
					<text class="cuIcon-favorfill text-theme-color commodity-icon animation-fade-quick" v-if="newsInfo.news_collect"></text>
					<text class="cuIcon-favor text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color">收藏</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="beginInput">
					<text class="cuIcon-share text-theme-color commodity-icon animation-fade-quick"></text>
					<text class="text-xs text-theme-color">分享</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="beginInput">
					<text class="cuIcon-message text-theme-color commodity-icon animation-fade-quick"></text>
					<text class="text-xs text-theme-color">评论</text>
				</view>
			</view>
			<view class="search-form round animation-fade-quick" v-if="isInput">
				<text class="cuIcon-comment"></text>
				<input :adjust-position="false" type="text" placeholder="发表你的想法～" v-model="inputComment" confirm-type="search"></input>
			</view>
<!-- 			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-if="!isInput">私聊</button> -->
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-if="isInput" @click="submitComment">评论</button>
		</view>
		<view class="cu-modal" :class="showToast?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">消息提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-theme-color"></text>
					</view>
				</view>
				<view class="padding-xl" style="letter-spacing: 2rpx;font-size: 26rpx;">
					{{toastContent}}
				</view>
			</view>
		</view>
		<notification ref="notification" :isdistance="true"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState
	} from 'vuex';
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import WaterfallFlow from '../../components/waterfall-flow/waterfall-flow.vue';
	let qqmapsdk = new QQMapWX({
		key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
	});
	export default {
		data() {
			return {
				display: false,
				news_id: 0,
				scroll_height: 700,
				newsInfo: [],
				imageList: [],
				isInput: false,
				inputComment: '',
				comment_page: 1,
				scroll_top: 0,
				showToast: false,
				toastContent: ''
			}
		},
		computed: {
			hasComment: function() {
				if (this.newsInfo.length != 0) {
					return this.newsInfo.news_comments.length != 0;
				}
				return false;
			},
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onLoad(option) {
			this.news_id = option.news_id;
			let that = this;
			Vue.prototype.$http.request({
				url: '/news/detail',
				method: 'POST',
				params: {
					news_id: this.news_id
				},
			}).then(res => {
				this.newsInfo = res.data.data;
				for (let item in this.newsInfo.news_images) {
					this.imageList.push(this.newsInfo.news_images[item].image_url);
				}
				for (let index in this.newsInfo.news_comments) {
					this.formatCommentsTime(index);
				}
				setTimeout(() => {
					this.getHeight();
					if (option.comment == 1) {
						let query = uni.createSelectorQuery().in(this);
						query.select('#comment').boundingClientRect(res => {
							this.scroll_top = res.top;
						}).exec();
					}
				}, 200);
			});
		},
		mounted() {
			setTimeout(() => {
				this.display = true;
			}, 100)
		},
		methods: {
			hideModal(e) {
				this.showToast = false;
			},
			displayMoreComments() {
				this.comment_page++;
			},
			likeComment(index, comment_id) {
				Vue.prototype.$http.request({
					url: '/likes/comment',
					method: 'POST',
					params: {
						comment_id: comment_id,
					},
				}).then(res => {
					this.newsInfo.news_comments[index].comment_like = !this.newsInfo.news_comments[index].comment_like;
					if (this.newsInfo.news_comments[index].comment_like) {
						this.newsInfo.news_comments[index].comment_likes++;
					} else {
						this.newsInfo.news_comments[index].comment_likes--;
					}
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			submitComment() {
				if (this.inputComment == '') {
					this.$refs.notification.open({
						type: 'warn',
						content: '留言不能为空～',
						timeout: 1500,
						isClick: false
					});
				}
				Vue.prototype.$http.request({
					url: '/comments/news/create',
					method: 'POST',
					params: {
						news_id: this.news_id,
						comment_content: this.inputComment,
						parent_id: 0
					},
				}).then(res => {
					this.newsInfo.news_comments.unshift(res.data.data);
					this.formatCommentsTime(0);
					this.cancelInput();
					this.inputComment = '';
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			beginInput() {
				if (this.user.authentication == '' || this.user.authentication == null) {
					this.toastContent = '先去认证身份，再进行留言操作～～'
					this.showToast = true;
					return;
				}
				this.isInput = true;
			},
			cancelInput() {
				this.isInput = false;
			},
			likeNews(index, news_id) {
				Vue.prototype.$http.request({
					url: '/likes/news',
					method: 'POST',
					params: {
						news_id: this.news_id,
					},
				}).then(res => {
					this.newsInfo.news_like = !this.newsInfo.news_like;
					this.newsInfo.news_like ? this.newsInfo.news_likes++ : this.newsInfo.news_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			CollectNews(index, news_id) {
				Vue.prototype.$http.request({
					url: '/collections/news',
					method: 'POST',
					params: {
						news_id: this.news_id,
					},
				}).then(res => {
					this.newsInfo.news_collect = !this.newsInfo.news_collect;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
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
			formatTime() {
				let time = this.newsInfo.news_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.newsInfo.display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.newsInfo.display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.newsInfo.display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.newsInfo.news_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.newsInfo.display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.newsInfo.display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.newsInfo.display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.newsInfo.display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.newsInfo.display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.newsInfo.display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.newsInfo.display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.newsInfo.display_time = this.newsInfo.created_at;
					}
				}
			},
			formatCommentsTime(index) {
				let time = this.newsInfo.news_comments[index].comment_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.newsInfo.news_comments[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.newsInfo.news_comments[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.newsInfo.news_comments[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.newsInfo.news_comments[index].comment_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.newsInfo.news_comments[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.newsInfo.news_comments[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.newsInfo.news_comments[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.newsInfo.news_comments[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.newsInfo.news_comments[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.newsInfo.news_comments[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.newsInfo.news_comments[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.newsInfo.news_comments[index].display_time = this.newsInfo.news_comments[index].created_at;
					}
				}
			}
		}
	}
</script>

<style src="./news.css">
</style>
