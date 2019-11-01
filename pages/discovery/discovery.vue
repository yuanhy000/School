<template>
	<view>
		<view class="cu-bar search bg-white flex justify-center align-center">
			<button class="cu-btn bg-f5-white round  shadow  margin-left" @click="navigateLocation"
			 v-if="display_location">
				<text class="location-icon-size text-theme-color cuIcon-locationfill"></text>
				<text class=" margin-left-xs location-text-color text-sm"> {{location.user_address_component.district}}{{location.user_address_component.street}}</text>
			</button>
			<view class="search-form round shadow bg-white">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频"
				 confirm-type="search"></input>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-theme-color cur':''" v-for="(item,index) in menu_list"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import amapFile from '../../js_sdk/amap-wx.js';
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				TabCur: 0,
				menu_list: ['美食', '娱乐', '住宿', '休闲'],
				display_location: true,
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
		},
		mounted() {
			// let myAmapFun = new amapFile.AMapWX({
			// 	key: 'c6ffcbdf769089a9ef57fdf112905d45'
			// });
			// myAmapFun.getPoiAround({
			// 	keyword: '美食',
			// 	success: function(data) {
			// 		console.log(data)
			// 	},
			// 	fail: function(info) {
			// 		//失败回调
			// 		console.log(info)
			// 	}
			// })
			let qqmapsdk = new QQMapWX({
				key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
			});

			if (this.location.user_address == null) {
				this.$store.dispatch('requestUserLocation');
			}

			qqmapsdk.search({
				keyword: '大学',
				success: function(res) {
					console.log(res);
				},
				fail: function(res) {
					// console.log(res);
				},
				complete: function(res) {
					// console.log(res);
				}
			});

		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height;
				this.display_location = false;
				console.log('click')
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
