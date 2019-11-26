<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Collect</block>
		</cu-custom>
		<scroll-view class="bg-white nav shadow" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true
		 :scroll-left="scroll_left">
			<view class="cu-item tab-item-width flex text-center" :class="index==TabCur?'text-theme-color active-text-border':''"
			 v-for="(item,index) in menu_list" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
			<view class="cu-item tab-item-width flex text-center" :class="4==TabCur?'text-theme-color active-text-border':''"
			 @tap="tabSelect" :data-id="4" v-if="map_poi.is_search">搜索</view>
		</scroll-view>
		<loading v-if="loading" class="animation-fade"></loading>
		<swiper :duration="400" class="discovery-swiper animation-fade" id="swiper" :style="{height:scroll_height +'px'}"
		 :current="TabCur" @change="tabSwiper">
			<swiper-item class="animation-fade">
				<scroll-view scroll-y :style="{height:scroll_height +'px'}">
					<image src="../../static/article/no-collection.png" class="none-default-image" mode="widthFix" v-if="!loadingItem&&articleInfo.length==0"></image>
					<block class="swiper-item swiper-item-container" v-for="(item, index) in articleInfo" v-bind:key="index" v-else>
						<view class="cu-item shadow bg-white margin-left margin-right margin-top" @click="navigateArticle(item.article_id,0)"
						 style="border-radius: 20rpx;">
							<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
							 style="border-radius: 20rpx;">
								<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.article_user.user_avatar"
								 v-if="!item.article_anonymity">
								</image>
								<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" src="../../static/article/anonymity.png"
								 style="background-color: #F1F1F1;" v-else>
								</image>
								<view class="flex-column justify-center">
									<text class="aricle-user-name margin-bottom-xs" v-if="!item.article_anonymity">{{item.article_user.user_name}}</text>
									<text class="aricle-user-name margin-bottom-xs" v-else>匿名用户</text>
									<view>
										<text class="article-create-time">{{item.display_time}}</text>
										<text class="article-create-time margin-left" v-if="item.article_display_location">来自{{item.article_user.user_school}}</text>
									</view>
								</view>
							</view>
							<view class="text-content padding-left padding-right text-bold text-black margin-top-xs" v-if="tem.article_title">
								{{item.article_title}}
							</view>
							<view class="text-content padding-left padding-right margin-top-xs margin-bottom activity_content">
								<text decode="true">{{item.article_content}}</text>
							</view>
							<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom">
								<block v-for="(imgItem,index) in item.article_images" :key="index">
									<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
									 :data-url="imgItem.image_url">
									</view>
								</block>
							</view>
							<view class="max-width flex align-center operation-border-top" style="height: 90rpx;">
								<view class="operation-item flex align-center justify-center" @click.stop="likeArticle(index,item.article_id)">
									<text class="cuIcon-appreciatefill text-theme-color operation-icon" v-if="item.article_like"></text>
									<text class="cuIcon-appreciate text-theme-color operation-icon" v-else></text>
									<text class="text-theme-color">{{item.article_likes}}</text>
								</view>
								<view class="operation-item flex align-center justify-center" @click.stop="navigateArticle(item.article_id,1)">
									<text class="cuIcon-comment text-theme-color operation-icon"></text>
									<text class="text-theme-color">{{item.article_comments_count}}</text>
								</view>
								<view class="operation-item flex align-center justify-center">
									<text class="cuIcon-share text-theme-color operation-icon"></text>
									<text class="text-theme-color">分享</text>
								</view>
							</view>
						</view>
					</block>
					<view class="max-width" style="height: 50rpx;"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="animation-fade">
				<scroll-view scroll-y :style="{height:scroll_height +'px'}">
					<image src="../../static/article/no-collection.png" class="none-default-image" mode="widthFix" v-if="!loadingItem&&activityInfo.length==0"></image>
					<block v-for="(item,index) in activityInfo" v-bind:key="index" v-else>
						<view class="cu-item shadow bg-white margin-left margin-right margin-top" @click="navigateActivity(item.activity_id,0)"
						 style="border-radius: 20rpx;">
							<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
							 style="border-radius: 20rpx;">
								<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.activity_user.user_avatar">
								</image>
								</image>
								<view class="flex-column justify-center">
									<text class="aricle-user-name margin-bottom-xs">{{item.activity_user.user_name}}</text>
									<view>
										<text class="article-create-time">{{item.display_time}}</text>
										<text class="article-create-time margin-left">来自{{item.activity_user.user_school}}</text>
									</view>
								</view>
							</view>
							<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs">
								{{item.activity_name}}
							</view>
							<view class="text-content padding-left padding-right margin-bottom activity_content">
								{{item.activity_content}}
							</view>
							<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs">
								注意事项
							</view>
							<view class="text-content padding-left padding-right margin-bottom activity_attention">
								{{item.activity_attention}}
							</view>
							<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom-xs">
								<block v-for="(imgItem,index) in item.activity_images" :key="index">
									<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
									 :data-url="imgItem.image_url">
									</view>
								</block>
							</view>
							<view class="article-create-time margin-left margin-bottom">{{item.activity_school}} ·
								{{item.activity_organization}}</view>
							<view class="max-width flex align-center operation-border-top" style="height: 90rpx;">
								<view class="operation-item flex align-center justify-center" @click.stop="likeActivity(index,item.activity_id)">
									<text class="cuIcon-appreciatefill text-theme-color operation-icon" v-if="item.activity_like"></text>
									<text class="cuIcon-appreciate text-theme-color operation-icon" v-else></text>
									<text class="text-theme-color">{{item.activity_likes}}</text>
								</view>
								<view class="operation-item flex align-center justify-center" @click.stop="navigateActivity(item.activity_id,1)">
									<text class="cuIcon-comment text-theme-color operation-icon"></text>
									<text class="text-theme-color">{{item.activity_comments_count}}</text>
								</view>
								<view class="operation-item flex align-center justify-center">
									<text class="cuIcon-share text-theme-color operation-icon"></text>
									<text class="text-theme-color">分享</text>
								</view>
							</view>
						</view>
					</block>
					<view class="max-width" style="height: 50rpx;"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="animation-fade">
				<scroll-view scroll-y :style="{height:scroll_height +'px'}">
					<image src="../../static/article/no-collection.png" class="none-default-image" mode="widthFix" v-if="!loadingItem&&newsInfo.length==0"></image>
					<block v-for="(item,index) in newsInfo" v-bind:key="index" v-else>
						<view class="cu-card article bg-white shadow margin-top margin-left margin-right" style="border-radius: 20rpx;"
						 @click=navigateNews(item.news_id)>
							<view class="cu-item shadow" style="margin: 0;">
								<view class="title">
									<view class="text-cut">{{item.news_title}}</view>
								</view>
								<view class="content">
									<view class="desc margin-right-sm">
										<view class="text-content" style="font-size: 24rpx!important; line-height: 40rpx;">{{item.news_content}}</view>
										<view>
											<text class="article-create-time  text-bold text-theme-color margin-right">
												#{{item.news_author}}#
											</text>
											<text class="article-create-time">{{item.news_created}}</text>
										</view>
									</view>
									<image :src="item.news_images[0].image_url" mode="aspectFill" @click.stop="viewImage" :data-url="item.news_images[0].image_url"></image>
								</view>
							</view>
						</view>
					</block>
					<view class="max-width" style="height: 50rpx;"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" id="commodities" class="flow-box max-width">
					<view class="padding-top-sm">
						<waterfall-flow :list="commodityInfo" @click="navigateCommodity" :init="initList"></waterfall-flow>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="animation-fade">
				<scroll-view scroll-y :style="{height:scroll_height +'px'}">
					<image src="../../static/article/no-collection.png" class="none-default-image" mode="widthFix" v-if="recruitInfo.length==0"></image>
					<block v-for="(item,index) in recruitInfo" v-bind:key="index">
						<view class="cu-item shadow bg-white margin-top margin-left margin-right" @click="navigateRecruit(item.recruit_id,0)"
						 style="border-radius: 20rpx;">
							<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
							 style="border-radius: 20rpx;">
								<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.recruit_user.user_avatar">
								</image>
								<view class="flex-column justify-center">
									<text class="aricle-user-name margin-bottom-xs">{{item.recruit_user.user_name}}</text>
									<view>
										<text class="article-create-time">{{item.display_time}}</text>
										<text class="article-create-time margin-left" v-if="item.recruit_display_location">来自{{item.recruit_user.user_school}}</text>
									</view>
								</view>
							</view>
							<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-theme-color margin-top-xs">
								#{{item.recruit_target}}#
							</view>
							<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs">
								{{item.recruit_title}}
							</view>
							<view class="text-content padding-left padding-right margin-bottom activity_content">
								{{item.recruit_content}}
							</view>
							<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom">
								<block v-for="(imgItem,index) in item.recruit_images" :key="index">
									<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
									 :data-url="imgItem.image_url">
									</view>
								</block>
							</view>
							<view class="max-width flex align-center operation-border-top" style="height: 90rpx;">
								<view class="operation-item flex align-center justify-center" @click.stop="likeRecruit(index,item.recruit_id)">
									<text class="cuIcon-appreciatefill text-theme-color operation-icon" v-if="item.recruit_like"></text>
									<text class="cuIcon-appreciate text-theme-color operation-icon" v-else></text>
									<text class="text-theme-color">{{item.recruit_likes}}</text>
								</view>
								<view class="operation-item flex align-center justify-center" @click.stop="navigateRecruit(item.recruit_id,1)">
									<text class="cuIcon-comment text-theme-color operation-icon"></text>
									<text class="text-theme-color">{{item.recruit_comments_count}}</text>
								</view>
								<view class="operation-item flex align-center justify-center">
									<text class="cuIcon-share text-theme-color operation-icon"></text>
									<text class="text-theme-color">分享</text>
								</view>
							</view>
						</view>
					</block>
					<view class="max-width" style="height: 50rpx;"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<notification ref="notification" :isdistance="true"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState
	} from 'vuex';
	import WaterfallFlow from '../../components/waterfall-flow/waterfall-flow.vue';
	export default {
		data() {
			return {
				TabCur: 0,
				menu_list: ['动态', '活动', '头条', '商品', '招募'],
				scroll_left: 0,
				screen_width: 400,
				scroll_height: 600,
				articleInfo: [],
				activityInfo: [],
				recruitInfo: [],
				newsInfo: [],
				commodityInfo: [],
				imageList: [],
				loading: false,
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		components: {
			WaterfallFlow: WaterfallFlow
		},
		onLoad(option) {
			this.user_id = option.user_id;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/users/collect',
				method: 'POST',
				params: {
					user_id: this.user_id,
				},
			}).then(res => {
				this.articleInfo = res.data.data.articles;
				this.formatArticleInfo();
				this.activityInfo = res.data.data.activities;
				this.formatActivityInfo();
				this.recruitInfo = res.data.data.recruits;
				this.formatRecruitInfo();
				this.newsInfo = res.data.data.news;
				this.commodityInfo = res.data.data.commodities;
				this.loading = false;
			})
			this.getHeight();
		},

		methods: {
			formatArticleInfo() {
				for (let item in this.articleInfo) {
					for (let index in this.articleInfo[item].article_images) {
						this.imageList.push(this.articleInfo[item].article_images[index].image_url);
					}
					this.articleInfo[item].article_content = this.articleInfo[item].article_content.replace(/<br\/\>/g, "\n");
					this.formatArticleTime(item);
				}
			},
			formatActivityInfo() {
				for (let item in this.activityInfo) {
					for (let index in this.activityInfo[item].activity_images) {
						this.imageList.push(this.activityInfo[item].activity_images[index].image_url);
					}
					this.activityInfo[item].activity_content = this.activityInfo[item].activity_content.replace(/<br\/\>/g, "\n");
					this.formatActivityTime(item);
				}

			},
			formatRecruitInfo() {
				for (let item in this.recruitInfo) {
					for (let index in this.recruitInfo[item].recruit_images) {
						this.imageList.push(this.recruitInfo[item].recruit_images[index].image_url);
					}
					this.recruitInfo[item].recruit_content = this.recruitInfo[item].recruit_content.replace(/<br\/\>/g, "\n");
					this.formatRecruitTime(item);
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
						query.select('#swiper').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top;
						}).exec();
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scroll_left = (e.currentTarget.dataset.id - 1) * (this.screen_width / 4);
			},
			tabSwiper(e) {
				this.TabCur = e.detail.current;
				this.scroll_left = (this.TabCur - 1) * (this.screen_width / 4);
			},
			navigateNews(news_id) {
				uni.navigateTo({
					url: '/pages/news/news?news_id=' + news_id
				})
			},
			navigateArticle(article_id, comment) {
				uni.navigateTo({
					url: '/pages/article/article?article_id=' + article_id + '&comment=' + comment
				})
			},
			navigateActivity(activity_id, comment) {
				uni.navigateTo({
					url: '/pages/activity/activity?activity_id=' + activity_id + '&comment=' + comment
				})
			},
			navigateRecruit(recruit_id, comment) {
				uni.navigateTo({
					url: '/pages/recruit/recruit?recruit_id=' + recruit_id + '&comment=' + comment
				})
			},
			navigateCommodity(commodity_id) {
				uni.navigateTo({
					url: '/pages/commodity/commodity?commodity_id=' + commodity_id
				})
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
			},
			likeRecruit(index, recruit_id) {
				Vue.prototype.$http.request({
					url: '/likes/recruit',
					method: 'POST',
					params: {
						recruit_id: recruit_id,
					},
				}).then(res => {
					this.recruitInfo[index].recruit_like = !this.recruitInfo[index].recruit_like;
					this.recruitInfo[index].recruit_like ? this.recruitInfo[index].recruit_likes++ : this.recruitInfo[index].recruit_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			likeActivity(index, activity_id) {
				Vue.prototype.$http.request({
					url: '/likes/activity',
					method: 'POST',
					params: {
						activity_id: activity_id,
					},
				}).then(res => {
					this.activityInfo[index].activity_like = !this.activityInfo[index].activity_like;
					this.activityInfo[index].activity_like ? this.activityInfo[index].activity_likes++ : this.activityInfo[index].activity_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			likeArticle(index, article_id) {
				Vue.prototype.$http.request({
					url: '/likes/article',
					method: 'POST',
					params: {
						article_id: article_id,
					},
				}).then(res => {
					this.articleInfo[index].article_like = !this.articleInfo[index].article_like;
					this.articleInfo[index].article_like ? this.articleInfo[index].article_likes++ : this.articleInfo[index].article_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			likeAttention(index, article_id) {
				Vue.prototype.$http.request({
					url: '/likes/article',
					method: 'POST',
					params: {
						article_id: article_id,
					},
				}).then(res => {
					this.attentionInfo[index].article_like = !this.attentionInfo[index].article_like;
					this.attentionInfo[index].article_like ? this.attentionInfo[index].article_likes++ : this.attentionInfo[index].article_likes--;
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			formatArticleTime(index) {
				let time = this.articleInfo[index].article_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.articleInfo[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.articleInfo[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.articleInfo[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.articleInfo[index].article_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.articleInfo[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.articleInfo[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.articleInfo[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.articleInfo[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.articleInfo[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.articleInfo[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.articleInfo[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.articleInfo[index].display_time = this.articleInfo[index].article_created;
					}
				}
			},
			formatActivityTime(index) {
				let time = this.activityInfo[index].activity_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.activityInfo[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.activityInfo[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.activityInfo[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.activityInfo[index].activity_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.activityInfo[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.activityInfo[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.activityInfo[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.activityInfo[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.activityInfo[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.activityInfo[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.activityInfo[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.activityInfo[index].display_time = this.activityInfo[index].activity_created;
					}
				}
			},
			formatRecruitTime(index) {
				let time = this.recruitInfo[index].recruit_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.recruitInfo[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.recruitInfo[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.recruitInfo[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.recruitInfo[index].recruit_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.recruitInfo[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.recruitInfo[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.recruitInfo[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.recruitInfo[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.recruitInfo[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.recruitInfo[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.recruitInfo[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.recruitInfo[index].display_time = this.recruitInfo[index].recruit_created;
					}
				}
			},
		}
	}
</script>

<style src="./user-collect.css">
</style>
