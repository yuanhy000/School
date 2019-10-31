<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Location</block>
		</cu-custom>
		<map class="map-size" :latitude="location.user_location.latitude" :longitude="location.user_location.longitude"
		scale="17">
			<!-- <cover-view class="search-form"></cover-view> -->
		</map>
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
		}
	}
</script>

<style src="./location.css">

</style>
