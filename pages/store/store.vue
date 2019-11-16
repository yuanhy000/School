<template>
	<view class="store-container">
		<view class="DrawerPage" :class="displayCategory==true?'show':''">
			<view class="bg-white shadow" style="z-index: 999;border-bottom: 1px solid #c8c8c8;">
				<view class="cu-bar search bg-white flex justify-center align-center padding-bottom padding-top">
					<button class="cu-btn bg-f5-white round  shadow  margin-left" @tap="showModal">
						<text class=" margin-left-xs location-text-color text-sm" v-if="categoryName != ''">{{categoryName}}</text>
						<text class=" margin-left-xs location-text-color text-sm" v-else>选择分类</text>
					</button>
					<button class="cu-btn search-form round shadow bg-white flex justify-start" @click="navigateSearch">
						<text class="cuIcon-search"></text>
						<text class="text-sm location-text-color" v-if="map_poi.search_commodity!=''">{{map_poi.search_commodity}}</text>
						<text class="text-sm location-text-color" v-else>请输入关键词搜索</text>
					</button>
				</view>
			</view>

			<scroll-view scroll-y :style="{height:scroll_height +'px'}" id="commodities" class="padding-bottom-xl flow-box max-width"
			 @scrolltolower="loadNextPage(currentCategoryId)">
				<image src="../../static/commodity/search-none.png" class="max-width margin-top-xl animation-fade" mode="widthFix"
				 v-if="noResult"></image>
				<waterfall-flow :list="commodityList" @click="navigateCommodity" :init="initList" v-else></waterfall-flow>
				<loading v-if="loading"></loading>
				<view class="cu-tabbar-height tabbar-height"></view>
			</scroll-view>
		</view>

		<view class="DrawerClose" :class="displayCategory==true?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow DrawerBackground no-padding " :class="displayCategory==true?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" @click="ChangeCategory(-1)">
					<text class="category-title">全部推荐</text>
				</view>
				<view class="cu-item arrow" v-for="(item,index) in categoryList" :key="index" @click="ChangeCategory(index)">
					<view class="content">
						<text class="category-title">{{item.category_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import Vue from 'vue';
	import WaterfallFlow from '../../components/waterfall-flow/waterfall-flow.vue';
	import {
		mapState
	} from 'vuex';

	export default {
		components: {
			WaterfallFlow: WaterfallFlow
		},
		data() {
			return {
				displayCategory: false,
				categoryList: [],
				currentCategory: {},
				currentCategoryId: -1,
				categoryName: '',
				commodityList: [],
				scroll_height: 700,
				loading: false,
				links: {},
				loadFinish: false,
				initList: false,
				noResult: false
			}
		},
		computed: {
			...mapState({
				map_poi: state => state.MapPoi
			}),
		},
		watch: {
			'$store.state.MapPoi.search_commodity': function() {
				if (this.map_poi.search_commodity != '') {
					this.prepareForRequest();
					Vue.prototype.$http.request({
						url: '/commodities/search',
						method: 'POST',
						params: {
							search_keyword: this.map_poi.search_commodity
						}
					}).then(res => {
						this.commodityList = res.data.data;
						this.links = res.data.links;
						setTimeout(() => {
							this.loading = false;
						}, 200);
					}).catch(error => {
						this.noResult = true;
						this.loading = false;
					});
				}
			}
		},
		mounted() {
			this.loading = true;
			this.getCategory();
			this.loadCategoryCommodity(true);
			setTimeout(() => {
				this.getHeight();
			}, 100)
		},
		methods: {
			navigateCommodity(commodity_id) {
				uni.navigateTo({
					url: '/pages/commodity/commodity?commodity_id=' + commodity_id
				})
			},
			navigateSearch() {
				uni.navigateTo({
					url: '/pages/search-commodity/search-commodity'
				})
			},
			getCategory() {
				Vue.prototype.$http.get('/categories/get').then(res => {
					this.categoryList = res.data.data.categories;
				});
			},
			prepareForRequest() {
				this.commodityList = [];
				this.loadFinish = false;
				this.initList = !this.initList;
				this.noResult = false;
				this.loading = true;
				this.$store.dispatch('clearSearchCommodity');
			},
			loadCategoryCommodity(init = false) {
				if (!init) {
					this.prepareForRequest();
				}
				if (this.currentCategoryId == -1) {
					Vue.prototype.$http.request({
						url: '/commodities/recommend',
						method: 'POST'
					}).then(res => {
						this.commodityList = res.data.data;
						this.links = res.data.links;
						setTimeout(() => {
							this.loading = false;
						}, 200);
					}).catch(error => {
						this.noResult = true;
						this.loading = false;
					});
				} else {
					Vue.prototype.$http.request({
						url: '/commodities/category',
						method: 'POST',
						params: {
							category_id: this.currentCategoryId
						}
					}).then(res => {
						this.commodityList = res.data.data;
						this.links = res.data.links;
						setTimeout(() => {
							this.loading = false;
						}, 200);
					}).catch(error => {
						this.noResult = true;
						this.loading = false;
					});
				}
			},
			loadNextPage(category_id) {
				this.loading = true;
				if (!this.links.next) {
					this.loadFinish = true;
					this.loading = false;
					return;
				}
				Vue.prototype.$http.post(this.links.next).then(res => {
					this.commodityList.push.apply(this.commodityList, res.data.data);
					this.links = res.data.links;
					setTimeout(() => {
						this.loading = false;
					}, 200);
				})
			},
			getHeight() {
				let that = this;
				let height = 0;
				uni.getSystemInfo({
					success(res) {
						that.screen_height = res.windowHeight;
						let otherHeight = 0;
						let query = uni.createSelectorQuery().in(that);
						query.select('#commodities').boundingClientRect(res => {
							that.scroll_height = that.screen_height - res.top - 55;
						}).exec();
					}
				});
			},
			ChangeCategory(index) {
				if (index == -1) {
					if (index == this.currentCategoryId) {
						this.hideModal();
						return;
					}
					this.currentCategoryId = -1;
					this.categoryName = '全部推荐';
					this.loadCategoryCommodity();
					this.hideModal();
				} else {
					if (this.categoryList[index].category_id == this.currentCategoryId) {
						this.hideModal();
						return;
					}
					this.currentCategoryId = this.categoryList[index].category_id;
					this.categoryName = this.categoryList[index].category_name;
					this.loadCategoryCommodity();
					this.hideModal();
				}
			},
			showModal(e) {
				this.displayCategory = true;
			},
			hideModal(e) {
				this.displayCategory = false
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style src="./store.css">

</style>
