import Vue from 'vue'
import jwtToken from './../../utils/jwt.js'

export default {
	actions: {
		getNewToken({
			dispatch
		}, code) {
			qq.login({
				success: res => {
					return Vue.prototype.$http.request({
						url: '/token/get',
						method: 'POST',
						params: {
							code: res.code
						},
					}).then(res => {
						dispatch('getTokenSuccess', res.data);
					}).catch(error => {})
				}
			})

		},

		getTokenSuccess({
			dispatch
		}, tokenResponse) {
			jwtToken.setToken(tokenResponse.access_token);
			jwtToken.setRefreshToken(tokenResponse.refresh_token);
			dispatch('setAuthUser');
		},

		cleanToken({
			dispatch
		}) {
			Vue.prototype.$http.request({
				url: '/token/clean',
				method: 'POST',
				params: {
					code: res.code
				},
			}).then(res => {
				jwtToken.removeToken();
				dispatch('initAuthUser');
			})
		},

		refreshToken({
			commit,
			dispatch
		}) {
			Vue.prototype.$http.request({
				method: 'POST',
				url: '/token/refresh',
				params: {
					refresh_token: jwtToken.getRefreshToken()
				},
			}).then(res => {
				console.log('9999999')
				dispatch('getTokenSuccess', res.data);
			}).catch(error => {
				dispatch('cleanToken');
				dispatch('getNewToken');
			})
		},
	}
}
