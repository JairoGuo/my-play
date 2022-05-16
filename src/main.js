import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import ElementUI from 'element-ui'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import Moment from 'moment'

import PortalVue from 'portal-vue';
import 'semantic-ui-css/semantic.min.css'
import 'element-ui/lib/theme-chalk/index.css'

import api from './api'
import router from './router'
import store from "./store"




Vue.config.productionTip = false

Vue.use(SuiVue)
Vue.use(ElementUI)
Vue.use(Moment)
Vue.use(PortalVue)
// Vue.use(VueAxios, axios)

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
