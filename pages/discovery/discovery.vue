<template>
	<view>discovery-view</view>
</template>

<script>
	import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			let qqmapsdk = new QQMapWX({
				key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
			});
			qqmapsdk.search({
				keyword: '娱乐',
				success: function(res) {
					console.log(res);
				},
				fail: function(res) {
					// console.log(res);
				},
				complete: function(res) {
					// console.log(res);
				}
			});
			qq.getLocation({
				type: 'gcj02',
				success(res) {
					// const latitude = res.latitude
					// const longitude = res.longitude
					// const speed = res.speed
					// const accuracy = res.accuracy
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success(res) {
							console.log(res.result);
						}

					})

				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
