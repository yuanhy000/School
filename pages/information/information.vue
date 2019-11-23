<template>
	<view id="information">
		<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scroll="pageScroll"
		 :scroll-top="page_scroll" @scrolltolower="loadNextPage()">
			<scroll-view class="nav text-center" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true
			 :scroll-left="scroll_left">
				<view class="cu-item tab-item-container" :class="currentNav==0?'text-theme-color active-text-border':''" @click="navSelect(0)">头条</view>
				<view class="cu-item tab-item-container" :class="currentNav==1?'text-theme-color active-text-border':''" @click="navSelect(1)">动态</view>
			</scroll-view>
			<view class="animation-fade" v-if="currentNav == 0">
				<block v-for="(item,index) in newsInfo" v-bind:key="index">
					<view class="cu-card article shadow" style="border-radius: 30rpx;">
						<view class="cu-item shadow">
							<view class="title">
								<view class="text-cut">{{item.news_title}}</view>
							</view>
							<view class="content">
								<view class="desc">
									<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
									<view>
										<view class="cu-tag bg-red light sm round">正义天使</view>
										<view class="cu-tag bg-green light sm round">史诗</view>
									</view>
								</view>
								<image :src="item.news_images[0].image_url" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="animation-fade" v-else>
				<view class="bg-white nav shadow max-width " style="border-bottom: 1px solid #c8c8c8;" id="tabbar" :class="fixTabbar?'fixTabbar':''"
				 :style="fixTabbar?'margin-top:-92rpx':''">
					<view class="max-width flex align-center" style="height: 89rpx;">
						<view class="tab-item-width text-center select-container" v-for="(item,index) in menu_list" :key="index" @tap="tabSelect"
						 :data-id="index" style="width: 25%;">
							<text class="tab-item-text" :class="index==currentTab?'item-select-container':''" :data-id="index">{{item}}</text>
						</view>
					</view>
				</view>
				<view style="height: 90rpx;" v-if="fixTabbar"></view>
				<loading v-if="loading" class="animation-fade"></loading>
				<swiper :duration="400" class="discovery-swiper animation-fade" id="swiper" :current="currentTab" @change="tabSwiper"
				 v-else circular=true :style="{height: currentScrollHeight +'px'}">
					<swiper-item>
						<image src="../../static/article/no-attention.png" class="none-default-image" mode="widthFix" v-if="!loadingItem&&attentionInfo.length==0"></image>
						<view class="padding-bottom-xl padding-top animation-fade" v-if="!loadingItem&&attentionInfo.length!=0" id="attention">
							<block v-for="(item,index) in attentionInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateArticle(item.article_id,0)"
								 style="border-radius: 30rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 30rpx;">
										<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.article_user.user_avatar">
										</image>
										<view class="flex-column justify-center">
											<text class="aricle-user-name margin-bottom-xs">{{item.article_user.user_name}}</text>
											<view>
												<text class="article-create-time">{{item.display_time}}</text>
												<text class="article-create-time margin-left" v-if="item.article_display_location">来自{{item.article_user.user_school}}</text>
											</view>
										</view>
									</view>
									<view class="text-content padding-left padding-right  text-bold text-black margin-top-xs" v-if="item.article_title">
										{{item.article_title}}
									</view>
									<view class="text-content padding-left padding-right margin-top-xs margin-bottom activity_content">
										{{item.article_content}}
									</view>
									<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom">
										<block v-for="(imgItem,index) in item.article_images" :key="index">
											<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
											 :data-url="imgItem.image_url">
											</view>
										</block>
									</view>
									<view class="max-width flex align-center operation-border-top" style="height: 90rpx;">
										<view class="operation-item flex align-center justify-center" @click.stop="likeAttention(index,item.article_id)">
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
							<!-- </scroll-view> -->
						</view>
					</swiper-item>

					<swiper-item>
						<view class="padding-bottom-xl padding-top animation-fade" v-if="!loadingItem" id="activity">
							<block v-for="(item,index) in activityInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateActivity(item.activity_id,0)"
								 style="border-radius: 30rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 30rpx;">
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
							<!-- </scroll-view> -->
						</view>
					</swiper-item>

					<swiper-item>
						<!-- <scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl"> -->
						<view class="padding-bottom-xl padding-top animation-fade" v-if="!loadingItem" id="article">
							<block v-for="(item,index) in articleInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateArticle(item.article_id,0)"
								 style="border-radius: 30rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 30rpx;">
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
										{{item.article_content}}
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
							<!-- </scroll-view> -->
						</view>
					</swiper-item>

					<swiper-item>
						<view class="padding-bottom-xl padding-top animation-fade" v-if="!loadingItem" id="recruit">
							<block v-for="(item,index) in recruitInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateRecruit(item.recruit_id,0)"
								 style="border-radius: 30rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 30rpx;">
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
							<!-- </scroll-view> -->
						</view>
					</swiper-item>
				</swiper>
			</view>
			<loading v-if="loadingNext" class="animation-fade"></loading>
			<notification ref="notification" :isdistance="true"></notification>
		</scroll-view>
		<loading v-if="loadingItem" class="animation-fade fix-loading"></loading>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState
	} from 'vuex';
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	let qqmapsdk = new QQMapWX({
		key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
	});
	export default {
		data() {
			return {
				currentNav: 0,
				currentTab: 1,
				newsInfo: [],
				attentionInfo: [],
				articleInfo: [],
				activityInfo: [],
				recruitInfo: [],
				menu_list: ['关注', '活动', '动态', '招募'],
				scroll_height: 700,
				displayLocation: '',
				imageList: [],
				attention_height: 700,
				article_height: 700,
				activity_height: 700,
				recruit_height: 700,
				fixTabbar: false,
				tabbar_top: Vue.prototype.CustomBar,
				loadingItem: false,
				loading: true,
				attention_scroll: 1,
				activity_scroll: 1,
				article_scroll: 1,
				recruit_scroll: 1,
				page_scroll: 1,
				loadingNext: false,
				links: [],
				attentionCurrentPage: 1,
				activityCurrentPage: 1,
				articleCurrentPage: 1,
				recruitCurrentPage: 1,
				attentionComplete: false,
				activityComplete: false,
				articleComplete: false,
				recruitComplete: false,
			};
		},
		computed: {
			currentScrollHeight: function() {
				if (this.currentTab == 1) {
					return this.activity_height;
				} else if (this.currentTab == 2) {
					return this.article_height;
				} else if (this.currentTab == 3) {
					return this.recruit_height;
				} else {
					return this.attention_height;
				}
			}
		},
		mounted() {
			let that = this;
			setTimeout(() => {
				this.getHeight()
			}, 100)

			Vue.prototype.$http.request({
				url: '/information/recommend',
				method: 'POST',
			}).then(res => {
				this.newsInfo = res.data.data.news.data;
				for (let item in this.newsInfo) {
					for (let index in this.newsInfo[item].news_images) {
						this.imageList.push(this.newsInfo[item].news_images[index].image_url);
					}
				}
				this.attentionInfo = res.data.data.attentions.data;
				for (let item in this.attentionInfo) {
					for (let index in this.attentionInfo[item].article_images) {
						this.imageList.push(this.attentionInfo[item].article_images[index].image_url);
					}
				}
				for (let index in this.attentionInfo) {
					this.formatAttentionTime(index);
				}
				this.articleInfo = res.data.data.articles.data;
				for (let item in this.articleInfo) {
					for (let index in this.articleInfo[item].article_images) {
						this.imageList.push(this.articleInfo[item].article_images[index].image_url);
					}
				}
				for (let index in this.articleInfo) {
					this.formatArticleTime(index);
				}

				this.activityInfo = res.data.data.activities.data;
				for (let item in this.activityInfo) {
					for (let index in this.activityInfo[item].activity_images) {
						this.imageList.push(this.activityInfo[item].activity_images[index].image_url);
					}
				}
				for (let index in this.activityInfo) {
					this.formatActivityTime(index);
				}

				this.recruitInfo = res.data.data.recruits.data;
				for (let item in this.recruitInfo) {
					for (let index in this.recruitInfo[item].recruit_images) {
						this.imageList.push(this.recruitInfo[item].recruit_images[index].image_url);
					}
				}
				for (let index in this.recruitInfo) {
					this.formatRecruitTime(index);
				}
				this.loading = false;
			})
		},
		methods: {
			loadNextPage() {
				if (this.loadingNext) {
					return;
				}
				let currentPage = 0;
				if (this.currentTab == 1) {
					if (this.activityComplete) {
						return;
					}
					this.activityCurrentPage++;
					currentPage = this.activityCurrentPage;
				} else if (this.currentTab == 2) {
					if (this.articleComplete) {
						return;
					}
					this.articleCurrentPage++;
					currentPage = this.articleCurrentPage;
				} else if (this.currentTab == 3) {
					if (this.recruitComplete) {
						return;
					}
					this.recruitCurrentPage++;
					currentPage = this.recruitCurrentPage;
				} else {
					if (this.attentionComplete) {
						return;
					}
					this.attentionCurrentPage++;
					currentPage = this.attentionCurrentPage;
				}
				this.loadingNext = true;
				Vue.prototype.$http.request({
					url: '/information/recommend?page=' + currentPage,
					method: 'POST',
				}).then(res => {
					if (this.currentTab == 1) {
						if (res.data.data.activities.data.length == 0) {
							this.activityComplete = true;
							this.loadingNext = false;
							return;
						}
						this.activityInfo.push.apply(this.activityInfo, res.data.data.activities.data);
						for (let item = (currentPage - 1) * 10; item < this.activityInfo.length; item++) {
							for (let index in this.activityInfo[item].activity_images) {
								this.imageList.push(this.activityInfo[item].activity_images[index].image_url);
							}
							this.formatActivityTime(item);
						}
						setTimeout(() => {
							let query = uni.createSelectorQuery().in(this);
							query.select('#activity').boundingClientRect(res => {
								console.log(res)
								this.activity_height = res.height;
							}).exec();
						}, 30)
					} else if (this.currentTab == 2) {
						if (res.data.data.articles.data.length == 0) {
							this.articleComplete = true;
							this.loadingNext = false;
							return;
						}
						this.articleInfo.push.apply(this.articleInfo, res.data.data.articles.data);
						for (let item = (currentPage - 1) * 10; item < this.articleInfo.length; item++) {
							for (let index in this.articleInfo[item].article_images) {
								this.imageList.push(this.articleInfo[item].article_images[index].image_url);
							}
							this.formatArticleTime(item);
						}
						setTimeout(() => {
							let query = uni.createSelectorQuery().in(this);
							query.select('#article').boundingClientRect(res => {
								console.log(res)
								this.article_height = res.height;
							}).exec();
						}, 30)
					} else if (this.currentTab == 3) {
						if (res.data.data.recruits.data.length == 0) {
							this.recruitComplete = true;
							this.loadingNext = false;
							return;
						}
						this.recruitInfo.push.apply(this.recruitInfo, res.data.data.recruits.data);
						for (let item = (currentPage - 1) * 10; item < this.recruitInfo.length; item++) {
							for (let index in this.recruitInfo[item].recruit_images) {
								this.imageList.push(this.recruitInfo[item].recruit_images[index].image_url);
							}
							this.formatRecruitTime(item);
						}
						setTimeout(() => {
							let query = uni.createSelectorQuery().in(this);
							query.select('#recruit').boundingClientRect(res => {
								console.log(res)
								this.recruit_height = res.height;
							}).exec();
						}, 30)
					} else {
						if (res.data.data.attentions.data.length == 0) {
							this.attentionComplete = true;
							this.loadingNext = false;
							return;
						}
						this.attentionInfo.push.apply(this.attentionInfo, res.data.data.attentions.data);
						for (let item = (currentPage - 1) * 10; item < this.attentionInfo.length; item++) {
							for (let index in this.attentionInfo[item].article_images) {
								this.imageList.push(this.attentionInfo[item].article_images[index].image_url);
							}
							this.formatAttentionTime(item);
						}
						setTimeout(() => {
							let query = uni.createSelectorQuery().in(this);
							query.select('#attention').boundingClientRect(res => {
								console.log(res)
								this.attention_height = res.height;
							}).exec();
						}, 30)
					}
					this.loadingNext = false;
				})
			},
			pageScroll(e) {
				if (e.detail.scrollTop >= 50) {
					this.fixTabbar = true;
				} else {
					this.fixTabbar = false;
				}
				if (this.currentTab == 0) {
					this.attention_scroll = e.detail.scrollTop;
				} else if (this.currentTab == 1) {
					this.activity_scroll = e.detail.scrollTop;
				} else if (this.currentTab == 2) {
					this.article_scroll = e.detail.scrollTop;
				} else if (this.currentTab == 3) {
					this.recruit_scroll = e.detail.scrollTop;
				}
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
			getHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight;
						that.screen_width = res.windowWidth;
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that);
						query.select('#information').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top;
						}).exec();
					}
				});
			},
			navSelect(index) {
				this.currentNav = index;
				if (this.currentNav == 1) {
					setTimeout(() => {
						let query = uni.createSelectorQuery().in(this);
						query.select('#attention').boundingClientRect(res => {
							console.log(res)
							this.attention_height = res.height;
						}).exec();
						query.select('#article').boundingClientRect(res => {
							console.log(res)
							this.article_height = res.height;
						}).exec();
						query.select('#activity').boundingClientRect(res => {
							console.log(res)
							this.activity_height = res.height;
						}).exec();
						query.select('#recruit').boundingClientRect(res => {
							console.log(res)
							this.recruit_height = res.height;
						}).exec();
					}, 300)
				}
			},
			tabSelect(e) {
				this.currentTab = e.currentTarget.dataset.id;
				this.randomScrollHeight();
				this.setScrollHeight();
			},
			tabSwiper(e) {
				this.currentTab = e.detail.current;
				this.randomScrollHeight();
				this.setScrollHeight();
			},
			randomScrollHeight() {
				if (Boolean(Math.round(Math.random()))) {
					if (this.currentTab == 0) {
						this.attention_scroll += 1;
					} else if (this.currentTab == 1) {
						this.activity_scroll += 1;
					} else if (this.currentTab == 2) {
						this.article_scroll += 1;
					} else if (this.currentTab == 3) {
						this.recruit_scroll += 1;
					}
				} else {
					if (this.currentTab == 0) {
						this.attention_scroll -= 1;
					} else if (this.currentTab == 1) {
						this.activity_scroll -= 1;
					} else if (this.currentTab == 2) {
						this.article_scroll -= 1;
					} else if (this.currentTab == 3) {
						this.recruit_scroll -= 1;
					}
				}
			},
			setScrollHeight() {
				this.loadingItem = true;
				if (this.currentTab == 0) {
					this.page_scroll = this.attention_scroll;
				} else if (this.currentTab == 1) {
					this.page_scroll = this.activity_scroll;
				} else if (this.currentTab == 2) {
					this.page_scroll = this.article_scroll;
				} else if (this.currentTab == 3) {
					this.page_scroll = this.recruit_scroll;
				}
				setTimeout(() => {
					this.loadingItem = false
				}, 400);

			},
			formatAttentionTime(index) {
				let time = this.attentionInfo[index].article_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.attentionInfo[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.attentionInfo[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.attentionInfo[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.attentionInfo[index].article_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.attentionInfo[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.attentionInfo[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.attentionInfo[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.attentionInfo[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.attentionInfo[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.attentionInfo[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.attentionInfo[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.attentionInfo[index].display_time = this.attentionInfo[index].created_at;
					}
				}
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
						this.articleInfo[index].display_time = this.articleInfo[index].created_at;
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
						this.activityInfo[index].display_time = this.activityInfo[index].created_at;
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
						this.recruitInfo[index].display_time = this.recruitInfo[index].created_at;
					}
				}
			}
		}

	}
</script>

<style scoped src="./information.css">

</style>
