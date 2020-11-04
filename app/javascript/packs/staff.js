import Vue from 'vue'
import App from '../staff/app.vue'
import '../staff/api'
import '../staff/quasar'
import router from '../staff/router'
import store from '../staff/store'
import '../staff/socket'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  }).$mount()
})
