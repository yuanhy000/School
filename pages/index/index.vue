<template>
	<view>
		<cu-custom bgColor="bg-gradual-tab" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">Chat</block>
		</cu-custom>
		<search v-if="CurrentPage=='chat'"></search>
		<!-- <chat v-if="CurrentPage=='chat'"></chat> -->
		<contacts v-if="CurrentPage=='contacts'"></contacts>
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
				CurrentPage: 'chat',
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
				console.log(this.CurrentPage)
			}
		}
	}
</script>

<style src="./index.css">

</style>
