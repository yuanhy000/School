<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Article</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 @click="cancelInput()" :scroll-top="scroll_top">
			<view class="max-width bg-white padding-bottom-sm">
				<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white max-width">
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="articleInfo.article_user.user_avatar"
					 v-if="!articleInfo.article_anonymity">
					</image>
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" src="../../static/article/anonymity.png"
					 style="background-color: #F1F1F1;" v-else>
					</image>
					<view class="flex-column justify-center">
						<text class="aricle-user-name margin-bottom-xs text-bold" v-if="!articleInfo.article_anonymity">{{articleInfo.article_user.user_name}}</text>
						<text class="aricle-user-name margin-bottom-xs text-bold" v-else>匿名用户</text>
						<view>
							<text class="article-create-time">{{articleInfo.display_time}}</text>
							<text class="article-create-time margin-left" v-if="articleInfo.article_display_location">来自{{articleInfo.article_user.user_school}}</text>
						</view>
					</view>
					<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0;"
					 v-if="!articleInfo.user_follow" @click="tooglrUserFollow">关注</button>
					<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0; background-color: #BBBBBB;"
					 v-else @click="tooglrUserFollow">已关注</button>
				</view>
				<view class="text-content padding-left padding-right padding-bottom-xs text-bold text-black padding-top-xs">
					{{articleInfo.article_title}}
				</view>
				<view class="text-content padding-left padding-right padding-bottom">
					<text decode="true">{{articleInfo.article_content}}</text>
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom-xs ">
					<block v-for="(item,index) in articleInfo.article_images" :key="index">
						<view class="bg-img" :style="{backgroundImage: 'url('+item.image_url+')'}" @click.stop="viewImage" :data-url="item.image_url">
						</view>
					</block>
				</view>
				<view class="flex align-center max-width justify-end padding-bottom-xs padding-top-xs padding-right">
					<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{articleInfo.article_likes}}</text></text>
					<text class="commodity-other-info margin-right-sm">评论 ·<text class="margin-left-xs">{{articleInfo.article_comments_count}}</text></text>
					<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{articleInfo.article_views}}</text></text>
				</view>
			</view>
			<view class="padding-top padding-left padding-right flex align-center bg-white margin-top flex-column">
				<view class="comment-container-title info-border-bottom" id="comment">
					<text>全部留言</text>
				</view>
				<image src="../../static/commodity/none-default.png" class="none-default-image" mode="widthFix" v-if="!hasComment"></image>
				<view class="flex-column max-width padding-top-xs" v-else>
					<block v-for="(item,index) in articleInfo.article_comments" :key="index">
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
					 v-if="articleInfo.article_comments.length > comment_page*4">
						<text class="text-theme-color" style="font-weight: 700;">加载更多评论<text class="cuIcon-unfold margin-left-xs"></text></text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade-quick" v-show="display">
			<view class="flex">
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="likeArticle">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon animation-fade-quick" v-if="articleInfo.article_like"></text>
					<text class="cuIcon-appreciate text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl" v-if="!isInput" @click="CollectArticle">
					<text class="cuIcon-favorfill text-theme-color commodity-icon animation-fade-quick" v-if="articleInfo.article_collect"></text>
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
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-if="!isInput">私聊</button>
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-else @click="submitComment">评论</button>
		</view>
		<notification ref="notification" :isdistance="true"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import WaterfallFlow from '../../components/waterfall-flow/waterfall-flow.vue';
	let qqmapsdk = new QQMapWX({
		key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
	});
	export default {
		data() {
			return {
				display: false,
				article_id: 0,
				scroll_height: 700,
				articleInfo: [],
				imageList: [],
				isInput: false,
				inputComment: '',
				comment_page: 1,
				scroll_top: 0,
			}
		},
		computed: {
			hasComment: function() {
				if (this.articleInfo.length != 0) {
					return this.articleInfo.article_comments.length != 0;
				}
				return false;
			}
		},
		onLoad(option) {
			this.article_id = option.article_id;
			let that = this;
			Vue.prototype.$http.request({
				url: '/articles/detail',
				method: 'POST',
				params: {
					article_id: this.article_id
				},
			}).then(res => {
				this.articleInfo = res.data.data;
				for (let item in this.articleInfo.article_images) {
					this.imageList.push(this.articleInfo.article_images[item].image_url);
				}
				this.formatArticleContent();
				this.formatTime();
				for (let index in this.articleInfo.article_comments) {
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
			formatArticleContent() {
				this.articleInfo.article_content = this.articleInfo.article_content.replace(/<br\/\>/g, "\n");
			},
			tooglrUserFollow() {
				Vue.prototype.$http.request({
					url: '/users/follow',
					method: 'POST',
					params: {
						accept_id: this.articleInfo.article_user.user_id,
					},
				}).then(res => {
					this.articleInfo.user_follow = !this.articleInfo.user_follow;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
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
					this.articleInfo.article_comments[index].comment_like = !this.articleInfo.article_comments[index].comment_like;
					if (this.articleInfo.article_comments[index].comment_like) {
						this.articleInfo.article_comments[index].comment_likes++;
					} else {
						this.articleInfo.article_comments[index].comment_likes--;
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
					url: '/comments/article/create',
					method: 'POST',
					params: {
						article_id: this.article_id,
						comment_content: this.inputComment,
						parent_id: 0
					},
				}).then(res => {
					this.articleInfo.article_comments.unshift(res.data.data);
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
				this.isInput = true;
			},
			cancelInput() {
				this.isInput = false;
			},
			likeArticle(index, article_id) {
				Vue.prototype.$http.request({
					url: '/likes/article',
					method: 'POST',
					params: {
						article_id: this.article_id,
					},
				}).then(res => {
					this.articleInfo.article_like = !this.articleInfo.article_like;
					this.articleInfo.article_like ? this.articleInfo.article_likes++ : this.articleInfo.article_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			CollectArticle(index, article_id) {
				Vue.prototype.$http.request({
					url: '/collections/article',
					method: 'POST',
					params: {
						article_id: this.article_id,
					},
				}).then(res => {
					this.articleInfo.article_collect = !this.articleInfo.article_collect;
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
				let time = this.articleInfo.article_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.articleInfo.display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.articleInfo.display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.articleInfo.display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.articleInfo.article_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.articleInfo.display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.articleInfo.display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.articleInfo.display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.articleInfo.display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.articleInfo.display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.articleInfo.display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.articleInfo.display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.articleInfo.display_time = this.articleInfo.created_at;
					}
				}
			},
			formatCommentsTime(index) {
				let time = this.articleInfo.article_comments[index].comment_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.articleInfo.article_comments[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.articleInfo.article_comments[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.articleInfo.article_comments[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.articleInfo.article_comments[index].comment_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.articleInfo.article_comments[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.articleInfo.article_comments[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.articleInfo.article_comments[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.articleInfo.article_comments[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.articleInfo.article_comments[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.articleInfo.article_comments[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.articleInfo.article_comments[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.articleInfo.article_comments[index].display_time = this.articleInfo.article_comments[index].created_at;
					}
				}
			}
		}
	}
</script>

<style src="./article.css">
</style>
