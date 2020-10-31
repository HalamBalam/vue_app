import Vue from 'vue'

export default {
  state: {
    data: [],
    client: {
      full_name: null,
      phone: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      organizations: []
    }
  },

  actions: {
    fetch: (context) => {
      Vue.prototype.$api.clients.index()
        .then(({ data }) => context.commit('SET_DATA', data))
    },

    show: (context, id) => {
      Vue.prototype.$api.clients.show(id)
        .then(({ data }) => context.commit('CLIENT_SHOW', data))
    },

    create: (context) => {
      Vue.prototype.$api.clients.create(context.state.client)
        .then((response) => {
          context.dispatch('fetch')
          context.commit('CLIENT_INITIALIZE')
        })
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    update: (context, id) => {
      context.commit('SET_VALUES_IN_LISTS')
      
      Vue.prototype.$api.clients.update(id, context.state.client)
        .then((response) => {
          context.dispatch('fetch')
          context.commit('CLIENT_INITIALIZE')
        })
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    delete: (context, id) => {
      Vue.prototype.$api.clients.delete(id)
        .then((response) => context.dispatch('fetch'))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    }
  },

  mutations: {
    SET_DATA: (state, payload) => {
      state.data = payload
    },

    CLIENT_INITIALIZE: (state) => {
      state.client.full_name = null
      state.client.phone = null
      state.client.email = null
      state.client.password = null
      state.client.passwordConfirmation = null
      state.client.organizations = []
    },

    CLIENT_SHOW: (state, client) => {
      state.client.full_name = client.full_name
      state.client.phone = client.phone
      state.client.email = client.email

      for (let item of client.organizations) {
        state.client.organizations.push({
          label: item.name,
          value: item.id
        })
      }
    },

    SET_VALUES_IN_LISTS: (state) => {
      state.client.organizations = state.client.organizations.map(item => item.value)
    },

    CLEAR_ORGANIZATIONS: (state) => {
      state.client.organizations = []
    },
  },

  namespaced: true
}
