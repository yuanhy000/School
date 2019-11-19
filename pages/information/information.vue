<template>
	<view>
		<scroll-view class="nav text-center" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true
		 :scroll-left="scroll_left">
			<view class="cu-item tab-item-container" :class="currentNav==0?'text-theme-color active-text-border':''" @click="navSelect(0)">
				头条
			</view>
			<view class="cu-item tab-item-container" :class="currentNav==1?'text-theme-color active-text-border':''" @click="navSelect(1)">
				动态
			</view>
		</scroll-view>
		<view class="animation-fade" style="height: 700rpx; background-color: #405E72;" v-if="currentNav == 0">
		</view>
		<view class="animation-fade" v-else>
			<scroll-view class="bg-white nav shadow" style="border-bottom: 1px solid #c8c8c8;" scroll-x scroll-with-animation=true>
				<view class="max-width flex align-center" style="height: 90rpx;">
					<view class="tab-item-width text-center select-container" v-for="(item,index) in menu_list" :key="index" @tap="tabSelect"
					 :data-id="index" style="width: 25%;">
						<text class="tab-item-text" :class="index==currentTab?'item-select-container':''" :data-id="index">{{item}}</text>
					</view>
				</view>
			</scroll-view>
			<swiper :duration="400" class="discovery-swiper" id="swiper" :current="currentTab" @change="tabSwiper" circular=true>
				<swiper-item style="height: 400rpx; background-color: #DD5044;">
				</swiper-item>
				<swiper-item style="height: 400rpx; background-color: #405E72;">
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl">
					</scroll-view>
				</swiper-item>
				<swiper-item style="height: 400rpx; background-color: #4C8BF5;">
				</swiper-item>
			</swiper>
		</view>
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
				currentNav: 1,
				currentTab: 1,
				menu_list: ['关注', '活动', '动态', '招募'],
				scroll_height: 700,
			};
		},
		mounted() {
			setTimeout(() => {
				this.getHeight()
			}, 100)

			Vue.prototype.$http.request({
				url: '/information/recommend',
				method: 'POST',
			}).then(res => {
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
						query.select('#swiper').boundingClientRect(res => {
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
		}

	}
</script>

<style scoped src="./information.css">

</style>
