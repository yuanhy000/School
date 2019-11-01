<template>
	<view class="flex justify-around flex-direction addition-container ">
		<!-- 可以插入轮播丰富界面 -->
		<block v-for="(item,index) in buttonList" :key="index">
			<button class="cu-btn bg-theme-green-black round  shadow lg text-white margin-left-lg margin-right-lg" @tap="buttonSelect"
			 :data-id="index">
				<text class="text-df">{{item}}</text>
			</button>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0,
				buttonList: ['发布动态', '发布活动', '发布招募', '发布摄影', '发布交易'],
			}
		},
		methods: {
			buttonSelect(e) {
				this.selectIndex = e.currentTarget.dataset.id;
				switch (this.selectIndex) {
					case 0:
						uni.navigateTo({
							url: '/pages/addition-article/addition-article'
						});
						break;
				}
			}
		}
	}
</script>

<style src="./addition.css">
</style>
