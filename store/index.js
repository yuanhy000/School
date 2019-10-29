import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Token from './modules/token.js'
import AuthUser from './modules/auth-user.js'

export default new Vuex.Store({
	modules: {
		AuthUser,
		Token,
		// Notification,
		// SearchStatus,
		// ChatINfo
	},
	strict: true
})
