<template>
	<view class="addition-container" @tap="cancleTextareaInput">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">反馈错误</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="cu-tabbar-height bg-white margin-left margin-right  border-radius bg-white shadow flex align-center ">
					<input class="margin-left margin-right text-sm max-width" type="text" placeholder="哪里有问题 ( 可选 )" v-model="title" />
				</view>
				<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
					<textarea class="textarea-font-size" placeholder="详细错误..." v-model="content" maxlength="400" v-if="displayTextarea"
					 @tap.stop="beginTextareaInput" auto-focus="true" />
					<text class="text-font-size" v-else @tap.stop="beginTextareaInput">{{displayContent}}</text>	
					</view>
				<view class="cu-form-group margin-left margin-right margin-top margin-bottom border-radius bg-white border-radius shadow">
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
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="Submit" data-target="viewModal">
					反馈问题
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showToast?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">反馈提示</view>
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
	import {
		mapState
	} from 'vuex';

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
				toastContent: '',
				displayTextarea: false,
				displayContent: '详细错误...'
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation,
			}),
		},
		mounted() {
			setTimeout(() => {
				this.GetHeight();
			}, 100)
		},
		methods: {
			cancleTextareaInput(){
				this.displayTextarea = false;
				if(this.content == ''){
					this.displayContent ='详细错误...';
				} else{
				this.displayContent = this.content;
				}
			},
			beginTextareaInput(){
				this.displayTextarea = true;
			},
			hideModal(e) {
				this.showToast = false;
			},
			Submit() {
				if(this.content == ''){
					this.toastContent = '反馈内容不能为空'
					this.showToast = true;
					return ;
				}
				// this.content = this.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
				// Vue.prototype.$http.request({
				// 	url: '/articles/create',
				// 	method: 'POST',
				// 	params: {
				// 		article_title: this.title,
				// 		article_content: this.content,
				// 		article_image: this.imageUrlList,
				// 		is_display_location: this.isDisplayLocation,
				// 		is_anonymity: this.isAnonymity,
				// 		location: this.location.user_location.latitude + ',' + this.location.user_location.longitude
				// 	}
				// }).then(res => {
				// 	console.log(res.data)
				// })
				setTimeout(()=>{
					this.content = '';
					this.$refs.notification.open({
						type: 'success',
						content: '提交成功',
						timeout: 1500,
						isClick: false
					});
				},200)
				setTimeout(()=>{
					uni.navigateBack({
						delta: 1
					});
				},1700)
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
				this.selectImageList.splice(e.currentTarget.dataset.index, 1);
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

<style src="./addition-bug.css">
</style>
