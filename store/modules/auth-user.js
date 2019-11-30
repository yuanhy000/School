import Vue from 'vue'
import jwtToken from './../../utils/jwt.js'

export default {
	state: {
		authentication: false,
		user_id: null,
		user_number: null,
		user_name: null,
		user_sex: null,
		user_created: null,
		user_avatar: null,
		user_school: null,
		user_attentions: null,
		user_followers: null,
		user_article_count: null,
		user_organization: null,
		user_notice_count: null,
	},

	mutations: {
		SET_AUTH_USER(state, payload) {
			// let authenticationTemp = state.authentication;
			for (let item in state) {
				state[item] = payload.user.data[item];
			}
		},

		INIT_AUTH_USER(state) {
			state.authentication = false;
			state.user_id = null;
			user_number = null;
			state.user_name = null;
			state.user_sex = null;
			state.user_created = null;
			state.user_shcool = null;
			state.user_attentions = null;
			state.user_followers = null;
			state.user_article_count = null;
			state.user_notice_count = null;
		},

		AUTHORIZED(state) {
			state.authentication = true;
		},

		SET_SCHOOL(state, payload) {
			state.user_shcool = payload.user_shcool;
			state.user_tip = true;
		},

		CLEAR_NOTICE_COUNT(state) {
			state.user_notice_count = 0;
		},

		ARTICLE_COUNT_INCREMENT(state) {
			state.user_article_count += 1;
		},
		ATTENTION_INCREMENT(state) {
			state.user_attentions += 1;
		},
		ATTENTION_DECREMENT(state) {
			state.user_attentions -= 1;
		},
		FOLLOWER_INCREMENT(state) {
			state.user_followers += 1;
		},
		FOLLOWER_DECREMENT(state) {
			state.user_followers -= 1;
		},
	},

	actions: {
		setAuthUser({
			commit,
			dispatch
		}) {
			Vue.prototype.$http.get('/user').then(res => {
				commit({
					type: 'SET_AUTH_USER',
					user: res.data
				})
				if (res.data.data.user_name != undefined && res.data.data.user_name != null && res.data.data.user_name != "") {
					commit({
						type: 'AUTHORIZED'
					})
				}
			}).catch(error => {
				dispatch('refreshToken');
			})
		},

		setSchool({
			commit,
			dispatch
		}, school) {
			return Vue.prototype.$http.request({
				url: '/users/school/set',
				method: 'POST',
				params: {
					school: school
				},
			}).then(res => {
				commit({
					type: 'SET_AUTH_USER',
					user: res.data
				})
				if (res.data.data.user_name != undefined && res.data.data.user_name != null) {
					commit({
						type: 'AUTHORIZED'
					})
				}
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
		clearNoticeCount({
			commit
		}) {
			commit({
				type: 'CLEAR_NOTICE_COUNT',
			})
		},
		articleCountIncrement({
			commit
		}) {
			commit({
				type: 'ARTICLE_COUNT_INCREMENT',
			})
		},
		attentionIncrement({
			commit
		}) {
			commit({
				type: 'ATTENTION_INCREMENT',
			})
		},
		attentionDecrement({
			commit
		}) {
			commit({
				type: 'ATTENTION_DECREMENT',
			})
		},
		followerIncrement({
			commit
		}) {
			commit({
				type: 'FOLLOWER_INCREMENT',
			})
		},
		followerDecrement({
			commit
		}) {
			commit({
				type: 'FOLLOWER_DECREMENT',
			})
		},
	}
}
