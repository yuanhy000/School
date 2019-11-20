<template>
	<view id="information">
		<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scroll="pageScroll">
			<scroll-view class="nav text-center" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true
			 :scroll-left="scroll_left">
				<view class="cu-item tab-item-container" :class="currentNav==0?'text-theme-color active-text-border':''" @click="navSelect(0)">头条</view>
				<view class="cu-item tab-item-container" :class="currentNav==1?'text-theme-color active-text-border':''" @click="navSelect(1)">动态</view>
			</scroll-view>
			<view class="animation-fade" style="height: 700rpx; background-color: #405E72;" v-if="currentNav == 0">
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
				<swiper :duration="400" class="discovery-swiper" id="swiper" :current="currentTab" @change="tabSwiper" circular=true
				 :style="{height:article_height +'px'}">
					<swiper-item style="height: 400rpx; background-color: #DD5044;">
					</swiper-item>
					<swiper-item style="height: 400rpx; background-color: #405E72;">
					</swiper-item>

					<swiper-item>
						<!-- <scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl"> -->
						<view class="padding-bottom-xl" id="article">
							<block v-for="(item,index) in articleInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl" @click="navigateArticle(item.article_id)">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white">
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
									<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs">
										{{item.article_title}}
									</view>
									<view class="text-content padding-left padding-right margin-bottom">
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
										<view class="operation-item flex align-center justify-center">
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

					<swiper-item style="height: 400rpx; background-color: #4C8BF5;">
					</swiper-item>
				</swiper>
			</view>
			<notification ref="notification" :isdistance="true"></notification>
		</scroll-view>
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
				currentNav: 1,
				currentTab: 2,
				articleInfo: [],
				activityInfo: [],
				menu_list: ['关注', '活动', '动态', '招募'],
				scroll_height: 700,
				displayLocation: '',
				imageList: [],
				article_height: 700,
				fixTabbar: false,
				tabbar_top: Vue.prototype.CustomBar,
			};
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
				this.articleInfo = res.data.data.articles.data;
				for (let item in this.articleInfo) {
					for (let index in this.articleInfo[item].article_images) {
						this.imageList.push(this.articleInfo[item].article_images[index].image_url);
					}
				}
				for (let index in this.articleInfo) {
					this.formatTime(index);
				}
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(that);
					query.select('#article').boundingClientRect(res => {
						console.log(res)
						that.article_height = res.height;
					}).exec();
				}, 300)
			})
		},
		methods: {
			pageScroll(e) {
				if (e.detail.scrollTop >= 50) {
					this.fixTabbar = true;
				} else {
					this.fixTabbar = false;
				}
			},
			navigateArticle(article_id) {
				uni.navigateTo({
					url: '/pages/article/article?article_id=' + article_id
				})
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
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
			},
			tabSelect(e) {
				this.currentTab = e.currentTarget.dataset.id;
				// this.scroll_left = (e.currentTarget.dataset.id - 1) * (this.screen_width / 4);
			},
			tabSwiper(e) {
				this.currentTab = e.detail.current;
				// this.scroll_left = (this.TabCur - 1) * (this.screen_width / 4);
			},
			formatTime(index) {
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
			}
		}

	}
</script>

<style scoped src="./information.css">

</style>
