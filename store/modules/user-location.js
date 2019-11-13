import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js';

let qqmapsdk = new QQMapWX({
	key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J'
});

export default {
	state: {
		user_address: null,
		user_address_component: {
			city: null,
			district: null,
			nation: null,
			province: null,
			street: null,
			street_number: null,
		},
		user_location: {
			latitude: 0,
			longitude: 0,
		}
	},

	mutations: {

		SET_LOCATION(state, payload) {
			state.user_address = payload.location.address;
			for (let item in state.user_address_component) {
				state.user_address_component[item] = payload.location.address_component[item];
			}
			state.user_location.latitude = payload.location.location.lat;
			state.user_location.longitude = payload.location.location.lng;
		},

		INIT_AUTH_USER(state) {
			state.user_adress = null;
			state.user_adress_component = {
				user_city: null,
				user_district: null,
				user_nation: null,
				user_province: null,
				user_street: null,
				user_street_number: null,
			};
			state.user_location = {
				user_latitude: 0,
				user_longitude: 0,
			};
		},
	},

	actions: {
		requestUserLocation({
			commit,
			dispatch
		}) {
			qq.getLocation({
				type: 'gcj02',
				success(res) {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success(res) {
							dispatch('setUserLocation', res.result);
						}
					})
				}
			})
		},
		
		setUserLocation({
			commit
		}, location) {
			commit({
				type: 'SET_LOCATION',
				location: location
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
