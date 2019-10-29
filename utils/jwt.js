export default {
	setToken(token) {
		uni.setStorageSync('jwt_token', token);
	},

	getToken() {
		return uni.getStorageSync('jwt_token');
	},

	setRefreshToken(refresh_token) {
		uni.setStorageSync('refresh_token', refresh_token);
	},

	getRefreshToken() {
		return uni.getStorageSync('refresh_token');
	},

	removeToken() {
		uni.removeStorageSync('jwt_token');
		uni.removeStorageSync('refresh_token');
	},

}
