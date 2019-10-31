<template>
	<view>
		<view class="location-button-container">
			<button class="cu-btn round bg-white margin-top-sm margin-bottom-sm margin-left-sm shadow-lg" @click="navigateLocation">
				<text class="location-icon-size theme-color cuIcon-locationfill"></text>
				<text class=" margin-left-xs  text-grey text-sm"> {{location.user_address}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';

	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {}
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
			
			if (this.location.user_address == null) {
				this.$store.dispatch('requestUserLocation');
			}

			// qqmapsdk.search({
			// 	keyword: '娱乐',
			// 	success: function(res) {
			// 		console.log(res);
			// 	},
			// 	fail: function(res) {
			// 		// console.log(res);
			// 	},
			// 	complete: function(res) {
			// 		// console.log(res);
			// 	}
			// });

		},
		methods: {
			navigateLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			}
		}
	}
</script>

<style src="./discovery.css">

</style>
