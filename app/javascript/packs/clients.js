import Vue from 'vue'
import App from '../clients/app.vue'
import '../clients/api'
import '../clients/quasar'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
})
