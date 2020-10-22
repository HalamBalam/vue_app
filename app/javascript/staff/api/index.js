import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const token = document.head.querySelector('meta[name="csrf-token"]').content

const adapter = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'X-CSRF-TOKEN': token
  }
})

const api = {

  staffs: {
    current: () => adapter.get('/current_staff'),
    signIn: () => axios.get('/staffs/sign_in'),
    signUp: () => axios.get('/staffs/sign_up'),
    signOut: () => axios.get('/staffs/sign_out'),
    resetPassword: (newPassword) => adapter.put('/staffs/reset_password', { password: newPassword })
  },

  clients: {
    index: () => adapter.get('/clients'),
    show: (id) => adapter.get(`/clients/${id}`),
    create: (params) => adapter.post('/clients', params),
    update: (id, params) => adapter.put(`/clients/${id}`, { client: params }),
    delete: (id) => adapter.delete(`/clients/${id}`),
    resetPassword: (id, newPassword) => adapter.put(`/clients/${id}/reset_password`, { password: newPassword })
  },

  organizations: {
    index: () => adapter.get('/organizations'),
    show: (id) => adapter.get(`/organizations/${id}`),
    create: (params) => adapter.post('/organizations', params),
    update: (id, params) => adapter.put(`/organizations/${id}`, { organization: params }),
    delete: (id) => adapter.delete(`/organizations/${id}`)
  },

  equipments: {
    index: () => adapter.get('/equipments'),
    show: (id) => adapter.get(`/equipments/${id}`),
    create: (params) => adapter.post('/equipments', params),
    update: (id, params) => adapter.put(`/equipments/${id}`, { equipment: params }),
    delete: (id) => adapter.delete(`/equipments/${id}`)
  }
}

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.config.method == 'post') {
      Notify.create({
        icon: 'done',
        color: 'positive',
        message: 'Created'
      })
    }

    if (response.config.method == 'put') {
      Notify.create({
        icon: 'done',
        color: 'positive',
        message: 'Updated'
      })
    }

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

Vue.prototype.$api = api
