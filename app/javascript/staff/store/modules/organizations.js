import Vue from 'vue'

export default {
  state: {
    pagination: {
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: undefined
    },
    filter: '',
    data: [],
    organization: {
      name: null,
      org_type: 'LE',
      inn: null,
      ogrn: null,
      clients: [],
      equipments: []
    }
  },

  actions: {
    getRowsNumberCount: (context, filter) => {
      Vue.prototype.$api.organizations.count({ search: filter })
        .then(({ data }) => context.commit('SET_ROWS_NUMBER', data))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    fetch: (context, page, rowsPerPage, filter, sortBy, descending) => {
      const params = {
        page: page,
        rows_per_page: rowsPerPage,
        search: filter,
        sort_type: sortBy,
        sort_direction: descending ? 'desc' : 'asc'
      }

      Vue.prototype.$api.organizations.index(params)
        .then(({ data }) => context.commit('SET_DATA', data))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    show: (context, id) => {
      Vue.prototype.$api.organizations.show(id)
        .then(({ data }) => context.commit('ORGANIZATION_SHOW', data))
    },

    create: (context) => {
      Vue.prototype.$api.organizations.create(context.state.organization)
        .then((response) => context.commit('ORGANIZATION_INITIALIZE'))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    update: (context, id) => {
      context.commit('SET_VALUES_IN_LISTS')

      Vue.prototype.$api.organizations.update(id, context.state.organization)
        .then((response) => context.commit('ORGANIZATION_INITIALIZE'))
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    },

    delete: (context, id) => {
      Vue.prototype.$api.organizations.delete(id)
        .catch((response) => context.commit('SET_ERROR', response, { root: true }))
    }
  },

  mutations: {
    SET_PAGINATION: (state, newValue) => {
      state.pagination = newValue
    },

    SET_ROWS_NUMBER: (state, newValue) => {
      state.pagination.rowsNumber = newValue
    },

    SET_DATA: (state, payload) => {
      state.data.splice(0, state.data.length, ...payload)
    },

    DATA_ADD: (state, item) => {
      state.data.push(item)
    },

    DATA_UPDATE: (state, item) => {
      const index = state.data.findIndex(organization => organization.id === item.id)
      if (index !== -1) {
        state.data[index].name = item.name
        state.data[index].org_type = item.org_type
        state.data[index].inn = item.inn
        state.data[index].ogrn = item.ogrn
      }
    },

    DATA_DELETE: (state, item) => {
      const index = state.data.findIndex(organization => organization.id === item.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    },

    ORGANIZATION_INITIALIZE: (state) => {
      state.organization.name = null
      state.organization.org_type = 'LE'
      state.organization.inn = null
      state.organization.ogrn = null

      state.organization.clients = []
      state.organization.equipments = []
    },

    ORGANIZATION_SHOW: (state, organization) => {
      state.organization.name = organization.name
      state.organization.org_type = organization.org_type
      state.organization.inn = organization.inn
      state.organization.ogrn = organization.ogrn

      for (const item of organization.clients) {
        state.organization.clients.push({
          label: item.full_name,
          value: item.id
        })
      }

      for (const item of organization.equipments) {
        state.organization.equipments.push({
          label: item.name,
          value: item.id
        })
      }
    },

    SET_VALUES_IN_LISTS: (state) => {
      state.organization.clients = state.organization.clients.map(item => item.value)
      state.organization.equipments = state.organization.equipments.map(item => item.value)
    },

    CLEAR_CLIENTS: (state) => {
      state.organization.clients = []
    },

    CLEAR_EQUIPMENTS: (state) => {
      state.organization.equipments = []
    }
  },

  namespaced: true
}
