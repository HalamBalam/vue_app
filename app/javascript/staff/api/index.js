import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const api = {

  staffs: {
    current: () => axios.get('/current_staff'),
    signIn: () => axios.get('/staffs/sign_in'),
    signUp: () => axios.get('/staffs/sign_up'),
    signOut: () => axios.get('/staffs/sign_out')
  },

  clients: {
    index: (organization_id) => {
      if (organization_id == undefined) {
        return axios.get('/clients')
      } else {
        return axios.get(`/organizations/${organization_id}/clients`)
      }
    },
    create: (fullName, phone, email) => {
      return axios.post('/clients', {
        client: {
          full_name: fullName,
          phone: phone,
          email: email,
          password: 'random_password'
        }
      })
    },
    update: (id, fullName, phone, email, organizations) => {
      return axios.put(`/clients/${id}`, {
        client: {
          full_name: fullName,
          phone: phone,
          email: email,
          organizations: organizations
        }
      })
    },
    delete: (id) => axios.delete(`/clients/${id}`)
  },

  organizations: {
    index: (client_id) => {
      if (client_id == undefined) {
        return axios.get('/organizations')
      } else {
        return axios.get(`/clients/${client_id}/organizations`)
      }
    },
    create: (name, type, inn, ogrn) => {
      return axios.post('/organizations', {
        organization: {
          name: name,
          org_type: type,
          inn: inn,
          ogrn: ogrn
        }
      })
    },
    update: (id, name, type, inn, ogrn, clients) => {
      return axios.put(`/organizations/${id}`, {
        organization: {
          name: name,
          org_type: type,
          inn: inn,
          ogrn: ogrn,
          clients: clients
        }
      })
    },
    delete: (id) => axios.delete(`/organizations/${id}`)
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
