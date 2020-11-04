<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(v-model="error" :position="'top'")
      q-card(style="width: 350px")
        q-card-section.row.items-center.no-wrap
          .text-weight-bold {{ errorText }}

    q-btn(color="primary" unelevated label="New" @click="newOrganizationClick")

    router-view

    q-dialog(v-model="deleteDialog" persistent)
      q-card
        q-card-section.row.items-center
          q-avatar(icon="delete" color="primary" text-color="white")
          span.q-ml-sm Selected organization will be deleted.
        q-card-actions(align="right")
          q-btn(label="Delete" color="primary" v-close-popup @click="deleteOrganization")
          q-btn(flat label="Cancel" color="primary" v-close-popup)

    q-table(
      title="Organizations"
      :data="$store.state.organizations.data"
      :columns="columns"
      row-key="id"
      :pagination.sync="$store.state.organizations.pagination"
      :loading="loading"
      :filter="$store.state.organizations.filter"
      @request="onRequest"
      binary-state-sort
    )
      template(v-slot:top-right)
        q-input(borderless dense debounce="300" v-model="$store.state.organizations.filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")
      template(v-slot:body-cell-actions="props")
        td.text-right
          q-btn(@click="editOrganizationClick(props.row.id)" text-color="orange-5" icon="fas fa-edit")
          q-btn(@click="deleteOrganizationClick(props.row.id)" text-color="red-5" icon="fas fa-trash-alt")
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Organizations',
  data() {
    return {
      loading: false,
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id' },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'org_type', required: true, label: 'Type', align: 'left', field: 'org_type' },
        { name: 'inn', required: true, label: 'INN', align: 'left', field: 'inn', sortable: true },
        { name: 'ogrn', required: true, label: 'OGRN', align: 'left', field: 'ogrn', sortable: true },
        { name: 'actions', label: 'Actions' }
      ],
      deleteDialog: false,
      currentOrganizationId: null
    }
  },

  channels: {
    OrganizationsChannel: {
      connected() {},
      rejected() {},
      received(data) {
        if (data.created) {
          this.DATA_ADD(data.created)
        }

        if (data.updated) {
          this.DATA_UPDATE(data.updated)
        }

        if (data.destroyed) {
          this.DATA_DELETE(data.destroyed)
        }
      },
      disconnected() {}
    }
  },

  computed: {
    ...mapState({
      errorText: state => state.errorText,
      error: state => state.error
    })
  },

  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.$store.state.organizations.pagination,
      filter: this.$store.state.organizations.filter
    })

    this.$cable.subscribe({
      channel: 'OrganizationsChannel'
    })
  },
  
  methods: {
    ...mapActions({
      getRowsNumberCount: 'organizations/getRowsNumberCount',
      fetch: 'organizations/fetch',
      deleteCurrentOrganization: 'organizations/delete'
    }),

    ...mapMutations({
      SET_PAGINATION: 'organizations/SET_PAGINATION',
      DATA_ADD: 'organizations/DATA_ADD',
      DATA_UPDATE: 'organizations/DATA_UPDATE',
      DATA_DELETE: 'organizations/DATA_DELETE'
    }),

    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      this.loading = true

      // update rowsCount with appropriate value
      this.getRowsNumberCount(filter)

      // fetch data from "server"
      this.fetch(page, rowsPerPage, filter, sortBy, descending)

      // don't forget to update local pagination object
      this.SET_PAGINATION({ page, rowsPerPage, sortBy, descending })

      // ...and turn of loading indicator
      this.loading = false
    },

    newOrganizationClick () {
      this.$router.push({ name: 'new_organization' })
    },

    editOrganizationClick (id) {
      this.$router.push({ name: 'edit_organization', params: { id } })
    },

    deleteOrganizationClick (id) {
      this.deleteDialog = true
      this.currentOrganizationId = id
    },

    deleteOrganization () {
      this.deleteCurrentOrganization(this.currentOrganizationId)
      this.currentOrganizationId = null
    }
  }
}
</script>
