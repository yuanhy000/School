<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Location</block>
		</cu-custom>
		<map id="myMap" class="map-size" :latitude="location.user_location.latitude" :longitude="location.user_location.longitude"
		 scale="17">
		</map>
		<!-- 		<iframe id="mapPage" width="100%" height="600px" frameborder=0 src="">
		</iframe> -->
		<!-- <map id="myMap" class="map-size" latitude="29.52168" longitude="106.56256"
		 scale="17" subkey="QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J">
		</map> -->
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

			};
		},
		computed: {
			...mapState({
				location: state => state.UserLocation
			}),
		},
		mounted() {
			let qqmapsdk = new QQMapWX({
				key: 'XSWBZ-MHZ3K-U76JO-AU4NT-WKNYK-B2BA4'
			});

			this.mapCtx = qq.createMapContext('myMap'); //获取地图对象同canvas相似，获取后才能调用相应的方法
			console.log(qqmapsdk)
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

		}
	}
</script>

<style src="./location.css">

</style>
