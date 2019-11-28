<template>
	<view class="addition-container" @tap="cancleTextareaInput">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">发布物品</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="cu-tabbar-height bg-white margin-left margin-right border-radius bg-white shadow flex align-center ">
					<input class="margin-left margin-right text-sm max-width" type="text" placeholder="物品名称" v-model="title" />
				</view>
				<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
					<textarea class="textarea-font-size" placeholder="详细描述..." v-model="content" maxlength="400" v-if="displayTextarea"
					 @tap.stop="beginTextareaInput" auto-focus="true"/>
					<text class="text-font-size" v-else @tap.stop="beginTextareaInput">{{displayContent}}</text>
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
					<view class="cu-form-group flex justify-between margin-left-sm no-padding" style="width: 100%;" @tap="showModal">
						<view class="title checkbox-title">
							选择分类
						</view>
						<text class="cuIcon-right text-theme-color" v-if="selectCategoryName==''"></text>
						<view class="title checkbox-title no-margin-right" v-else>
							{{selectCategoryName}}
						</view>
					</view>
					<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
						<view class="title checkbox-title">价格</view>
						<input class="margin-left text-sm no-padding title checkbox-title" type="digit" v-model="price" style="text-align:right;" />
					</view>
					<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
						<view class="title checkbox-title">显示位置</view>
						<checkbox class='round theme' @click="CheckboxOnclick('location')">
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
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showToast?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发布提示</view>
					<view class="action" @tap="hideToast">
						<text class="cuIcon-close text-theme-color"></text>
					</view>
				</view>
				<view class="padding-xl" style="letter-spacing: 2rpx;font-size: 26rpx;">
					{{toastContent}}
				</view>
			</view>
		</view>
		<notification ref="notification" :isdistance="true" style="z-index: 999;"></notification>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		uploadFile
	} from '../../utils/uploadFile.js'
	import {
		mapState
	} from 'vuex';

	const util = require('../../utils/util.js');

	export default {
		data() {
			return {
				title: '',
				content: '',
				price: null,
				isInput: false,
				selectImageList: [],
				imageUrlList: [],
				categoryList: [],
				isDisplayLocation: false,
				// isAnonymity: false,
				scroll_height: 700,
				selectCategory: false,
				selectCategoryID: 0,
				selectCategoryName: '',
				showToast: false,
				toastContent: '',
				displayTextarea: false,
				displayContent: '详细描述...'
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation,
			}),
		},
		mounted() {
			Vue.prototype.$http.get('/categories/get').then(res => {
				this.categoryList = res.data.data.categories;
			});

			setTimeout(() => {
				this.GetHeight();
			}, 100)
		},
		methods: {
			cancleTextareaInput(){
				this.displayTextarea = false;
				if(this.content == ''){
					this.displayContent ='详细描述...';
				} else{
				this.displayContent = this.content;
				}
			},
			beginTextareaInput(){
				this.displayTextarea = true;
			},
			hideToast(e) {
				this.showToast = false;
			},
			ChangeCategory(e) {
				this.selectCategoryID = e.detail.value;
				let selectCategory = this.categoryList.find((item) => {
					return item.category_id == this.selectCategoryID
				});
				this.selectCategoryName = selectCategory.category_name;
				this.hideModal();
			},
			showModal(e) {
				this.selectCategory = true;
			},
			hideModal(e) {
				this.selectCategory = false;
			},
			Submit() {
				if (this.title == '') {
					this.toastContent = '物品名称不能为空'
					this.showToast = true;
					return;
				}
				if (this.content == '') {
					this.toastContent = '物品描述不能为空'
					this.showToast = true;
					return;
				}
				if (this.imageUrlList.length == 0) {
					this.toastContent = '发布需附带相关物品图片'
					this.showToast = true;
					return;
				}
				if (this.selectCategoryID == 0) {
					this.toastContent = '先选择一个分类再发布'
					this.showToast = true;
					return;
				}
				if (this.price == null) {
					this.toastContent = '商品价格不能为空'
					this.showToast = true;
					return;
				}
				this.content = this.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
				Vue.prototype.$http.request({
					url: '/commodities/create',
					method: 'POST',
					params: {
						commodity_name: this.title,
						commodity_description: this.content,
						commodity_price: this.price,
						commodity_image: this.imageUrlList,
						category_id: this.selectCategoryID,
						is_display_location: this.isDisplayLocation,
						location: this.location.user_location.latitude + ',' + this.location.user_location.longitude
					}
				}).then(res => {
					this.content = '';
					this.displayContent = '';
					this.$refs.notification.open({
						type: 'success',
						content: '发布成功',
						timeout: 1500,
						isClick: false
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1500)
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
				this.selectImageList.splice(e.currentTarget.dataset.index, 1)
				this.imageUrlList.splice(e.currentTarget.dataset.index, 1)
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
