import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import MyNav from '@/components/MyNav.vue';

Vue.config.productionTip = false

Vue.component("MyNav",MyNav);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
