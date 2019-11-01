<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Location</block>
		</cu-custom>
		<map id="myMap" class="map-size" :latitude="location.user_location.latitude" :longitude="location.user_location.longitude"
		 scale="17" subkey="QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J">
		</map>
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
				key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
			});
			
			this.mapCtx = qq.createMapContext('myMap');//获取地图对象同canvas相似，获取后才能调用相应的方法
			console.log(this.mapCtx)
		}
	}
</script>

<style src="./location.css">

</style>
