<template>
	<view class="discovery-container">
		<view class="cu-bar search bg-white flex justify-center align-center">
			<button class="cu-btn bg-f5-white round  shadow  margin-left" @click="navigateLocation" v-if="display_location">
				<text class="location-icon-size text-theme-color cuIcon-locationfill"></text>
				<text class=" margin-left-xs location-text-color text-sm"> {{userLocation}}</text>
			</button>
			<button class="cu-btn search-form round shadow bg-white flex justify-start" @click="navigateSearch">
				<text class="cuIcon-search"></text>
				<!-- <input @click="navigateSearch" :adjust-position="false" type="text" placeholder="请输入关键词搜索" confirm-type="search"></input> -->
				<text class="text-sm location-text-color">请输入关键词搜索</text>
			</button>
		</view>
		<!-- <search :showWant="true"></search> -->
		<scroll-view class="bg-white nav" scroll-x scroll-with-animation=true>
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-theme-color active-text-border':''" v-for="(item,index) in menu_list"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<swiper :duration="400" class="discovery-swiper" id="swiper" :current="TabCur" @change="tabSwiper">
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextPage('food')">
					<block class="swiper-item swiper-item-container margin-bottom" v-for="(item, index) in food_list" v-bind:key="index">
						<view class=" bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center padding-top padding-left padding-bottom">
							<image class="cu-avatar xl border-radius bg-white shadow margin-right" :src="item.photos.length != 0 ? item.photos[0].url:'./../../static/discovery/food_default.png'">
							</image>
							<view class="flex-direction justify-start poi-info">
								<view class="text-sm poi-text poi-text-bold">{{item.name}}</view>
								<view class="text-sm poi-text">{{item.address}}</view>
								<view class="text-sm poi-text" v-if="item.tel!=''">{{item.type}}</view>
								<view class="flex align-end" v-if="item.tel==''">
									<view class="text-sm poi-text">{{item.type}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
								<view class="flex align-end" v-else>
									<view class="text-sm poi-text">联系方式: {{item.tel}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
							</view>
						</view>
					</block>
					<loading v-if="loading"></loading>
					<view class="cu-tabbar-height tabbar-height"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextPage('play')">
					<block class="swiper-item swiper-item-container margin-bottom" v-for="(item, index) in play_list" v-bind:key="index">
						<view class=" bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center padding-top padding-left padding-bottom">
							<image class="cu-avatar xl border-radius bg-white shadow margin-right" :src="item.photos.length != 0 ? item.photos[0].url:'./../../static/discovery/play.png'">
							</image>
							<view class="flex-direction justify-start poi-info">
								<view class="text-sm poi-text poi-text-bold">{{item.name}}</view>
								<view class="text-sm poi-text">{{item.address}}</view>
								<view class="text-sm poi-text" v-if="item.tel!=''">{{item.type}}</view>
								<view class="flex align-end" v-if="item.tel==''">
									<view class="text-sm poi-text">{{item.type}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
								<view class="flex align-end" v-else>
									<view class="text-sm poi-text">联系方式: {{item.tel}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
							</view>
						</view>
					</block>
					<loading v-if="loading"></loading>
					<view class="cu-tabbar-height tabbar-height"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextPage('live')">
					<block class="swiper-item swiper-item-container margin-bottom" v-for="(item, index) in live_list" v-bind:key="index">
						<view class=" bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center padding-top padding-left padding-bottom">
							<image class="cu-avatar xl border-radius bg-white shadow margin-right" :src="item.photos.length != 0 ? item.photos[0].url:'./../../static/discovery/house_default.png'">
							</image>
							<view class="flex-direction justify-start poi-info">
								<view class="text-sm poi-text poi-text-bold">{{item.name}}</view>
								<view class="text-sm poi-text">{{item.address}}</view>
								<view class="text-sm poi-text" v-if="item.tel!=''">{{item.type}}</view>
								<view class="flex align-end" v-if="item.tel==''">
									<view class="text-sm poi-text">{{item.type}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
								<view class="flex align-end" v-else>
									<view class="text-sm poi-text">联系方式: {{item.tel}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
							</view>
						</view>
					</block>
					<loading v-if="loading"></loading>
					<view class="cu-tabbar-height tabbar-height"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl" @scrolltolower="loadNextPage('sport')">
					<block class="swiper-item swiper-item-container margin-bottom" v-for="(item, index) in sport_list" v-bind:key="index">
						<view class=" bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center padding-top padding-left padding-bottom">
							<image class="cu-avatar xl border-radius bg-white shadow margin-right" :src="item.photos.length != 0 ? item.photos[0].url:'./../../static/discovery/sport.png'">
							</image>
							<view class="flex-direction justify-start poi-info">
								<view class="text-sm poi-text poi-text-bold">{{item.name}}</view>
								<view class="text-sm poi-text">{{item.address}}</view>
								<view class="text-sm poi-text" v-if="item.tel!=''">{{item.type}}</view>
								<view class="flex align-end" v-if="item.tel==''">
									<view class="text-sm poi-text">{{item.type}}</view>
									<view class="poi-distance">{{item.distance}}</view>
								</view>
								<view class="flex align-end" v-else>
									<view class="text-sm poi-text">联系方式: {{item.tel}}</view>
									<view class="poi-distance">{{item.distance}}</view>
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
	// import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	// import bmap from '../../js_sdk/bmap-wx.min.js';
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				TabCur: 0,
				menu_list: ['美食', '娱乐', '住宿', '运动'],
				food_list: [],
				play_list: [],
				live_list: [],
				sport_list: [],
				display_location: true,
				scroll_height: 600,
				screen_height: 800,
				search_keywords: '',
				foodCurrentPage: 1,
				playCurrentPage: 1,
				liveCurrentPage: 1,
				sportCurrentPage: 1,
				loading: false,
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
			userLocation: function() {
				if (this.location.user_address == null) {
					return "定位中...";
				} else {
					return this.location.user_address_component.district + this.location.user_address_component.street
				}
			},
		},
		mounted() {
			this.initPoi();
			setTimeout(() => {
				this.getHeight();
			}, 100)
		},
		methods: {
			loadNextPage(type) {
				if (this.loading) {
					return;
				}
				this.currentPage++;
				this.loading = true;
				let keywords = '';
				let currentPage = 0;
				switch (type) {
					case 'food':
						keywords = '美食';
						this.foodCurrentPage++;
						currentPage = this.foodCurrentPage;
						break;
					case 'play':
						keywords = '娱乐';
						this.playCurrentPage++;
						currentPage = this.playCurrentPage;
						break;
					case 'live':
						keywords = '住宿';
						this.liveCurrentPage++;
						currentPage = this.liveCurrentPage;
						break;
					case 'sport':
						keywords = '运动场馆';
						this.sportCurrentPage++;
						currentPage = this.sportCurrentPage;
						break;
				}
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: keywords,
					page: currentPage,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					switch (type) {
						case 'food':
							this.food_list.push.apply(this.food_list, this.formatPoi(res.data.pois));
							break;
						case 'play':
							this.play_list.push.apply(this.play_list, this.formatPoi(res.data.pois));
							break;
						case 'live':
							this.live_list.push.apply(this.live_list, this.formatPoi(res.data.pois));
							break;
						case 'sport':
							this.sport_list.push.apply(this.sport_list, this.formatPoi(res.data.pois));
							break;
					}
					this.loading = false;
				})
			},
			getHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that)
						query.select('#swiper').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top;
						}).exec();
					}
				});
			},
			initPoi() {
				this.loading = true;
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: '美食',
					page: 1,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					this.food_list = this.formatPoi(res.data.pois);
					this.loading = false;
				})
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: '娱乐',
					page: 1,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					this.play_list = this.formatPoi(res.data.pois);
					this.loading = false;
				})
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: '住宿',
					page: 1,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					this.live_list = this.formatPoi(res.data.pois);
					this.loading = false;
				})
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: '运动场馆',
					page: 1,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					this.sport_list = this.formatPoi(res.data.pois);
					this.loading = false;
				})
			},
			formatPoi(pois) {
				for (let item in pois) {
					if (pois[item].tel != '') {
						let telTemp = pois[item].tel.split(';');
						pois[item].tel = telTemp[0];
					}
					if (pois[item].distance / 1000 < 1) {
						pois[item].distance = pois[item].distance + 'm';
					} else {
						pois[item].distance = (pois[item].distance / 1000).toFixed(1) + "km";
					}
				}
				return pois;
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height;
				this.display_location = false;
				console.log('click')
				this.getHeight()
			},
			InputBlur(e) {
				this.InputBottom = 0
				console.log('leave')
				this.display_location = true;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			tabSwiper(e) {
				this.TabCur = e.detail.current;
			},
			navigateLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			navigateSearch() {
				console.log('12312312312312312')
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style src="./discovery.css">

</style>
