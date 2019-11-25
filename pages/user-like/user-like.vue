<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Like</block>
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
		<swiper :duration="400" class="discovery-swiper" id="swiper" :current="TabCur" @change="tabSwiper">
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl">
					<block class="swiper-item swiper-item-container margin-bottom" v-for="(item, index) in articleInfo" v-bind:key="index">
						<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateArticle(item.article_id,0)"
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
					<loading v-if="loading"></loading>
					<view class="cu-tabbar-height tabbar-height"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
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
				TabCur: 0,
				menu_list: ['活动', '动态', '头条', '商品', '招募'],
				scroll_left: 0,
				screen_width: 400,
				scroll_height: 600,
				articleInfo: [],
				activityInfo: [],
				recruitInfo: [],
				newsInfo: [],
				commodityInfo: [],
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onLoad(option) {
			this.user_id = option.user_id;
			
			Vue.prototype.$http.request({
				url: '/users/like',
				method: 'POST',
				params: {
					user_id: this.user.user_id,
				},
			}).then(res => {
				this.articleInfo = res.data.data.articles;
				this.activityInfo = res.data.data.activities;
				this.recruitInfo = res.data.data.recruits;
				this.newsInfo = res.data.data.news;
				this.commodityInfo = res.data.data.commodities;
			})
			this.getHeight();
		},
		methods: {
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
		}
	}
</script>

<style src="./user-like.css">
</style>
