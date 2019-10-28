<script>
	import Vue from 'vue'
	import Request from './js_sdk/luch-request/request.js'
	// import config from './utils/config.js'

	Vue.prototype.http = new Request();
	Vue.prototype.http.setConfig((config) => {
		config.baseUrl = 'http://school.test/api';
		return config
	})

	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif  
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let QCustom = qq.getMenuButtonBoundingClientRect();
					console.log(JSON.stringify(QCustom))
					if (JSON.stringify(QCustom) != "{}") {
						console.log('has')
						Vue.prototype.Custom = QCustom;
						Vue.prototype.CustomBar = QCustom.bottom + QCustom.top - e.statusBarHeight + 5;
					} else {
						console.log('null')
						Vue.prototype.CustomBar = 70;
					}
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			// qq.getUserInfo({
			// 	success: res => {
			// 		console.log(res);
			// 	},
			// })
			qq.login({
				success: res => {
					this.http.post('/token/get',res.code).then(res => {
						console.log(res)
					})
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	/*每个页面公共css */
</style>
