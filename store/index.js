import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Token from './modules/token.js'
import AuthUser from './modules/auth-user.js'
import UserLocation from './modules/user-location.js'
import MapPoi from './modules/map-poi.js'

export default new Vuex.Store({
	modules: {
		AuthUser,
		Token,
		UserLocation,
		MapPoi
		// SearchStatus,
		// ChatINfo
	},
	strict: true
})
