import Vue from 'vue'
import axios from 'axios'

const api = {
  currentStaff: () => axios.get('/current_staff'),

  stuffSignIn: () => axios.get('/staffs/sign_in'),
  stuffSignOut: () => axios.get('/staffs/sign_out'),

  clients: {
    index: () => axios.get('/clients'),
    create: (fullName, phone, email) => {
      return axios.post('/create_client', {
        client: {
          full_name: fullName,
          phone: phone,
          email: email,
          password: 'random_password'
        }
      })
    }
  }
}

Vue.prototype.$api = api
