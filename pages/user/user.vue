<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="user-avatar-container">
				<view class="user-avatar-container flex justify-center align-center">
					<image class="cu-avatar xl round avatar-shadow" v-if="user.authentication" :src="user.user_avatar"> </image>
					<button @getuserinfo="bindGetUserInfo" class="avatar-button cu-avatar xl avatar-shadow" open-type="getUserInfo"
					 v-else style="background-image:url(./../../static/user/click-me.png);" plain=true>
					</button>
				</view>
			</view>
			<view class='padding margin text-center'>
				<view class='cu-btn bg-gradual-tab lg block shadow radius margin-xl' @tap="showModal" data-target="viewModal">
					Change it !!!
				</view>
			</view>
		<!-- 	<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height tabbar-height"></view> -->
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
	import Vue from 'vue'
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				authorized: false,
				userInfo: {},
				modalName: null,
			};
		},
		computed: {
			...mapState({
				user: state => state.AuthUser
			}),
		},
		components: {
			imageButton: imageButton
		},
		mounted() {
		},
		methods: {
			bindGetUserInfo(event) {
				const userInfo = event.detail.userInfo
				if (userInfo) {
					this.userInfo = userInfo;
					this.$store.dispatch('updateUserInfo', userInfo).then(res => {
						this.$store.dispatch('authorized');
					});
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
