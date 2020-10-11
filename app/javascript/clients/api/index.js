import Vue from 'vue'
import axios from 'axios'

const api = {

  clients: {
    current: () => axios.get('/current_client'),
    signIn: () => axios.get('/clients/sign_in'),
    signUp: () => axios.get('/clients/sign_up'),
    signOut: () => axios.get('/clients/sign_out')
  },

  organizations: {
    index: () => axios.get('/organizations')
  }
}

Vue.prototype.$api = api
