<script>
	import Vue from 'vue'
	import jwtToken from './utils/jwt.js'

	export default {
		onLaunch: function() {
			this.$store.dispatch('requestUserLocation');
		},
		onShow: function() {
			this.setCustomBarHeight();
			if (jwtToken.getToken()) {
				this.$store.dispatch('setAuthUser');
			} else if (jwtToken.getRefreshToken()) {
				this.$store.dispatch('refreshToken');
			} else {
				this.$store.dispatch('getNewToken')
			}
		},
		onHide: function() {
		},
		methods: {
			setCustomBarHeight() {
				uni.getSystemInfo({
					success: function(e) {
						// #ifdef MP-QQ
						Vue.prototype.StatusBar = e.statusBarHeight;
						let QCustom = qq.getMenuButtonBoundingClientRect();
						if (JSON.stringify(QCustom) != "{}") {
							Vue.prototype.Custom = QCustom;
							Vue.prototype.CustomBar = QCustom.bottom + QCustom.top - e.statusBarHeight + 5;
						} else {
							Vue.prototype.CustomBar = 72;
						}
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	@import "colorui/main.css";
	/* @import "colorui/icon.css"; */
	@import "colorui/animation.css";
</style>
