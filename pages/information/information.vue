<template>
	<view id="information">
		<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scroll="pageScroll"
		 :scroll-top="page_scroll" @scrolltolower="loadNextPage()">
			<scroll-view class="nav text-center" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true
			 :scroll-left="scroll_left">
				<view class="cu-item tab-item-container" :class="currentNav==0?'text-theme-color active-text-border':''" @click="navSelect(0)">头条</view>
				<view class="cu-item tab-item-container" :class="currentNav==1?'text-theme-color active-text-border':''" @click="navSelect(1)">动态</view>
				<view class="cu-item tab-item-container" :class="currentNav==2?'text-theme-color active-text-border':''" @click="navSelect(2)">话题</view>
			</scroll-view>
			<view class="animation-fade" v-if="currentNav == 0">
				<loading v-if="loading" class="animation-fade"></loading>
				<block v-for="(item,index) in newsInfo" v-bind:key="index">
					<view class="cu-card article bg-white shadow margin-top margin-left margin-bottom-xl margin-right" style="border-radius: 20rpx;"
					 @click="navigateNews(item.news_id)">
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
			</view>
			<view class="animation-fade" v-if="currentNav == 1">
				<view class="bg-white nav shadow max-width " style="border-bottom: 1px solid #c8c8c8;" id="tabbar" :class="fixTabbar?'fixTabbar':''"
				 :style="fixTabbar?'margin-top:-91rpx':''">
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
						<image src="../../static/article/no-attention.png" class="none-default-image" mode="widthFix" v-if="!loadingItem&&attentionInfo.length==0"
						 style="margin-bottom: 200px;"></image>
						<view class="padding-bottom-xl padding-top animation-fade" v-if="!loadingItem&&attentionInfo.length!=0" id="attention">
							<block v-for="(item,index) in attentionInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-bottom-xl margin-left margin-right" @click="navigateArticle(item.article_id,0)"
								 style="border-radius: 20rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 @click.stop="navigateUserShow(item.article_user.user_id)" style="border-radius: 20rpx;">
										<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.article_user.user_avatar">
										</image>
										<view class="flex-column justify-center">
											<text class="aricle-user-name margin-bottom-xs">{{item.article_user.user_name}}</text>
											<view>
												<text class="article-create-time">{{item.display_time}}</text>
												<text class="article-create-time margin-left" v-if="item.article_display_location&&item.article_user.user_school">来自{{item.article_user.user_school}}</text>
											</view>
										</view>
									</view>
									<view class="text-content padding-left padding-right  text-bold text-black margin-top-xs" v-if="item.article_title">
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
										<view class="operation-item flex align-center justify-center" @click.stop="likeAttention(index,item.article_id)">
											<text class="cuIcon-appreciatefill text-theme-color operation-icon" v-if="item.article_like"></text>
											<text class="cuIcon-appreciate text-theme-color operation-icon" v-else></text>
											<text class="text-theme-color">{{item.article_likes}}</text>
										</view>
										<view class="operation-item flex align-center justify-center" @click.stop="navigateArticle(item.article_id,1)">
											<text class="cuIcon-comment text-theme-color operation-icon"></text>
											<text class="text-theme-color">{{item.article_comments_count}}</text>
										</view>
										<button class="operation-item flex align-center justify-center icon-button" open-type="share">
											<text class="cuIcon-share text-theme-color operation-icon"></text>
											<text class="text-theme-color">分享</text>
										</button>
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
								 style="border-radius: 20rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 20rpx;" @click.stop="navigateUserShow(item.activity_user.user_id)">
										<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.activity_user.user_avatar">
										</image>
										</image>
										<view class="flex-column justify-center">
											<text class="aricle-user-name margin-bottom-xs">{{item.activity_user.user_name}}</text>
											<view>
												<text class="article-create-time">{{item.display_time}}</text>
												<text class="article-create-time margin-left" v-if="item.activity_user.user_school">来自{{item.activity_user.user_school}}</text>
											</view>
										</view>
									</view>
									<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs">
										{{item.activity_name}}
									</view>
									<view class="text-content padding-left padding-right margin-bottom activity_content">
										<text decode="true">{{item.activity_content}}</text>
									</view>
									<view class="text-content padding-left padding-right margin-bottom-xs text-bold text-black margin-top-xs" v-if="item.activity_attention">
										注意事项
									</view>
									<view class="text-content padding-left padding-right margin-bottom activity_attention" v-if="item.activity_attention">
										<text decode="true">{{item.activity_attention}}</text>
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
										<button class="operation-item flex align-center justify-center icon-button" open-type="share">
											<text class="cuIcon-share text-theme-color operation-icon"></text>
											<text class="text-theme-color">分享</text>
										</button>
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
								 style="border-radius: 20rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 20rpx;" @click.stop="navigateUserShow(item.article_user.user_id,item.article_anonymity)">
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

												<text class="article-create-time margin-left" v-if="item.article_display_location&&item.article_user.user_school">来自{{item.article_user.user_school}}</text>
											</view>
										</view>
									</view>
									<view class="text-content padding-left padding-right text-bold text-black margin-top-xs" v-if="item.article_title">
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
										<button class="operation-item flex align-center justify-center icon-button" open-type="share">
											<text class="cuIcon-share text-theme-color operation-icon"></text>
											<text class="text-theme-color">分享</text>
										</button>
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
								 style="border-radius: 20rpx;">
									<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white"
									 style="border-radius: 20rpx;" @click.stop="navigateUserShow(item.recruit_user.user_id)">
										<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.recruit_user.user_avatar">
										</image>
										<view class="flex-column justify-center">
											<text class="aricle-user-name margin-bottom-xs">{{item.recruit_user.user_name}}</text>
											<view>
												<text class="article-create-time">{{item.display_time}}</text>
												<text class="article-create-time margin-left" v-if="item.recruit_display_location&&item.recruit_user.user_school">来自{{item.recruit_user.user_school}}</text>
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
										<text decode="true">{{item.recruit_content}}</text>
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
										<button class="operation-item flex align-center justify-center icon-button" open-type="share">
											<text class="cuIcon-share text-theme-color operation-icon"></text>
											<text class="text-theme-color">分享</text>
										</button>
									</view>
								</view>
							</block>
							<!-- </scroll-view> -->
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="animation-fade" v-if="currentNav == 2">
				<view class="bg-white nav shadow max-width " style="border-bottom: 1px solid #c8c8c8;">
					<view class="max-width flex align-center justify-center" style="height: 90rpx;">
						<view class="tab-item-width text-center select-container" v-for="(item,index) in topic_list" :key="index" @tap="topicTabSelect"
						 :data-id="index" style="width: 30%; margin: auto;">
							<text class="tab-item-text" :class="index==currentTopicTab?'item-select-container':''" :data-id="index">{{item}}</text>
						</view>
					</view>
				</view>
				<swiper :duration="400" class="discovery-swiper" id="topicSwiper" :current="currentTopicTab" @change="topicTabSwiper"
				 :style="{height:topic_scroll_height +'px'}">
					<swiper-item>
						<scroll-view scroll-y :style="{height:topic_scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextTopic('topic')">
							<block v-for="(item,index) in topicInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white padding-top margin-top-xl margin-left margin-right" @click="navigateTopic(item.topic_id)"
								 style="border-radius: 20rpx; min-height: 200rpx;">
									<view class="text-content padding-left padding-right text-bold text-black margin-top-xs text-cut" style="font-size: 30rpx;"
									 v-if="item.topic_title">
										{{item.topic_title}}
									</view>
									<view class="text-content padding-left padding-right margin-top margin-bottom activity_content" style="font-size: 24rpx!important; line-height: 40rpx;">
										<text decode="true">{{item.topic_content}}</text>
									</view>
									<view class="grid flex-sub padding-lr col-3 grid-square margin-bottom padding-bottom-sm">
										<block v-for="(imgItem,index) in item.topic_images" :key="index">
											<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
											 :data-url="imgItem.image_url">
											</view>
										</block>
									</view>
									<view class="max-width flex align-center justify-between">
										<view class="article-create-time padding-left" style="position: relative; bottom: 30rpx;">{{item.topic_created}}</view>
										<view class="article-create-time" style="position: relative; right: 30rpx; bottom: 30rpx;">
											<text class="commodity-other-info margin-right-sm">回答 ·<text class="margin-left-xs">{{item.topic_answer_count}}</text></text>
											<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{item.topic_views}}</text></text>
										</view>
									</view>
								</view>
							</block>
							<loading v-if="loading"></loading>
							<view class="cu-tabbar-height tabbar-height"></view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y :style="{height:topic_scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextAnswer">
							<block v-for="(item,index) in answerInfo" v-bind:key="index">
								<view class="cu-item shadow bg-white margin-top-xl margin-left margin-right" @click="navigateAnswer(item.answer_id)"
								 style="border-radius: 20rpx; min-height: 200rpx;">
									<view class="max-width margin-bottom padding-left text-bold text-black flex justify-between" style="height: 100rpx; line-height: 100rpx; border-bottom: 1rpx solid #EEEEEE; font-size: 30rpx;"
									 @click.stop="navigateTopic(item.answer_topic.topic_id)">
										<view>{{item.answer_topic.topic_title}}</view>
										<view class="cuIcon-right padding-right" style="text-align: right;"></view>
									</view>
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
											<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage"
											 :data-url="imgItem.image_url">
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
							<view class="cu-tabbar-height tabbar-height"></view>
						</scroll-view>
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
				currentTopicTab: 0,
				newsInfo: [],
				attentionInfo: [],
				articleInfo: [],
				activityInfo: [],
				recruitInfo: [],
				topicInfo: [],
				answerInfo: [],
				topicLinks: {},
				answerLinks: {},
				menu_list: ['关注', '活动', '动态', '招募'],
				topic_list: ['热门话题', '热门回答'],
				scroll_height: 700,
				topic_scroll_height: 600,
				displayLocation: '',
				imageList: [],
				attention_height: 500,
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
				newsCurrentPage: 1,
				attentionCurrentPage: 1,
				activityCurrentPage: 1,
				articleCurrentPage: 1,
				recruitCurrentPage: 1,
				newsComplete: false,
				attentionComplete: false,
				activityComplete: false,
				articleComplete: false,
				recruitComplete: false,
				topicLoadOver: false,
				answerLoadOver: false,
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
		onShareAppMessage(res) {
			return {
				title: '快来围观微校～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
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
					this.formatAttentionContent(item);
					this.formatAttentionTime(item);
				}
				this.articleInfo = res.data.data.articles.data;
				for (let item in this.articleInfo) {
					for (let index in this.articleInfo[item].article_images) {
						this.imageList.push(this.articleInfo[item].article_images[index].image_url);
					}
					this.formatArticleContent(item);
					this.formatArticleTime(item);
				}

				this.activityInfo = res.data.data.activities.data;
				for (let item in this.activityInfo) {
					for (let index in this.activityInfo[item].activity_images) {
						this.imageList.push(this.activityInfo[item].activity_images[index].image_url);
					}
					this.formatActivityContent(item);
					this.formatActivityTime(item);
				}

				this.recruitInfo = res.data.data.recruits.data;
				for (let item in this.recruitInfo) {
					for (let index in this.recruitInfo[item].recruit_images) {
						this.imageList.push(this.recruitInfo[item].recruit_images[index].image_url);
					}
					this.formatRecruitContent(item);
					this.formatRecruitTime(item);
				}
				this.loading = false;
			})
		},
		methods: {
			loadNextAnswer() {
				if (this.answerLoadOver || this.loading) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: this.answerLinks.next,
					method: 'POST',
				}).then(res => {
					this.answerLinks = res.data.links;
					this.answerInfo.push.apply(this.answerInfo, res.data.data);
					for (let item = (res.data.meta.current_page - 1) * 10; item < this.answerInfo.length; item++) {
						for (let index in this.answerInfo[item].answer_images) {
							this.imageList.push(this.answerInfo[item].answer_images[index].image_url);
						}
						this.formatAnswerContent(item);
					}
					if (res.data.meta.current_page == res.data.meta.last_page) {
						this.answerLoadOver = true;
					}
					this.loading = false;
				})
			},
			loadNextTopic() {
				if (this.topicLoadOver || this.loading) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: this.topicLinks.next,
					method: 'POST',
				}).then(res => {
					this.topicLinks = res.data.links;
					this.topicInfo.push.apply(this.topicInfo, res.data.data);
					for (let item = (res.data.meta.current_page - 1) * 10; item < this.topicInfo.length; item++) {
						for (let index in this.topicInfo[item].topic_images) {
							this.imageList.push(this.topicInfo[item].topic_images[index].image_url);
						}
						this.formatTopicContent(item);
					}
					if (res.data.meta.current_page == res.data.meta.last_page) {
						this.topicLoadOver = true;
					}
					this.loading = false;
				})
			},
			requestRecomendTopic() {
				if (this.topicInfo.length != 0) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: '/topics/recommend',
					method: 'POST',
				}).then(res => {
					this.topicInfo = res.data.data;
					this.topicLinks = res.data.links;
					for (let item in this.topicInfo) {
						for (let index in this.topicInfo[item].topic_images) {
							this.imageList.push(this.topicInfo[item].topic_images[index].image_url);
						}
						this.formatTopicContent(item);
					}
					this.loading = false;
				})
			},
			requestRecomendAnswer() {
				if (this.answerInfo.length != 0) {
					return;
				}
				this.loading = true;
				Vue.prototype.$http.request({
					url: '/answers/recommend',
					method: 'POST',
				}).then(res => {
					this.answerInfo = res.data.data;
					this.answerLinks = res.data.links;
					for (let item in this.answerInfo) {
						for (let index in this.answerInfo[item].answer_images) {
							this.imageList.push(this.answerInfo[item].answer_images[index].image_url);
						}
						this.formatAnswerContent(item);
					}
					this.loading = false;
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
			formatTopicContent(index) {
				this.topicInfo[index].topic_content = this.topicInfo[index].topic_content.replace(/<br\/\>/g, "\n");
			},
			formatAnswerContent(index) {
				this.answerInfo[index].answer_content = this.answerInfo[index].answer_content.replace(/<br\/\>/g, "\n");
			},
			formatArticleContent(index) {
				this.articleInfo[index].article_content = this.articleInfo[index].article_content.replace(/<br\/\>/g, "\n");
			},
			formatActivityContent(index) {
				this.activityInfo[index].activity_content = this.activityInfo[index].activity_content.replace(/<br\/\>/g, "\n");
				if (this.activityInfo[index].activity_attention) {
					this.activityInfo[index].activity_attention = this.activityInfo[index].activity_attention.replace(/<br\/\>/g, "\n");
				}
			},
			formatRecruitContent(index) {
				this.recruitInfo[index].recruit_content = this.recruitInfo[index].recruit_content.replace(/<br\/\>/g, "\n");
			},
			formatAttentionContent(index) {
				this.attentionInfo[index].article_content = this.attentionInfo[index].article_content.replace(/<br\/\>/g, "\n");
			},
			loadNextPage() {
				if (this.loadingNext) {
					return;
				}
				let currentPage = 0;
				if (this.currentNav == 1) {
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
								this.formatActivityContent(item);
							}
							setTimeout(() => {
								let query = uni.createSelectorQuery().in(this);
								query.select('#activity').boundingClientRect(res => {
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
								this.formatArticleContent(item);
							}
							setTimeout(() => {
								let query = uni.createSelectorQuery().in(this);
								query.select('#article').boundingClientRect(res => {
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
								this.formatRecruitContent(item);
							}
							setTimeout(() => {
								let query = uni.createSelectorQuery().in(this);
								query.select('#recruit').boundingClientRect(res => {
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
								this.formatAttentionContent(item);
							}
							setTimeout(() => {
								let query = uni.createSelectorQuery().in(this);
								query.select('#attention').boundingClientRect(res => {
									this.attention_height = res.height;
								}).exec();
							}, 30)
						}
						this.loadingNext = false;
					})
				} else {
					if (this.newsComplete) {
						return;
					}
					this.newsCurrentPage++;
					currentPage = this.newsCurrentPage;
					this.loadingNext = true;
					Vue.prototype.$http.request({
						url: '/information/recommend?page=' + currentPage,
						method: 'POST',
					}).then(res => {
						if (res.data.data.news.data.length == 0) {
							this.newsComplete = true;
							this.loadingNext = false;
							return;
						}
						this.newsInfo.push.apply(this.newsInfo, res.data.data.news.data);
						for (let item = (currentPage - 1) * 10; item < this.newsInfo.length; item++) {
							for (let index in this.newsInfo[item].news_images) {
								this.imageList.push(this.newsInfo[item].news_images[index].image_url);
							}
						}
						this.loadingNext = false;
					})
				}
			},
			pageScroll(e) {
				if (this.currentNav == 1) {
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
				}
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
			navigateTopic(topic_id) {
				uni.navigateTo({
					url: '/pages/topic/topic?topic_id=' + topic_id
				})
			},
			navigateAnswer(answer_id) {
				uni.navigateTo({
					url: '/pages/answer/answer?answer_id=' + answer_id
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
			getTopicHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight;
						that.screen_width = res.windowWidth;
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that);
						query.select('#topicSwiper').boundingClientRect(res => {
							that.topic_scroll_height = that.screen_height - res.top - 25;
						}).exec();
					}
				});
			},
			navSelect(index) {
				this.currentNav = index;
				if (this.currentNav == 1) {
					setTimeout(() => {
						let query = uni.createSelectorQuery().in(this);

						query.select('#article').boundingClientRect(res => {
							this.article_height = res.height;
						}).exec();
						query.select('#activity').boundingClientRect(res => {
							this.activity_height = res.height;
						}).exec();
						query.select('#recruit').boundingClientRect(res => {
							this.recruit_height = res.height;
						}).exec();
						query.select('#attention').boundingClientRect(res => {
							if (res) {
								this.attention_height = res.height;
							}
						}).exec();
					}, 300)
				} else if (this.currentNav == 2) {
					this.requestRecomendTopic();
					setTimeout(() => {
						this.getTopicHeight();
					}, 200);
					this.requestRecomendAnswer();
				}
			},
			topicTabSelect(e) {
				this.currentTopicTab = e.currentTarget.dataset.id;
				// this.randomScrollHeight();
				// this.setScrollHeight();
				this.getTopicHeight();
			},
			topicTabSwiper(e) {
				this.currentTopicTab = e.detail.current;
				// this.randomScrollHeight();
				// this.setScrollHeight();
				this.getTopicHeight();
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
						this.attentionInfo[index].display_time = this.attentionInfo[index].article_created;
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
			}
		}

	}
</script>

<style scoped src="./information.css">

</style>
