import Vue from 'vue'
import amapFile from '../../js_sdk/amap-wx.js';
import {
	config
} from './../../utils/config.js'
const key = config.mapkey;

export default {
	state: {
		is_search: false,
		search_keyword: '',
	},
	mutations: {
		SET_SEARCH_KEYWORD(state, payload) {
			state.is_search = true;
			state.search_keyword = payload.search_keyword;
		},
		INIT_SEARCH_KEYWORD(state, payload) {
			state.is_search = false;
			state.search_keyword = '';
		},

	},
	actions: {
		setSearchKeyword({
			commit
		}, search_keyword) {
			commit({
				type: 'SET_SEARCH_KEYWORD',
				search_keyword: search_keyword
			})
		},

		initSearchKeyword({
			commit
		}) {
			commit({
				type: 'INIT_SEARCH_KEYWORD',
			})
		},

		getAroundPoi({
			dispatch
		}, data) {
			return Vue.prototype.$http.get('https://restapi.amap.com/v3/place/around?key=' + key +
				'&location=' + data.latitude + ',' + data.longitude + '&keywords=' + data.keywords + '&page=' + data.page +
				'&extensions=' + data.extensions + '&sortrule=' + data.sortrule + '&radius=' + data.radius)
		},

		getInputTips({
			dispatch
		}, data) {
			return Vue.prototype.$http.get('https://restapi.amap.com/v3/assistant/inputtips?key=' + key + '&keywords=' + data.keywords +
				'&location=' + data.latitude + ',' + data.longitude + '&datatype=' + data.datatype)
		}
	}
}
