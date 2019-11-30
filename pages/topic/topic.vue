<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">话题详情</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 :scroll-top="scroll_top" @scrolltolower="loadNextPage">
			<loading v-if="loading" style="position: relative; top: 450rpx;"></loading>
			<view class="max-width bg-white padding-bottom-sm" v-if="!loading">
				<view class="padding-top padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white max-width"
				 @click.stop="navigateUserShow(topicInfo.topic_user.user_id,topicInfo.topic_anonymity)">
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="topicInfo.topic_user.user_avatar"
					 v-if="!topicInfo.topic_anonymity">
					</image>
					<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" src="../../static/article/anonymity.png"
					 style="background-color: #F1F1F1;" v-else>
					</image>
					<view class="flex-column justify-center">
						<text class="aricle-user-name margin-bottom-xs text-bold" v-if="!topicInfo.topic_anonymity">{{topicInfo.topic_user.user_name}}</text>
						<text class="aricle-user-name margin-bottom-xs text-bold" v-else>匿名用户</text>
						<view>
							<text class="article-create-time">{{topicInfo.topic_created}}</text>
							<text class="article-create-time margin-left" v-if="topicInfo.topic_display_location">来自{{topicInfo.topic_user.user_school}}</text>
						</view>
					</view>
					<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0;"
					 v-if="!topicInfo.user_follow&&!topicInfo.topic_anonymity" @click.stop="tooglrUserFollow">关注</button>
					<button class="cu-btn bg-grey shadow-blur text-white text-sm animation-fade-quick" style="margin-left: auto; margin-right: 0; background-color: #BBBBBB;"
					 v-if="topicInfo.user_follow&&!topicInfo.topic_anonymity" @click.stop="tooglrUserFollow">已关注</button>
				</view>
				<view class="text-content padding-left padding-right padding-bottom-xs text-bold text-black padding-top-xs" v-if="topicInfo.topic_title">
					{{topicInfo.topic_title}}
				</view>
				<view class="text-content padding-left padding-right padding-bottom padding-top-sm">
					<text decode="true">{{topicInfo.topic_content}}</text>
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom-xs ">
					<block v-for="(item,index) in topicInfo.topic_images" :key="index">
						<view class="bg-img" :style="{backgroundImage: 'url('+item.image_url+')'}" @click.stop="viewImage" :data-url="item.image_url">
						</view>
					</block>
				</view>
				<view class="flex align-center max-width justify-end padding-bottom-xs padding-top-xs padding-right">
					<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{topicInfo.topic_likes}}</text></text>
					<text class="commodity-other-info margin-right-sm">回答 ·<text class="margin-left-xs">{{topicInfo.topic_answer_count}}</text></text>
					<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{topicInfo.topic_views}}</text></text>
				</view>
			</view>
			<image src="../../static/article/no-answer.png" class="max-width" mode="widthFix" v-if="!loading&&answerInfo.length==0"></image>
			<block v-for="(item,index) in answerInfo" v-bind:key="index">
				<view class="cu-item shadow bg-white padding-top margin-top-xl margin-left margin-right" @click="navigateAnswer(item.answer_id)"
				 style="border-radius: 20rpx; min-height: 200rpx;">
					<view class=" padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white max-width"
					 @click.stop="navigateUserShow(item.answer_user.user_id,item.answer_anonymity)">
						<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.answer_user.user_avatar"
						 v-if="!item.answer_anonymity">
						</image>
						<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" src="../../static/article/anonymity.png"
						 style="background-color: #F1F1F1;" v-else>
						</image>
						<view class="flex-column justify-center">
							<text class="aricle-user-name margin-bottom-xs text-bold" v-if="!item.answer_anonymity">{{item.answer_user.user_name}}</text>
							<text class="aricle-user-name margin-bottom-xs text-bold" v-else>匿名用户</text>
							<view>
								<text class="article-create-time">{{item.answer_created}}</text>
								<text class="article-create-time margin-left" v-if="item.answer_display_location">来自{{item.answer_user.user_school}}</text>
							</view>
						</view>
					</view>
					<view class="text-content padding-left padding-right text-bold text-black margin-top-xs text-cut" style="font-size: 30rpx;"
					 v-if="item.answer_title">
						{{item.answer_title}}
					</view>
					<view class="text-content padding-left padding-right margin-top margin-bottom activity_content" style="font-size: 24rpx!important; line-height: 40rpx;">
						<text decode="true">{{item.answer_content}}</text>
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom padding-bottom-sm">
						<block v-for="(imgItem,index) in item.answer_images" :key="index">
							<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage" :data-url="imgItem.image_url">
							</view>
						</block>
					</view>
					<view class="max-width flex align-center justify-between">
						<view class="article-create-time padding-left" style="position: relative; bottom: 30rpx;">{{item.answer_created}}</view>
						<view class="article-create-time" style="position: relative; right: 30rpx; bottom: 30rpx;">
							<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{item.answer_likes}}</text></text>
							<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{item.answer_views}}</text></text>
						</view>
					</view>
				</view>
			</block>
			<loading v-if="loading"></loading>
			<view class="max-width" style="height: 50rpx;"></view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade-quick max-width" v-show="display" style="position: fixed; bottom: 0;">
			<view class="flex max-width">
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="likeTopic">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon animation-fade-quick" v-if="topicInfo.topic_like"></text>
					<text class="cuIcon-appreciate text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color padding-top-xs">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl icon-button" @click="CollectTopic">
					<text class="cuIcon-favorfill text-theme-color commodity-icon animation-fade-quick" v-if="topicInfo.topic_collect"></text>
					<text class="cuIcon-favor text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color padding-top-xs">收藏</text>
				</view>
				<button class="action flex-column align-center padding-right-xl icon-button " open-type="share">
					<text class="cuIcon-share text-theme-color commodity-icon animation-fade-quick"></text>
					<text class="text-xs text-theme-color padding-top-xs">分享</text>
				</button>
				<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" @click="navigateAddAnswer"
				 style="margin: auto 30rpx auto auto; width: 300rpx;">写回答</button>
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
				topic_id: 0,
				topicInfo: [],
				answerInfo: [],
				links: {},
				loading: false,
				display: true,
				scroll_height: 700,
				imageList: [],
				loadOver: false
			}
		},
		onShareAppMessage(res) {
			return {
				title: '快来围观这个话题',
				path: '/pages/topic/topic?topic_id=' + this.topic_id,
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		onLoad(option) {
			this.topic_id = option.topic_id;
			let that = this;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/topics/detail',
				method: 'POST',
				params: {
					topic_id: this.topic_id
				},
			}).then(res => {
				this.topicInfo = res.data.data;
				this.loading = false;
			});
			Vue.prototype.$http.request({
				url: '/answers/topic',
				method: 'POST',
				params: {
					topic_id: this.topic_id
				},
			}).then(res => {
				this.answerInfo = res.data.data;
				this.links = res.data.links;
				for (let item in this.answerInfo) {
					for (let index in this.answerInfo[item].answer_images) {
						this.imageList.push(this.answerInfo[item].answer_images[index].image_url);
					}
					this.formatAnswerContent(item);
				}
				this.loading = false;
				if (this.answerInfo.length == 0) {
					this.loadOver = true;
				}
			});
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			loadNextPage() {
				if (this.loadOver || this.loading) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: this.links.next,
					method: 'POST',
					params: {
						topic_id: this.topic_id
					},
				}).then(res => {
					this.links = res.data.links;
					this.answerInfo.push.apply(this.answerInfo, res.data.data);
					for (let item = (res.data.meta.current_page - 1) * 10; item < this.answerInfo.length; item++) {
						for (let index in this.answerInfo[item].answer_images) {
							this.imageList.push(this.answerInfo[item].answer_images[index].image_url);
						}
						this.formatAnswerContent(item);
					}
					if (res.data.meta.current_page == res.data.meta.last_page) {
						this.loadOver = true;
					}
					this.loading = false;
				})
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
			},
			likeTopic(index, article_id) {
				Vue.prototype.$http.request({
					url: '/likes/topic',
					method: 'POST',
					params: {
						topic_id: this.topic_id,
					},
				}).then(res => {
					this.topicInfo.topic_like = !this.topicInfo.topic_like;
					this.topicInfo.topic_like ? this.topicInfo.topic_likes++ : this.topicInfo.topic_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			CollectTopic(index, article_id) {
				Vue.prototype.$http.request({
					url: '/collections/topic',
					method: 'POST',
					params: {
						topic_id: this.topic_id,
					},
				}).then(res => {
					this.topicInfo.topic_collect = !this.topicInfo.topic_collect;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			tooglrUserFollow() {
				Vue.prototype.$http.request({
					url: '/users/follow',
					method: 'POST',
					params: {
						accept_id: this.topicInfo.topic_user.user_id,
					},
				}).then(res => {
					this.topicInfo.user_follow = !this.topicInfo.user_follow;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			formatTopicContent(index) {
				this.topicInfo.topic_content = this.topicInfo.topic_content.replace(/<br\/\>/g, "\n");
			},
			formatAnswerContent(index) {
				this.answerInfo[index].answer_content = this.answerInfo[index].answer_content.replace(/<br\/\>/g, "\n");
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
			navigateAddAnswer() {
				uni.navigateTo({
					url: '/pages/addition-answer/addition-answer?topic_id=' + this.topic_id
				})
			}
		}
	}
</script>

<style src="./topic.css">
</style>
