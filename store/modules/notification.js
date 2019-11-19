import Vue from 'vue'

export default {
	state: {
		notification_display: false,
		notification_content: '',
		notification_type: '',
	},

	mutations: {

		SET_NOTIFICATION(state, payload) {
			state.notification_display = true;
			state.notification_content = payload.notification_content;
			state.notification_type = payload.notification_type;
		},

		INIT_NOTIFICATION(state) {
			state.notification_display = false;
			state.notification_content = '';
			state.notification_type = '';
			console.log(state)
		},
	},

	actions: {
		setNotification({
			commit,
			dispatch
		}, data) {
			commit({
				type: 'SET_NOTIFICATION',
				notification_content: data.notification_content,
				notification_type: data.notification_type
			})
		},

		initNotification({
			commit
		}) {
			commit({
				type: 'INIT_NOTIFICATION',
			})
		},

	}
}
