<template>
	<view class="flex justify-around flex-direction addition-container ">
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" indicator-color="#8799a3" indicator-active-color="#416276">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
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
				buttonList: ['发布动态', '发布活动', '发布招募', '发布交易'],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
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
					case 4:
						uni.navigateTo({
							url: '/pages/addition-commodity/addition-commodity'
						});
						break;
				}
			}
		}
	}
</script>

<style src="./addition.css">
</style>
