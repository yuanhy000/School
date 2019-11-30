<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">动态详情</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 @click="cancelInput()" :scroll-top="scroll_top">
			<loading v-if="loading" style="position: relative; top: 450rpx;"></loading>
			<view class="max-width bg-white padding-bottom-sm" v-if="!loading">
				<view class="max-width margin-bottom padding-left text-bold text-black flex justify-between" style="height: 100rpx; line-height: 100rpx; border-bottom: 1rpx solid #EEEEEE; font-size: 30rpx;"
				 @click.stop="navigateTopic(answerInfo.answer_topic.topic_id)">
					<view>{{answerInfo.answer_topic.topic_title}}</view>
					<view class="cuIcon-right padding-right" style="text-align: right;"></view>
				</view>
				<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white max-width"
				 @click="navigateUserShow(answerInfo.answer_user.user_id,answerInfo.answer_anonymity)">
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="answerInfo.answer_user.user_avatar"
					 v-if="!answerInfo.answer_anonymity">
					</image>
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" src="../../static/article/anonymity.png"
					 style="background-color: #F1F1F1;" v-else>
					</image>
					<view class="flex-column justify-center">
						<text class="aricle-user-name margin-bottom-xs text-bold" v-if="!answerInfo.answer_anonymity">{{answerInfo.answer_user.user_name}}</text>
						<text class="aricle-user-name margin-bottom-xs text-bold" v-else>匿名用户</text>
						<view>
							<text class="article-create-time">{{answerInfo.display_time}}</text>
							<text class="article-create-time margin-left" v-if="answerInfo.answer_display_location">来自{{answerInfo.answer_user.user_school}}</text>
						</view>
					</view>
					<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0;"
					 v-if="!answerInfo.user_follow&&!answerInfo.answer_anonymity" @click.stop="tooglrUserFollow">关注</button>
					<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0; background-color: #BBBBBB;"
					 v-if="answerInfo.user_follow&&!answerInfo.answer_anonymity" @click.stop="tooglrUserFollow">已关注</button>
				</view>
				<view class="text-content padding-left padding-right padding-bottom-xs text-bold text-black padding-top-sm" v-if="answerInfo.answer_title">
					{{answerInfo.answer_title}}
				</view>
				<view class="text-content padding-left padding-right padding-bottom">
					<text decode="true">{{answerInfo.answer_content}}</text>
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom-xs ">
					<block v-for="(item,index) in answerInfo.answer_images" :key="index">
						<view class="bg-img" :style="{backgroundImage: 'url('+item.image_url+')'}" @click.stop="viewImage" :data-url="item.image_url">
						</view>
					</block>
				</view>
				<view class="flex align-center max-width justify-end padding-bottom-xs padding-top-xs padding-right">
					<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{answerInfo.answer_likes}}</text></text>
					<text class="commodity-other-info margin-right-sm">评论 ·<text class="margin-left-xs">{{answerInfo.answer_comments_count}}</text></text>
					<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{answerInfo.answer_views}}</text></text>
				</view>
			</view>
			<view class="padding-top padding-left padding-right flex align-center bg-white margin-top flex-column" v-if="!loading">
				<view class="comment-container-title info-border-bottom" id="comment">
					<text>全部留言</text>
				</view>
				<image src="../../static/commodity/none-default.png" class="none-default-image" mode="widthFix" v-if="!hasComment"></image>
				<view class="flex-column max-width padding-top-xs" v-else>
					<block v-for="(item,index) in answerInfo.answer_comments" :key="index">
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
					 v-if="answerInfo.answer_comments.length > comment_page*4">
						<text class="text-theme-color" style="font-weight: 700;">加载更多评论<text class="cuIcon-unfold margin-left-xs"></text></text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade-quick max-width" v-show="display" style="position: fixed;"
		 :style="{bottom: fixedHeight+'px'}">
			<view class="flex">
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="likeAnswer">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon animation-fade-quick" v-if="answerInfo.answer_like"></text>
					<text class="cuIcon-appreciate text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color padding-top-xs">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="CollectAnswer">
					<text class="cuIcon-favorfill text-theme-color commodity-icon animation-fade-quick" v-if="answerInfo.answer_collect"></text>
					<text class="cuIcon-favor text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color padding-top-xs">收藏</text>
				</view>
				<button class="action flex-column align-center padding-right-xl icon-button " v-if="!isInput" open-type="share">
					<text class="cuIcon-share text-theme-color commodity-icon animation-fade-quick"></text>
					<text class="text-xs text-theme-color padding-top-xs">分享</text>
				</button>
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="beginInput">
					<text class="cuIcon-message text-theme-color commodity-icon animation-fade-quick"></text>
					<text class="text-xs text-theme-color padding-top-xs">评论</text>
				</view>
			</view>
			<view class="search-form round animation-fade-quick" v-if="isInput">
				<text class="cuIcon-comment"></text>
				<input :adjust-position="false" type="text" placeholder="发表你的想法～" v-model="inputComment" confirm-type="search"
				 auto-focus="true" @focus="changeFixedHeight" @blur="cancelInput" @confirm="submitComment"></input>
			</view>
			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-if="isInput"
			 @click="submitComment">评论</button>
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
	export default {
		data() {
			return {
				display: false,
				answer_id: 0,
				scroll_height: 700,
				answerInfo: [],
				imageList: [],
				isInput: false,
				inputComment: '',
				comment_page: 1,
				scroll_top: 0,
				showToast: false,
				toastContent: '',
				fixedHeight: 0,
				loading: false
			}
		},
		computed: {
			hasComment: function() {
				if (this.answerInfo.length != 0) {
					return this.answerInfo.answer_comments.length != 0;
				}
				return false;
			},
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onShareAppMessage(res) {
			return {
				title: '快来围观这个回答',
				path: '/pages/answer/answer?answer_id=' + this.answer_id,
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		onLoad(option) {
			this.answer_id = option.answer_id;
			let that = this;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/answers/detail',
				method: 'POST',
				params: {
					answer_id: this.answer_id
				},
			}).then(res => {
				this.answerInfo = res.data.data;
				for (let item in this.answerInfo.answer_images) {
					this.imageList.push(this.answerInfo.answer_images[item].image_url);
				}
				this.formatAnswerContent();
				this.formatTime();
				for (let index in this.answerInfo.answer_comments) {
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
					this.loading = false;
				}, 200);
			});
		},
		mounted() {
			setTimeout(() => {
				this.display = true;
			}, 100)
		},
		methods: {
			navigateTopic(topic_id) {
				uni.navigateTo({
					url: '/pages/topic/topic?topic_id=' + topic_id
				})
			},
			navigateUserShow(user_id, is_anonymity) {
				if (is_anonymity) {
					return;
				} else {
					uni.navigateTo({
						url: '/pages/user-show/user-show?user_id=' + user_id
					})
				}
			},
			changeFixedHeight(e) {
				this.fixedHeight = e.detail.height;
			},
			hideModal(e) {
				this.showToast = false;
			},
			formatAnswerContent() {
				this.answerInfo.answer_content = this.answerInfo.answer_content.replace(/<br\/\>/g, "\n");
			},
			tooglrUserFollow() {
				Vue.prototype.$http.request({
					url: '/users/follow',
					method: 'POST',
					params: {
						accept_id: this.answerInfo.answer_user.user_id,
					},
				}).then(res => {
					this.answerInfo.user_follow = !this.answerInfo.user_follow;
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
					this.answerInfo.answer_comments[index].comment_like = !this.answerInfo.answer_comments[index].comment_like;
					if (this.answerInfo.answer_comments[index].comment_like) {
						this.answerInfo.answer_comments[index].comment_likes++;
					} else {
						this.answerInfo.answer_comments[index].comment_likes--;
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
					url: '/comments/answer/create',
					method: 'POST',
					params: {
						answer_id: this.answer_id,
						comment_content: this.inputComment,
						parent_id: 0
					},
				}).then(res => {
					this.answerInfo.answer_comments.unshift(res.data.data);
					this.formatCommentsTime(0);
					this.inputComment = '';
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
				this.cancelInput();
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
				this.fixedHeight = 0;
			},
			likeAnswer(index, answer_id) {
				Vue.prototype.$http.request({
					url: '/likes/answer',
					method: 'POST',
					params: {
						answer_id: this.answer_id,
					},
				}).then(res => {
					this.answerInfo.answer_like = !this.answerInfo.answer_like;
					this.answerInfo.answer_like ? this.answerInfo.answer_likes++ : this.answerInfo.answer_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			CollectAnswer(index, answer_id) {
				Vue.prototype.$http.request({
					url: '/collections/answer',
					method: 'POST',
					params: {
						answer_id: this.answer_id,
					},
				}).then(res => {
					this.answerInfo.answer_collect = !this.answerInfo.answer_collect;
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
							that.scroll_height = that.screen_height - res.top - 50;
						}).exec();
					}
				});
			},
			formatTime() {
				let time = this.answerInfo.answer_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.answerInfo.display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.answerInfo.display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.answerInfo.display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.answerInfo.answer_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.answerInfo.display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.answerInfo.display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.answerInfo.display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.answerInfo.display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.answerInfo.display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.answerInfo.display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.answerInfo.display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.answerInfo.display_time = this.answerInfo.answer_created;
					}
				}
			},
			formatCommentsTime(index) {
				let time = this.answerInfo.answer_comments[index].comment_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.answerInfo.answer_comments[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.answerInfo.answer_comments[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.answerInfo.answer_comments[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.answerInfo.answer_comments[index].comment_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.answerInfo.answer_comments[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.answerInfo.answer_comments[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.answerInfo.answer_comments[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.answerInfo.answer_comments[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.answerInfo.answer_comments[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.answerInfo.answer_comments[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.answerInfo.answer_comments[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.answerInfo.answer_comments[index].display_time = this.answerInfo.answer_comments[index].comment_created;
					}
				}
			}
		}
	}
</script>

<style src="./answer.css">
</style>
