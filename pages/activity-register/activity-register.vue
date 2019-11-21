<template>
	<view class="addition-container">
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Register</block>
		</cu-custom>
		<scroll-view scroll-y id="scroll" :style="{height:scroll_height +'px'}">
			<view class="padding-top">
				<view class="margin-left user-info-title text-theme-color margin-bottom-sm">队伍名称：</view>
				<view class="cu-tabbar-height bg-white margin-left margin-right  border-radius bg-white shadow flex align-center ">
					<input class="margin-left margin-right text-sm" type="text" placeholder="队伍名称 (单人可选)" v-model="title" />
				</view>
				<view class="margin-left user-info-title text-theme-color margin-top-xl">队伍成员：</view>
				<!-- <view class="cu-tabbar-height bg-white margin-left margin-right border-radius bg-white shadow flex align-center margin-top-sm">
					<view class="max-width flex align-center padding-left padding-right">
						<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="user.user_avatar">
						</image>
						<view class="margin-right user-info-font">
							用户ID: {{user.user_number}}
						</view>
						<view class="user-info-font">
							{{user.user_school}}
						</view>
					</view>
				</view> -->
				<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow bg-white">
					<view class="cu-item">
						<view class="flex max-width align-center">
							<image class="cu-avatar article-avatar avatar-shadow margin-right round avatar-border" :src="user.user_avatar">
							</image>
							<view class="margin-right user-info-font">
								用户ID: {{user.user_number}}
							</view>
							<view class="user-info-font">
								{{user.user_school}}
							</view>
						</view>
					</view>
					<view class="cu-item arrow">
						<text class="category-title">全部推荐</text>
					</view>
					<!-- 	<view class="cu-item arrow" v-for="(item,index) in categoryList" :key="index" @click="ChangeCategory(index)">
						<view class="content">
							<text class="category-title">{{item.category_name}}</text>
						</view>
					</view> -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				activity_id: 0,
				scroll_height: 700,
			}
		},
		computed: {
			...mapState({
				user: state => state.AuthUser,
			}),
		},
		onLoad(option) {
			this.activity_id = option.activity_id;
			console.log(this.activity_id)
		},
		mounted() {}
	}
</script>

<style src="./activity-register.css">
</style>
