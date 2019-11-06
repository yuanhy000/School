import Vue from 'vue'
import amapFile from '../../js_sdk/amap-wx.js';
import {
	config
} from './../../utils/config.js'
const key = config.mapkey;

export default {
	actions: {
		getAroundPoi({
			dispatch
		}, data) {
			return Vue.prototype.$http.get('https://restapi.amap.com/v3/place/around?key=' + key +
				'&location=' + data.latitude + ',' + data.longitude + '&keywords=' + data.keywords + '&page=' + data.page +
				'&extensions=' + data.extensions + '&sortrule=' + data.sortrule)
		},

		getInputTips({
			dispatch
		}, data) {
			return Vue.prototype.$http.get('https://restapi.amap.com/v3/assistant/inputtips?key=' + key + '&keywords=' + data.keywords +
				'&location=' + data.latitude + ',' + data.longitude + '&datatype=' + data.datatype)
		}
	}
}
