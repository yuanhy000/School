<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">Chat</block>
		</cu-custom>
		<tabbar class="tabbar-position"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Fuck'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style src="./index.css">

</style>
