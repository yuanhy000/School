import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import tabbar from './components/tabbar/tabbar.vue'
Vue.component('tabbar', tabbar)

import chat from './pages/chat/chat.vue'
Vue.component('chat', chat)

import contacts from './pages/contacts/contacts.vue'
Vue.component('contacts', contacts)

import discovery from './pages/discovery/discovery.vue'
Vue.component('discovery', discovery)

import user from './pages/user/user.vue'
Vue.component('user', user)

import authorization from './pages/authorization/authorization.vue'
Vue.component('authorization', authorization)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


