import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './custom.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons' 

library.add(faUserSecret)
library.add(faTrash)
library.add(faEdit)
library.add(faFontAwesome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

