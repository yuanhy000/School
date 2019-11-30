<template>
	<view class="addition-container" @tap="cancleTextareaInput">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">发布招募</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="cu-tabbar-height bg-white margin-left margin-right border-radius bg-white shadow flex align-center ">
					<input class="margin-left margin-right text-sm max-width" type="text" placeholder="招募标题" v-model="title" />
				</view>
				<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
					<textarea class="textarea-font-size" placeholder="招募内容..." v-model="content" maxlength="400" v-if="displayTextarea"
					 auto-focus="true" warp="" @tap.stop="beginTextareaInput" />
					<text class="text-font-size" v-else @tap.stop="beginTextareaInput">{{displayContent}}</text>
					</view>
				<view class="cu-form-group margin-left margin-right border-top-radius bg-white shadow apply-title">
					相关资料信息 ( 可选 )
				</view>
				<view class="cu-form-group margin-left margin-right margin-bottom bg-white border-bottom-radius shadow ">
					<view class="grid col-4 grid-square flex-sub margin-top">
						<view class="bg-img" v-for="(item,index) in selectImageList" :key="index" @tap="ViewImage" :data-url="selectImageList[index]">
							<image :src="selectImageList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids flex align-center justify-center" @tap="ChooseImage" v-if="selectImageList.length<9">
							<view class='cuIcon-cameraaddfill text-theme-color' style="margin: auto; height: 150rpx; font-size: 60rpx; line-height: 150rpx;"></view>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-left margin-right margin-top margin-bottom border-radius bg-white shadow flex-direction">

					<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
						<view class="title checkbox-title">目标活动/比赛</view>
						<input class="margin-left text-sm no-padding title checkbox-title" type="digit" v-model="target" style="text-align:right;" />
					</view>
					<view class="cu-form-group flex justify-between margin-left-sm margin-right-sm no-padding" style="width: 100%;">
						<view class="title checkbox-title">显示位置</view>
						<checkbox class='round theme' checked="true" @click="CheckboxOnclick()">
						</checkbox>
					</view>
				</view>
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="Submit" data-target="viewModal">
					发布招募
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="showToast?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发布提示</view>
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
		mapState
	} from 'vuex';
	import {
		uploadFile
	} from '../../utils/uploadFile.js'

	const util = require('../../utils/util.js');

	export default {
		data() {
			return {
				title: '',
				content: '',
				target:'',
				selectImageList:[],
				imageUrlList: [],
				isDisplayLocation:true,
				scroll_height: 700,
				showToast:false,
				toastContent: '',
				displayTextarea: false,
				displayContent: '招募内容...'
			}
		},
		computed: {
			...mapState({
				location: state => state.UserLocation,
			}),
		},
		onShareAppMessage(res) {
			return {
				title: '我正在呼朋唤友，快来围观～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		mounted() {
			setTimeout(() => {
				this.GetHeight();
			}, 100)
		},
		methods:{
			cancleTextareaInput(){
				this.displayTextarea = false;
				if(this.content == ''){
					this.displayContent ='招募内容...';
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
				if(this.title == ''){
					this.toastContent = '招募标题不能为空'
					this.showToast = true;
					return ;
				}
				if(this.content == ''){
					this.toastContent = '招募内容不能为空'
					this.showToast = true;
					return ;
				}
				if(this.target == ''){
					this.toastContent = '目标活动/比赛不能为空'
					this.showToast = true;
					return ;
				}
				Vue.prototype.$http.request({
					url: '/recruits/create',
					method: 'POST',
					params: {
						recruit_title: this.title,
						recruit_content: this.content,
						recruit_image: this.imageUrlList,
						recruit_target: this.target,
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
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},1500)
					this.$store.dispatch('articleCountIncrement');
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

<style src="./addition-recruit.css">
</style>
