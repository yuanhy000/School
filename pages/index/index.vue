<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="false" v-if="CurrentPage!='user'">
			<block slot="backText">返回</block>
			<block slot="content">微校</block>
		</cu-custom>
		<!-- <search v-if="CurrentPage=='chat'"></search> -->
		<information v-if="CurrentPage=='information'"></information>
		<store v-if="CurrentPage=='store'"></store>
		<addition v-if="CurrentPage=='addition'"></addition>
		<discovery v-if="CurrentPage=='discovery'"></discovery>
		<user v-if="CurrentPage=='user'"></user>
		<tabbar class="tabbar-position" @navigate="NavChange"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CurrentPage: 'user',
			}
		},
		onLoad() {

		},
		methods: {
			Toggle(e) {
				var anmiaton = e.currentTarget.dataset.class;
				this.animation = anmiaton;
				setTimeout(() => {
					this.animation = '';
				}, 1000)
			},
			NavChange(e) {
				this.CurrentPage = e.page;
			}
		}
	}
</script>

<style src="./index.css">

</style>
