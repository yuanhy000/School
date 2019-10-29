import Vue from 'vue'
import jwtToken from './../../utils/jwt.js'

export default {
	state: {
		authentication: false,
		user_id: null,
		user_name: null,
		user_sex: null,
		user_created: null,
	},

	mutations: {

		SET_AUTH_USER(state, payload) {
			for (let item in state) {
				state[item] = payload.user.data[item];
			}
			state.authentication = true;
		},

		INIT_AUTH_USER(state) {
			state.authentication = false;
			state.user_id = null;
			state.user_name = null;
			state.user_sex = null;
			state.user_created = null;
		}
	},

	actions: {
		setAuthUser({
			commit,
			dispatch
		}) {
			return Vue.prototype.$http.get('/user').then(res => {
				commit({
					type: 'SET_AUTH_USER',
					user: res.data
				})
			}).catch(error => {
				dispatch('refreshToken');
			})
		},

		updateUserInfo({
			commit,
			dispatch
		}, userInfo) {
			return Vue.prototype.$http.request({
				url: '/users/update',
				method: 'POST',
				params: {
					user_name: userInfo.nickName,
					user_avatar: userInfo.avatarUrl,
					user_sex: userInfo.gender
				}
			}).then(res => {
				commit({
					type: 'SET_AUTH_USER',
					user: res.data
				})
			})
		},


		initAuthUser({
			commit
		}) {
			commit({
				type: 'INIT_AUTH_USER',
			})
		},

		refreshToken({
			commit,
			dispatch
		}) {
			return Vue.prototype.$http.request({
				method: 'POST',
				url: '/token/refresh',
				params: {
					refresh_token: jwtToken.getRefreshToken()
				},
			}).then(res => {
				dispatch('getTokenSuccess', res.data);
			}).catch(error => {
				console.log('clean token')
				dispatch('cleanToken');
				dispatch('getNewToken');
			})
		},
	}
}
