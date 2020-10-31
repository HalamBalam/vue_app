<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(v-model="$store.state.error" :position="'top'")
      q-card(style="width: 350px")
        q-card-section.row.items-center.no-wrap
          .text-weight-bold {{ errorText }}

    q-btn(color="primary" unelevated label="New" @click="newClientClick")

    router-view
    
    q-dialog(v-model="deleteDialog" persistent)
      q-card
        q-card-section.row.items-center
          q-avatar(icon="delete" color="primary" text-color="white")
          span.q-ml-sm Selected client will be deleted.
        q-card-actions(align="right")
          q-btn(label="Delete" color="primary" v-close-popup @click="deleteClient")
          q-btn(flat label="Cancel" color="primary" v-close-popup)

    q-table(
      title="Clients"
      :data="$store.state.clients.data"
      :columns="columns"
      row-key="id"
    )
      template(v-slot:body-cell-actions="props")
        td.text-right
          q-btn(@click="editClientClick(props.row.id)" text-color="orange-5" icon="fas fa-user-edit")
          q-btn(@click="deleteClientClick(props.row.id)" text-color="red-5" icon="fas fa-user-minus")
</template>

<script>
import { mapState, mapActions, } from 'vuex'

export default {
  name: 'Clients',
  data() {
    return {
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone' },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email' },
        { name: 'actions', label: 'Actions' }
      ],
      deleteDialog: false,
      currentClientId: null
    }
  },

  computed: {
    ...mapState({
      errorText: state => state.errorText
    })
  },

  created () {
    this.fetch()
  },

  methods: {
    ...mapActions({
      fetch: 'clients/fetch',
      deleteCurrentClient: 'clients/delete'
    }),

    newClientClick () {
      this.$router.push({ name: 'new_client' })
    },

    editClientClick (id) {
      this.$router.push({ name: 'edit_client', params: { id } })
    },

    deleteClientClick (id) {
      this.deleteDialog = true
      this.currentClientId = id
    },

    deleteClient () {
      this.deleteCurrentClient(this.currentClientId)
      this.currentClientId = null
    }
  }
}
</script>
