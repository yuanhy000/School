import Vue from 'vue'
import App from './App'

import Request from './js_sdk/pocky-request/index'
Vue.prototype.$http = Request();

import store from './store/index.js'
Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import tabbar from './components/tabbar/tabbar.vue'
Vue.component('tabbar', tabbar)

import addition from './pages/addition/addition.vue'
Vue.component('addition', addition)

import chat from './pages/chat/chat.vue'
Vue.component('chat', chat)

import stores from './pages/store/store.vue'
Vue.component('store', stores)

import discovery from './pages/discovery/discovery.vue'
Vue.component('discovery', discovery)

import user from './pages/user/user.vue'
Vue.component('user', user)

import authorization from './pages/authorization/authorization.vue'
Vue.component('authorization', authorization)

import search from './pages/search/search.vue'
Vue.component('search', search)

import loading from './components/loading/loading.vue'
Vue.component('loading', loading)

import notification from './components/notification/notification.vue'
Vue.component('notification', notification)


// import vantTransition from './vantui/components/vant/transition/index'
// Vue.component('vantTransition', vantTransition)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
