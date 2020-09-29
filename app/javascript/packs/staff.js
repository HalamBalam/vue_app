import Vue from 'vue'
import App from '../staff/app.vue'
import '../staff/api'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
})
