import Vue from 'vue'
import App from '../staff/app.vue'
import '../staff/api'
import '../staff/quasar'
import router from '../staff/router'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  }).$mount()
})
