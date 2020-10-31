import Vue from 'vue'

export default {
  state: {
    data: [],
    equipment: {
      name: null,
      equipment_type: null,
      serial_number: null
    }
  },

  actions: {
    fetch: (context) => {
      Vue.prototype.$api.equipments.index()
        .then(({ data }) => context.commit('SET_DATA', data))
    },

    show: (context, id) => {
      Vue.prototype.$api.equipments.show(id)
        .then(({ data }) => context.commit('EQUIPMENT_SHOW', data))
    },

    create: (context) => {
      Vue.prototype.$api.equipments.create(context.state.equipment)
        .then((response) => {
          context.dispatch('fetch')
          context.commit('EQUIPMENT_INITIALIZE')
        })
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    update: (context, id) => {
      Vue.prototype.$api.equipments.update(id, context.state.equipment)
        .then((response) => {
          context.dispatch('fetch')
          context.commit('EQUIPMENT_INITIALIZE')
        })
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    delete: (context, id) => {
      Vue.prototype.$api.equipments.delete(id)
        .then((response) => context.dispatch('fetch'))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    }
  },

  mutations: {
    SET_DATA: (state, payload) => {
      state.data = payload
    },

    EQUIPMENT_INITIALIZE: (state) => {
      state.equipment.name = null
      state.equipment.equipment_type = null
      state.equipment.serial_number = null
    },

    EQUIPMENT_SHOW: (state, equipment) => {
      state.equipment.name = equipment.name
      state.equipment.equipment_type = equipment.equipment_type
      state.equipment.serial_number = equipment.serial_number
    }
  },

  namespaced: true
}
