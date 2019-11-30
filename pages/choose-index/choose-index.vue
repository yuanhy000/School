<template>
	<view>
		<indexes ref="indexes" @clickData="clickData"></indexes>
	</view>
</template>
<script>
	import indexes from "../../components/indexes/indexes.vue"
	import Data from "./school.json"
	export default {
		name: "contury",
		components: {
			indexes
		},
		data() {
			return {
				dataArr: Data
			}
		},
		onShareAppMessage(res) {
			return {
				title: '微校期待你的围观～～',
				path: '/pages/index/index',
				imageUrl: '/static/user/shareImage.jpg'
			}
		},
		onShow() {
			var that = this
			uni.setNavigationBarTitle({
				title: '自动处理索引列表'
			});
			// console.log(Data)
		},
		onReady() {
			var that = this
			that.$refs["indexes"].initPage(that.dataArr)
		},
		methods: {
			clickData(data) {
				console.log('学校名：' + data.label)
				this.$store.dispatch('setSchool', data.label).then(res => {
					this.$store.dispatch('setNotification', {
						notification_content: '设置学校成功',
						notification_type: 'success'
					})
					uni.navigateBack({
						delta: 1
					});
				}).catch(error => {
					this.$store.dispatch('setNotification', {
						notification_content: '设置学校失败',
						notification_type: 'error'
					})
				});
			}
		}
	}
</script>

<style>

</style>
