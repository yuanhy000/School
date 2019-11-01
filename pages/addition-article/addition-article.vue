<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Addition</block>
		</cu-custom>
		<view>
		</view>

		<view class="cu-tabbar-height bg-white margin-left margin-right margin-top  border-radius bg-white shadow flex align-center ">
			<input class="margin-left margin-right text-sm" type="text" placeholder="标题 ( 可选 )" />
		</view>
		<view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow">
			<textarea class="textarea-font-size" placeholder="分享新鲜事..." />
			</view>
		<view class="cu-form-group margin-left margin-right margin-top margin-bottom border-radius bg-white shadow">
			<view class="grid col-4 grid-square flex-sub  margin-top">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
					<text class='cuIcon-cameraaddfill text-theme-color'></text>
				</view>
			</view>
		</view>
			<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="showModal" data-target="viewModal">
				Change it !!!
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
			}
		},
		methods: {

			ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
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
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style src="./addition-article.css">
</style>
