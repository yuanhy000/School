<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 28rpx!important; letter-spacing: 1rpx;">选择位置</block>
		</cu-custom>
		<!-- 		<map id="myMap" class="map-size" :latitude="location.user_location.latitude" :longitude="location.user_location.longitude"
		 scale="17" subkey="QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J">
		</map> -->
		<map id="map" longitude="113.324520" latitude="23.099994" scale="14" :controls="controls" bindcontroltap="controltap"
		 :markers="markers" bindmarkertap="markertap" :polyline="polyline" bindregionchange="regionchange" show-location
		 style="width: 100%; height: 300px;"></map>
	</view>
</template>

<script>
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				markers: [{
					iconPath: "/resources/others.png",
					id: 0,
					latitude: 23.099994,
					longitude: 113.324520,
					width: 50,
					height: 50
				}],
				polyline: [{
					points: [{
						longitude: 113.3245211,
						latitude: 23.10229
					}, {
						longitude: 113.324520,
						latitude: 23.21229
					}],
					color: "#FF0000DD",
					width: 2,
					dottedLine: true
				}],
				controls: [{
					id: 1,
					iconPath: '/resources/location.png',
					position: {
						left: 0,
						top: 300 - 50,
						width: 50,
						height: 50
					},
					clickable: true
				}]
			};
		},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
		},
		mounted() {
			let qqmapsdk = new QQMapWX({
				key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
			});

			let mapCtx = wx.createMapContext('myMap'); //获取地图对象同canvas相似，获取后才能调用相应的方法
			console.log(mapCtx);

			// const key = 'XSWBZ-MHZ3K-U76JO-AU4NT-WKNYK-B2BA4'; //使用在腾讯位置服务申请的key
			// const referer = 'test'; //调用插件的app的名称
			// const location = JSON.stringify({
			// 	latitude: 39.89631551,
			// 	longitude: 116.323459711
			// });
			// const category = '生活服务,娱乐休闲';

			// qq.navigateTo({
			// 	url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
			// });

		},
		methods: {
			regionchange(e) {
				console.log(e.type)
			},
			markertap(e) {
				console.log(e.markerId)
			},
			controltap(e) {
				console.log(e.controlId)
			}
		}
	}
</script>

<style src="./location.css">

</style>
