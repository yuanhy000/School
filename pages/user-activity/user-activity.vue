<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">User-Activity</block>
		</cu-custom>
		<scroll-view scroll-y :style="{height:scroll_height +'px'}">
			<view id="scroll">
				<loading v-if="loading" class="animation-fade"></loading>
				<block v-for="(item,index) in teamInfo" v-bind:key="index" v-else>
					<view class="cu-item shadow bg-white margin-top margin-left margin-right animation-fade" style="border-radius: 20rpx;">
						<view class="text-content padding-left padding-right padding-top text-bold text-theme-color">
							#{{item.team_activity.activity_name}}#
						</view>
						<view class="article-create-time margin-left padding-top-xs">
							<span class="margin-right-sm">{{item.team_activity.activity_created}}</span>{{item.team_activity.activity_organization}}
						</view>
						<view class="text-content padding-left padding-right padding-top-sm activity_content">
							{{item.team_activity.activity_content}}
						</view>
						<view class="grid flex-sub padding-lr col-3 grid-square margin-top-sm">
							<block v-for="(imgItem,index) in item.team_activity.activity_images" :key="index">
								<view class="bg-img" :style="{backgroundImage: 'url('+imgItem.image_url+')'}" @click.stop="viewImage" :data-url="imgItem.image_url">
								</view>
							</block>
						</view>
						<view class="team-title text-content margin-left padding-top">
							<sapn class="margin-right-xs">报名队伍: </sapn>{{item.team_name}}
						</view>
						<view class="cu-list menu" style="border-radius: 20rpx;">
							<block v-for="(item,index) in item.team_member" v-bind:key="index">
								<view class="cu-item animation-fade  ">
									<view class="flex max-width align-center">
										<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="item.user_avatar">
										</image>
										<view class="margin-right user-info-font text-bold text-black">
											{{item.user_name}}
										</view>
										<view class="margin-right user-info-font">
											用户ID: {{item.user_number}}
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>
			<view class="max-width" style="height: 50rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				user_id: 0,
				teamInfo: [],
				scroll_height: 700,
				loading: false,
				imageList: [],
			}
		},
		onLoad(option) {
			this.user_id = option.user_id;
			this.loading = true;
			Vue.prototype.$http.request({
				url: '/users/activity',
				method: 'POST',
				params: {
					user_id: this.user_id,
				},
			}).then(res => {
				this.teamInfo = res.data.data;
				for (let item in this.teamInfo) {
					for (let index in this.teamInfo[item].team_activity.activity_images) {
						this.imageList.push(this.teamInfo[item].team_activity.activity_images[index].image_url);
					}
					this.teamInfo[item].team_activity.activity_content = this.teamInfo[item].team_activity.activity_content.replace(
						/<br\/\>/g, "\n");
				}
				this.getHeight();
				this.loading = false;
			})
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
						query.select('#scroll').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top;
						}).exec();
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style src="./user-activity.css">
</style>
