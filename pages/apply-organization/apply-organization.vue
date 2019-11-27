<template>
	<view class="addition-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">认证组织</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="cu-tabbar-height bg-white margin-left margin-right  border-radius bg-white shadow flex align-center ">
					<input class="margin-left margin-right text-sm max-width" type="text" placeholder="认证组织名称" v-model="title" />
				</view>
				<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
					<textarea class="textarea-font-size" placeholder="认证组织概况信息..." v-model="content" />
					</view>
				<view class="cu-form-group margin-left margin-right border-top-radius bg-white shadow apply-title">
					相关证明材料
				</view>
				<view class="cu-form-group margin-left margin-right margin-bottom bg-white border-bottom-radius shadow ">
					<view class="grid col-4 grid-square flex-sub margin-top">
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
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="Submit" data-target="viewModal">
					申请认证
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showToast?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">申请提示</view>
					<view class="action" @tap="hideModal">
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

	const util = require('../../utils/util.js');

	export default {
		data() {
			return {
				title: '',
				content: '',
				isInput: false,
				selectImageList: [],
				imageUrlList: [],
				isDisplayLocation: false,
				isAnonymity: false,
				scroll_height: 700,
				showToast:false,
				toastContent: ''
			}
		},
		mounted() {
			setTimeout(() => {
				this.GetHeight();
			}, 100)
		},
		methods: {
			hideModal(e) {
				this.showToast = false;
			},
			Submit() {
				if(this.title == ''){
					this.toastContent = '所认证的组织名称不能为空'
					this.showToast = true;
					return ;
				}
				if(this.content == ''){
					this.toastContent = '所认证的组织描述不能为空'
					this.showToast = true;
					return ;
				}
				if(this.imageUrlList.length == 0){
					this.toastContent = '认证组织需提交相关证明材料'
					this.showToast = true;
					return ;
				}
				this.content = this.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
				Vue.prototype.$http.request({
					url: '/users/organization/apply',
					method: 'POST',
					params: {
						organization_name: this.title,
						organization_description: this.content,
						organization_image: this.imageUrlList,
					}
				}).then(res => {
					this.content = '';
					this.$refs.notification.open({
						type: 'success',
						content: '申请成功',
						timeout: 1500,
						isClick: false
					});
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},1500)
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
				his.selectImageList.splice(e.currentTarget.dataset.index, 1);
				this.imageUrlList.splice(e.currentTarget.dataset.index, 1);
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

<style src="./apply-organization.css">
</style>
