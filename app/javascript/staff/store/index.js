import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import organizations from './modules/organizations'
import clients from './modules/clients'
import equipments from './modules/equipments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: false,
    errorText: ''
  },

  mutations: {
    SET_ERROR: (state, errorText) => {
      state.error = true
      state.errorText = errorText
    }
  },
  
  modules: {
    organizations,
    clients,
    equipments
  },

  plugins: [createPersistedState()]
})
