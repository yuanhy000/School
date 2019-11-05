<template>
	<view class="discovery-container">
		<view class="cu-bar search bg-white flex justify-center align-center">
			<button class="cu-btn bg-f5-white round  shadow  margin-left" @click="navigateLocation" v-if="display_location">
				<text class="location-icon-size text-theme-color cuIcon-locationfill"></text>
				<text class=" margin-left-xs location-text-color text-sm"> {{userLocation}}</text>
			</button>
			<view class="search-form round shadow bg-white">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键词搜索"
				 confirm-type="search"></input>
			</view>
		</view>
		<!-- <search :showWant="true"></search> -->
		<scroll-view class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-theme-color cur':''" v-for="(item,index) in menu_list"
				 :key="index" @tap="tabSelect" :data-id="index">
					<view></view>
					{{item}}
				</view>
			</view>
		</scroll-view>
		<swiper :duration="1000" class="discovery-swiper" id="swiper">
			<swiper-item>
				<scroll-view scroll-y :style="{height:scroll_height +'px'}" class="padding-bottom-xl">
					<block class="swiper-item swiper-item-container" v-for="(item, index) in food_list" v-bind:key="index">
						<view class=" bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center padding-top padding-left padding-bottom">
							<image class="cu-avatar xl border-radius bg-white shadow margin-right" :src="item.photos.length != 0 ? item.photos[0].url:'./../../static/discovery/food_default.png'">
							</image>
							<view class="flex-direction justify-start poi-info">
								<view class="text-sm poi-text poi-text-bold">{{item.name}}</view>
								<view class="text-sm poi-text">{{item.address}}</view>
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
					<view class="cu-tabbar-height tabbar-height"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item swiper-item-container" style="background-color: red;">123</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item swiper-item-container" style="background-color: #1CBBB4;">123</view>
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
				menu_list: ['美食', '娱乐', '住宿', '休闲'],
				food_list: [],
				display_location: true,
				scroll_height: 600,
				screen_height: 800,
				search_keywords: '',
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
			// var myAmapFun = new amapFile.AMapWX({
			// 	key: 'c6ffcbdf769089a9ef57fdf112905d45'
			// });
			// Vue.prototype.$http.get('https://restapi.amap.com/v3/place/text?key=e6385f2595bf744cc4b92374eb502d49&keywords=美食&city=chongqing').then(res => {
			// 	console.log(res);
			// })
			this.initPoi();

			// let qqmapsdk = new QQMapWX({
			// 	key: 'XSWBZ-MHZ3K-U76JO-AU4NT-WKNYK-B2BA4'
			// });



			// qqmapsdk.search({
			// 	keyword: '美食',
			// 	success: res => {
			// 		console.log(res);
			// 		this.food_list = res.data;
			// 		console.log(this.food_list)
			// 	},
			// 	fail: function(res) {
			// 		// console.log(res);
			// 	},
			// 	complete: function(res) {
			// 		// console.log(res);
			// 	}
			// });
			// setTimeout(() => {
			// 	this.getHeight();
			// }, 100)
		},
		methods: {
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
				this.$store.dispatch('getAroundPoi', {
					latitude: this.location.user_location.latitude,
					longitude: this.location.user_location.longitude,
					keywords: '美食',
					page: 1,
					extensions: 'base',
					sortrule: 'weight'
				}).then(res => {
					this.food_list = this.formatPoi(res.data.pois);
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
			navigateLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			}
		}
	}
</script>

<style src="./discovery.css">

</style>
