<script>
	import Vue from 'vue'
	import jwtToken from './utils/jwt.js'

	export default {
		onLaunch: function() {
			this.setCustomBarHeight();
			this.$store.dispatch('requestUserLocation');
		},
		onShow: function() {
			if (jwtToken.getToken()) {
				this.$store.dispatch('setAuthUser');
			} else if (jwtToken.getRefreshToken()) {
				this.$store.dispatch('refreshToken');
			} else {
				this.$store.dispatch('getNewToken')
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			setCustomBarHeight() {
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
						if (JSON.stringify(QCustom) != "{}") {
							Vue.prototype.Custom = QCustom;
							Vue.prototype.CustomBar = QCustom.bottom + QCustom.top - e.statusBarHeight + 5;
						} else {
							Vue.prototype.CustomBar = 70;
						}
						// #endif
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	
</style>