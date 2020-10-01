import Vue from 'vue'
import App from '../staff/app1.vue'
import '../staff/api'
import '../staff/quasar'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
})
