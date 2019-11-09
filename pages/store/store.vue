<template>
	<view class="store-container">
		<scroll-view scroll-y class="DrawerPage" :class="displayCategory==true?'show':''">
			<view class="cu-bar search bg-white flex justify-center align-center padding-bottom padding-top">
				<button class="cu-btn bg-f5-white round  shadow  margin-left" @tap="showModal">
					<text class=" margin-left-xs location-text-color text-sm" v-if="categoryName != ''">{{categoryName}}</text>
					<text class=" margin-left-xs location-text-color text-sm" v-else>选择分类</text>
				</button>
				<button class="cu-btn search-form round shadow bg-white flex justify-start" @click="navigateSearch">
					<text class="cuIcon-search"></text>
					<text class="text-sm location-text-color">请输入关键词搜索</text>
				</button>
			</view>
		</scroll-view>

		<view class="DrawerClose" :class="displayCategory==true?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow DrawerBackground no-padding " :class="displayCategory==true?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in categoryList" :key="index" @click="ChangeCategory(index)">
					<view class="content">
						<!-- <text class="cuIcon-github text-grey"></text> -->
						<text class="category-title">{{item.category_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				displayCategory: false,
				categoryList: [],
				currentCategory: {},
				categoryName: ''
			}
		},
		mounted() {
			Vue.prototype.$http.get('/categories/get').then(res => {
				console.log(res);
				this.categoryList = res.data.data.categories;
			});
		},
		methods: {
			ChangeCategory(index) {
				this.currentCategory = this.categoryList[index];
				this.categoryName = this.currentCategory.category_name;
				this.hideModal();
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
