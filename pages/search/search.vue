<template>
	<view class="bg-white search-container">
		<view class="cu-custom fixed" :style="[{height:CustomBar + 'px'}]" style="z-index: 99999;">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'','bg-gradual-tab']">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back"></text>
					<block slot="backText">返回</block>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">搜索周边</block>
				</view>
				<slot name="right"></slot>
			</view>
		</view>

		<view class="cu-bar search">
			<view class="search-form round flex align-center">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入关键词搜索" confirm-type="search" v-model="searchText" id="search-input"
				 @confirm="searchStart" @input="searchTips"></input>
			</view>
			<button class="cu-btn round bg-theme-green-black text-white margin-right-sm search-txet-size" role="button"
			 aria-disabled="false" @click="searchStart">搜索</button>
		</view>
		<view class="cu-list menu" v-if="inputTips !=[] &&searchText != ''">
			<view class="cu-item text-sm" v-for="(item,index) in inputTips" v-bind:key="index" @click="quickSearch(item.title)">
				<span v-html="highLight(item.title, searchText)"></span>
			</view>
		</view>
		<view v-else>
			<view class="cu-bar search">
				<view class="flex justify-between align-center search-tab-width ">
					<text class="margin-left-lg search-txet-size text-theme-color">历史记录</text>
					<text class="cuIcon-deletefill search-icon-size margin-right-lg text-theme-color" @click="clearHistory()"></text>
				</view>
			</view>
			<view class="cu-bar search list flex align-center justify-start" v-show="historyList.length!=0">
				<view v-for="(item,index) in historyList" :key="index" class="cu-btn round list-item margin-right-lg margin-bottom"
				 @click="quickSearch(item)">
					{{item}}
				</view>
			</view>
			<view class="cu-bar search">
				<view class="flex justify-between align-center search-tab-width ">
					<text class="margin-left-lg search-txet-size text-theme-color">猜你想搜的</text>
				</view>
			</view>
			<view class="cu-bar search list flex align-center justify-start">
				<view v-for="(item,index) in wantList" :key="index" class="cu-btn round list-item margin-right-lg margin-bottom"
				 @click="quickSearch(item)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import {
		highLightMsg
	} from '../../utils/high-light.js'
	import {
		mapState
	} from 'vuex';
	const qqmapsdk = new QQMapWX({
		key: 'XSWBZ-MHZ3K-U76JO-AU4NT-WKNYK-B2BA4'
	});
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				searchText: '',
				historyList: uni.getStorageSync('search_cache'),
				wantList: ['美食', '住宿', '运动', '娱乐', 'KTV', '商场', '公园', '电影', '景点'],
				inputTimeStamp: 0,
				inputTips: []
			}
		},
		watch: {},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
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

		},
		methods: {
			quickSearch(keyword) {
				this.$store.dispatch('setSearchKeyword', keyword);
				uni.navigateBack({
					delta: 1
				});
			},
			searchTips(event) {
				this.inputTimeStamp = event.timeStamp;
				setTimeout(() => {
					//1s后比较二者是否还相同（因为只要还有事件触发，inputTimeStamp就会被改写，不再是当前事件函数的时间戳）
					if (this.inputTimeStamp == event.timeStamp) {
						this.requestTips();
					}
				}, 600);
			},
			requestTips() {
				this.inputTips = [];
				qqmapsdk.getSuggestion({
					keyword: this.searchText,
					region: this.location.user_address_component.city,
					success: res => {
						for (var i = 0; i < res.data.length; i++) {
							this.inputTips.push({
								title: res.data[i].title,
								id: res.data[i].id,
								addr: res.data[i].address,
								city: res.data[i].city,
								district: res.data[i].district,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng
							});
						}
					}
				});
			},
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
					this.setSearch();
				}
			},
			clearHistory() {
				this.historyList = [];
				uni.setStorage({
					key: 'search_cache',
					data: []
				});
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
			},
			highLight(item, highLight) {
				return highLightMsg(item, highLight)
			},
			setSearch() {
				if (this.searchText != '') {
					this.$store.dispatch('setSearchCommodity', this.searchText);
				}
				this.BackPage();
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
</script>

<style src="./search.css">
</style>
