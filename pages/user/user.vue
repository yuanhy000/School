<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="user-avatar-container">
				<!-- 		<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view> -->
				<image-button @bindGetUserInfo="onGetUserInfo" :type="getUserInfo" class="avatar-button ">
					<image class="cu-avatar xl round " slot="img" src="./../../static/user/click-me.png">
					</image>
				</image-button>
			</view>
			<view class='padding margin text-center'>
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="showModal" data-target="viewModal">
					Change it !!!
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height tabbar-height"></view>
		</scroll-view>

		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow DrawerBackground" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import imageButton from '../../components/image-button/image-button.vue'
	// import Request from '../../js_sdk/luch-request/request.js'
	export default {
		data() {
			return {
				authorized: false,
				userInfo: {},
				modalName: null,
			};
		},
		components: {
			imageButton: imageButton
		},
		mounted() {
			// this.http.post('/token/get').then(res => {
			// 	console.log(res)
			// })
		},
		methods: {
			onGetUserInfo(event) {
				const userInfo = event.info.userInfo
				if (userInfo) {
					this.userInfo = userInfo;
					this.authorized = true;

					const http = new Request();
					http.post('school.test/api/user').then(res => {
						console.log(res)
					})
					// User.submitUserInfo({
					// 	nickName: userInfo.nickName,
					// 	avatarUrl: userInfo.avatarUrl,
					// 	sex: userInfo.gender
					// }).then(res => {
					// 	this.getUserInfoFromSever();
					// });
					// this.getUserInfoFromSever();
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
	}
</script>

<style src="./user.css">
</style>
