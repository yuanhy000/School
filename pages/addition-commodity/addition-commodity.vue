<template>
	<view class="addition-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Addition</block>
		</cu-custom>
		<scroll-view scroll-y class="DrawerPage" id="scroll" :style="{height:scroll_height +'px'}">
			<view class="cu-tabbar-height bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center ">
				<input class="margin-left margin-right text-sm" type="text" placeholder="物品名称" v-model="title" />
			</view>
			<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
				<textarea class="textarea-font-size" placeholder="详细描述..." v-model="content" />
				</view>
			<view class="cu-form-group margin-left margin-right margin-top margin-bottom border-rad ius bg-white border-radius shadow">
				<view class="grid col-4 grid-square flex-sub  margin-top">
					<view class="bg-img" v-for="(item,index) in selectImageList" :key="index" @tap="ViewImage" :data-url="selectImageList[index]">
						<image :src="selectImageList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="selectImageList.length<9">
						<text class='cuIcon-cameraaddfill text-theme-color'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-left margin-right margin-top margin-bottom border-radius bg-white shadow flex-direction">
				<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;" @tap="showModal">
					<view class="title checkbox-title">
						选择分类
					</view>
					<text class="cuIcon-right text-theme-color"></text>
					<!-- <checkbox class='round theme' @click="CheckboxOnclick('location')">
					</checkbox> -->
					<!-- <view class="action">
						<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">Radio</button>
					</view> -->
				</view>
				<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
					<view class="title checkbox-title">显示位置</view>
					<checkbox class='round theme' @click="CheckboxOnclick('location')">
					</checkbox>
				</view>
				<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
					<view class="title checkbox-title">是否匿名</view>
					<checkbox class='round theme' @click="CheckboxOnclick('anonymity')">
					</checkbox>
				</view>
			</view>
			<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="Submit" data-target="viewModal">
				发布物品
			</view>
			<view class="cu-modal" :class="selectCategory?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="ChangeCategory">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in categoryList" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="title checkbox-title">{{item.category_name}}</view>
									<radio class="round theme" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
									 :value="item.category_id"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		uploadFile
	} from '../../utils/uploadFile.js'

	const util = require('../../utils/util.js');

	export default {
		data() {
			return {
				title: '',
				content: '',
				isInput: false,
				selectImageList: [],
				imageUrlList: [],
				categoryList:[],
				isDisplayLocation: false,
				isAnonymity: false,
				scroll_height:700,
				selectCategory: false,
				selectCategoryID: 0
			}
		},
		mounted(){
			Vue.prototype.$http.get('/categories/get').then(res=>{
				this.categoryList = res.data.data.categories;
			});
					
			setTimeout(()=>{
				this.GetHeight();
			},100)
		},
		methods: {
			ChangeCategory(e) {
				this.selectCategoryID = e.detail.value;
				this.hideModal();
			},
			showModal(e) {
				this.selectCategory = true;
			},
			hideModal(e) {
				this.selectCategory = false;
			},
			Submit() {
				Vue.prototype.$http.request({
					url: '/commodities/create',
					method: 'POST',
					params: {
						commodity_name: this.title,
						commodity_description: this.content,
						commodity_image: this.imageUrlList,
						category_id: this.selectCategoryID,
						is_display_location: this.isDisplayLocation,
						is_anonymity: this.isAnonymity
					}
				}).then(res => {
					console.log(res.data)
				})
			},
			CheckboxOnclick() {
				this.isDisplayLocation = !this.isDisplayLocation;
			},
			ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						if (this.selectImageList.length != 0) {
							this.selectImageList = this.selectImageList.concat(res.tempFilePaths)
						} else {
							this.selectImageList = res.tempFilePaths
						}
						this.GetImageUrl();
					}
				});
			},
			GetImageUrl() {
				let nowTime = util.formatTime(new Date());
				for (let i = this.imageUrlList.length; i < this.selectImageList.length; i++) {
					console.log(this.selectImageList.length)
					uni.showLoading({
						title: '上传中 ' + (i + 1) + '/' + this.selectImageList.length,
						mask: true
					})
					uploadFile(this.selectImageList[i], 'images/' + nowTime + '/')
						.then(res => {
							this.imageUrlList.push(res);
							wx.hideLoading();
						}).catch(res => {
							wx.hideLoading();
						})
				}
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.selectImageList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.selectImageList.splice(e.currentTarget.dataset.index, 1)
							this.imageUrlList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			GetHeight() {
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
		}
	}
</script>


<style src="./addition-commodity.css">
</style>
