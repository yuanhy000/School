<template>
	<view class="commodity-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">商品详情</block>
		</cu-custom>
		<scroll-view class="animation-fade" scroll-y id="scroll" :style="{height:scroll_height +'px'}" v-show="display"
		 @click="cancelInput">
			<view>
				<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500">
					<swiper-item v-for="(item,index) in commodityInfo.commodity_images" :key="index" @click="viewImage" :data-url="commodityInfo.commodity_images[index].image_url">
						<image :src="item.image_url" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="padding-top-sm padding-bottom-sm padding-left padding-right flex align-center info-border-bottom bg-white">
					<image class="cu-avatar lg avatar-shadow margin-right" style="border-radius: 20rpx;" :src="commodityInfo.commodity_user.user_avatar">
					</image>
					<view class="flex-column ">
						<text class="view-user-name">{{commodityInfo.commodity_user.user_name}}</text>
						<text class="view-user-location">发布于{{displayLocation}}</text>
					</view>
				</view>
				<view class="padding-top padding-bottom-sm padding-left padding-right flex align-center bg-white">
					<view class="flex-column ">
						<text class="price-text margin-bottom-sm">¥<text style="font-size: 42rpx;margin-left: 6rpx;">{{commodityInfo.commodity_price}}</text></text>
						<text class="commodity-name margin-bottom-sm">{{commodityInfo.commodity_name}}</text>
						<text class="commodity-description" decode="true">{{commodityInfo.commodity_description}}</text>
					</view>
				</view>
				<view class="commodity-image-container flex-column align-center bg-white info-border-bottom padding-left padding-right padding-bottom-sm">
					<view v-for="(item,index) in commodityInfo.commodity_images" :key="index" @click="viewImage" :data-url="commodityInfo.commodity_images[index].image_url"
					 class="max-width">
						<image :src="item.image_url" class="commodity-image margin-bottom-sm" mode="widthFix"></image>
					</view>
					<view class="flex align-center max-width justify-end padding-bottom-xs padding-top-xs">
						<text class="commodity-other-info margin-right-sm">超赞 ·<text class="margin-left-xs">{{commodityInfo.commodity_likes}}</text></text>
						<text class="commodity-other-info">浏览 ·<text class="margin-left-xs">{{commodityInfo.commodity_views}}</text></text>
					</view>
				</view>
				<view class="padding-top padding-left padding-right flex align-center bg-white margin-top flex-column">
					<view class="comment-container-title info-border-bottom">
						<text>全部留言</text>
					</view>
					<image src="../../static/commodity/none-default.png" class="none-default-image" mode="widthFix" v-if="!hasComment"></image>
					<view class="flex-column max-width padding-top-xs" v-else>
						<block v-for="(item,index) in commodityInfo.commodity_comments" :key="index">
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
						 v-if="commodityInfo.commodity_comments.length > comment_page*4">
							<text class="text-theme-color" style="font-weight: 700;">加载更多留言<text class="cuIcon-unfold margin-left-xs"></text></text>
						</view>
					</view>
				</view>
				<view class="padding-top-xs padding-bottom-sm padding-left padding-right margin-top flex align-center justify-center">
					<view class="left"></view>
					<view class="margin-left margin-right">
						<text class="cuIcon-like margin-right-xs text-theme-color commodity-recommend-title"></text>
						<text class="text-theme-color commodity-recommend-title">猜你喜欢</text>
					</view>
					<view class="right"></view>
				</view>
				<waterfall-flow :list="commodityInfo.commodity_recommend" @click="navigateCommodity" :align="true" :init="initList"></waterfall-flow>
			</view>
		</scroll-view>
		<view class="cu-bar padding-right bg-white info-border-top animation-fade-quick max-width" v-show="display" style="position: fixed;"
		 :style="{bottom: fixedHeight+'px'}">
			<view class="flex">
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="likeCommodity">
					<text class="cuIcon-appreciatefill text-theme-color commodity-icon animation-fade-quick" v-if="commodityInfo.commodity_like"></text>
					<text class="cuIcon-appreciate text-theme-color commodity-icon animation-fade-quick" v-else></text>
					<text class="text-xs text-theme-color padding-top-xs">超赞</text>
				</view>
				<view class="action flex-column align-center padding-right-xl icon-button" v-if="!isInput" @click="CollectCommodity">
					<text class="cuIcon-favorfill text-theme-color commodity-icon animation-fade-quick" v-if="commodityInfo.commodity_collect"></text>
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
			<!-- 			<button class="cu-btn bg-theme-green-black shadow-blur text-white text-sm animation-fade-quick" v-if="!isInput">私聊</button> -->
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
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import WaterfallFlow from '../../components/waterfall-flow/waterfall-flow.vue';
	let qqmapsdk = new QQMapWX({
		key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
	});
	export default {
		data() {
			return {
				display: false,
				commodity_id: 0,
				scroll_height: 700,
				commodityInfo: [],
				imageList: [],
				displayLocation: '',
				isInput: false,
				inputComment: '',
				comment_page: 1,
				showToast: false,
				toastContent: '',
				fixedHeight: 0,
			}
		},
		components: {
			WaterfallFlow: WaterfallFlow
		},
		computed: {
			hasComment: function() {
				if (this.commodityInfo.length != 0) {
					return this.commodityInfo.commodity_comments.length != 0;
				}
				return false;
			},
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onShareAppMessage(res) {
			return {
				title: '这个商品很不错，快来围观',
				path: '/pages/commodity/commodity?commodity_id=' + this.commodity_id
			}
		},
		onLoad(option) {
			this.commodity_id = option.commodity_id;
			let that = this;
			Vue.prototype.$http.request({
				url: '/commodities/detail',
				method: 'POST',
				params: {
					commodity_id: this.commodity_id
				},
			}).then(res => {
				this.commodityInfo = res.data.data;
				for (let item in this.commodityInfo.commodity_images) {
					this.imageList.push(this.commodityInfo.commodity_images[item].image_url);
				}
				for (let index in this.commodityInfo.commodity_comments) {
					this.formatTime(index);
				}
				let location = this.commodityInfo.commodity_location.split(',')
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: location[0],
						longitude: location[1]
					},
					success(res) {
						that.displayLocation = res.result.address_component.city + res.result.address_component.district;
					}
				})
			});
		},
		mounted() {
			setTimeout(() => {
				this.display = true;
			}, 100)
			setTimeout(() => {
				this.getHeight();
			}, 200);
		},
		methods: {
			changeFixedHeight(e) {
				this.fixedHeight = e.detail.height;
			},
			hideModal(e) {
				this.showToast = false;
			},
			formatCommodityContent() {
				this.commodityInfo.commodity_description = this.commodityInfo.commodity_description.replace(/<br\/\>/g, "\n");
			},
			navigateCommodity(commodity_id) {
				uni.navigateTo({
					url: '/pages/commodity/commodity?commodity_id=' + commodity_id
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
					this.commodityInfo.commodity_comments[index].comment_like = !this.commodityInfo.commodity_comments[index].comment_like;
					if (this.commodityInfo.commodity_comments[index].comment_like) {
						this.commodityInfo.commodity_comments[index].comment_likes++;
					} else {
						this.commodityInfo.commodity_comments[index].comment_likes--;
					}
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			likeCommodity() {
				Vue.prototype.$http.request({
					url: '/likes/commodity',
					method: 'POST',
					params: {
						commodity_id: this.commodity_id,
					},
				}).then(res => {
					this.commodityInfo.commodity_like = !this.commodityInfo.commodity_like;
					if (this.commodityInfo.commodity_like) {
						this.commodityInfo.commodity_likes++;
					} else {
						this.commodityInfo.commodity_likes--;
					}
					this.$refs.notification.open({
						type: 'success',
						content: '操作成功',
						timeout: 1500,
						isClick: false
					});
				})
			},
			CollectCommodity() {
				Vue.prototype.$http.request({
					url: '/collections/commodity',
					method: 'POST',
					params: {
						commodity_id: this.commodity_id,
					},
				}).then(res => {
					this.commodityInfo.commodity_collect = !this.commodityInfo.commodity_collect;
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
					url: '/comments/commodity/create',
					method: 'POST',
					params: {
						commodity_id: this.commodity_id,
						comment_content: this.inputComment,
						parent_id: 0
					},
				}).then(res => {
					this.commodityInfo.commodity_comments.unshift(res.data.data);
					this.formatTime(0);
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
			formatTime(index) {
				let time = this.commodityInfo.commodity_comments[index].comment_created.split(' ');
				let currentTime = new Date().toLocaleDateString();
				let differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
				let differenceWeekDay = 7 - differenceDay;
				if (differenceDay === 0) {
					this.commodityInfo.commodity_comments[index].display_time = '今天 ' + time[1];
				} else if (differenceDay === 1) {
					this.commodityInfo.commodity_comments[index].display_time = '昨天 ' + time[1];
				} else if (differenceDay === 2) {
					this.commodityInfo.commodity_comments[index].display_time = '前天 ' + time[1];
				} else {
					if (differenceWeekDay > 0) {
						let targetWeekDay = new Date(this.commodityInfo.commodity_comments[index].comment_created).getDay();
						switch (targetWeekDay) {
							case 0:
								this.commodityInfo.commodity_comments[index].display_time = '星期天 ' + time[1];
								break;
							case 1:
								this.commodityInfo.commodity_comments[index].display_time = '星期一 ' + time[1];
								break;
							case 2:
								this.commodityInfo.commodity_comments[index].display_time = '星期二 ' + time[1];
								break;
							case 3:
								this.commodityInfo.commodity_comments[index].display_time = '星期三 ' + time[1];
								break;
							case 4:
								this.commodityInfo.commodity_comments[index].display_time = '星期四 ' + time[1];
								break;
							case 5:
								this.commodityInfo.commodity_comments[index].display_time = '星期五 ' + time[1];
								break;
							case 6:
								this.commodityInfo.commodity_comments[index].display_time = '星期六 ' + time[1];
								break;
						}
					} else {
						this.commodityInfo.commodity_comments[index].display_time = this.commodityInfo.commodity_comments[index].comment_created;
					}
				}
			}
		}
	}
</script>

<style src="./commodity.css">
</style>
