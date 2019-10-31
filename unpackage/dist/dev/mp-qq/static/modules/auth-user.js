import Vue from 'vue'
import jwtToken from './../../utils/jwt.js'

export default {
	state: {
		authentication: false,
		user_id: null,
		user_name: null,
		user_sex: null,
		user_created: null,
		user_avatar: null,
	},

	mutations: {

		SET_AUTH_USER(state, payload) {
			let authenticationTemp = state.authentication;
			for (let item in state) {
				state[item] = payload.user.data[item];
			}
			state.authentication = authenticationTemp;
		},

		INIT_AUTH_USER(state) {
			state.authentication = false;
			state.user_id = null;
			state.user_name = null;
			state.user_sex = null;
			state.user_created = null;
		},

		AUTHORIZED(state) {
			state.authentication = true;
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
				console.log(res.data)
				commit({
					type: 'SET_AUTH_USER',
					user: res.data
				})
			})
		},
		authorized({
			commit
		}) {
			commit({
				type: 'AUTHORIZED',
			})
		},
		initAuthUser({
			commit
		}) {
			commit({
				type: 'INIT_AUTH_USER',
			})
		},

	}
}
