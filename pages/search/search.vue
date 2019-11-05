<template>
	<view class="bg-white search-container">
		<view class="cu-bar search">
			<view class="search-form round flex align-center">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入关键词搜索" confirm-type="search" v-model="searchText"
				 @confirm="searchStart"></input>
			</view>
			<button class="cu-btn round bg-theme-green-black text-white margin-right-sm search-txet-size" role="button"
			 aria-disabled="false">搜索</button>
		</view>
		<view class="cu-bar search">
			<view class="flex justify-between align-center search-tab-width ">
				<text class="margin-left-lg search-txet-size text-theme-color">历史记录</text>
				<text class="cuIcon-deletefill search-icon-size margin-right-lg text-theme-color"></text>
			</view>
		</view>
		<view class="cu-bar search list flex align-center justify-start" v-show="historyList.length!=0">
			<view v-for="(item,index) in historyList" :key="index" class="cu-btn round list-item margin-right-lg margin-bottom">
				{{item}}
			</view>
		</view>
		<view class="cu-bar search">
			<view class="flex justify-between align-center search-tab-width ">
				<text class="margin-left-lg search-txet-size text-theme-color">猜你想搜的</text>
			</view>
		</view>
		<view class="cu-bar search list flex align-center justify-start">
			<view v-for="(item,index) in wantList" :key="index" class="cu-btn round list-item margin-right-lg margin-bottom">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import zySearch from '../../components/zy-search/zy-search.vue'
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import {
		mapState
	} from 'vuex';
	const qqmapsdk = new QQMapWX({
		key: 'XSWBZ-MHZ3K-U76JO-AU4NT-WKNYK-B2BA4'
	});
	export default {
		components: {
			zySearch
		},
		data() {
			return {
				searchText: '',
				historyList: uni.getStorageSync('search_cache'),
				wantList: ['美食', '住宿', '休闲', '娱乐', '美食', '住宿', '休闲', ]
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
		},
		mounted() {

		},
		methods: {
			searchStart() {
				if (this.searchText == '') {
					uni.showToast({
						title: '请输入关键字',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else {
					this.setSerachStorage();
					console.log(this.location)
					qqmapsdk.search({
						keyword: this.searchText,
						location: {
							latitude: this.location.user_location.latitude,
							longitude: this.location.user_location.longitude
						},
						success: function(res) {
							console.log(res);
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}
			},
			setSerachStorage() {
				let _this = this;
				uni.getStorage({
					key: 'search_cache',
					success(res) {
						let list = res.data;
						console.log(list);
						if (list.length > 9) {
							for (let item of list) {
								if (item == _this.searchText) {
									return false;
								}
							}
							list.pop();
							list.unshift(_this.searchText);
						} else {
							for (let item of list) {
								if (item == _this.searchText) {
									return false;
								}
							}
							list.unshift(_this.searchText);
						}
						_this.historyList = list;
						uni.setStorage({
							key: 'search_cache',
							data: _this.historyList
						});
					},
					fail() {
						_this.historyList = [];
						_this.historyList.push(_this.searchText);
						uni.setStorage({
							key: 'search_cache',
							data: _this.historyList
						});
					}
				})
			}
		},
	}
</script>

<style src="./search.css">
</style>
