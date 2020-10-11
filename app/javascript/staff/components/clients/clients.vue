<template lang="pug">
  div(class="q-pa-md q-gutter-sm")
    q-dialog(v-model="errors" :position="'top'")
      q-card(style="width: 350px")
        q-card-section(class="row items-center no-wrap")
          div(class="text-weight-bold") {{ errorText }}

    q-btn(color="primary" label="New" @click="newClient = true")
    q-dialog(v-model="newClient" persistent)
      newClient(v-on:createClient="createClient")

    template(v-if="selected.length == 1")
      q-btn(color="primary" label="Edit" @click="editClientClick")
    q-dialog(v-model="editClient" persistent)
      editClient(:editClientId="editClientId", :editClientFullName="editClientFullName", :editClientPhone="editClientPhone", :editClientEmail="editClientEmail" v-on:updateClient="updateClient")

    template(v-if="selected.length > 0")
      q-btn(color="primary" label="Delete" @click="deleteClient = true")
    q-dialog(v-model="deleteClient" persistent)
      q-card
        q-card-section(class="row items-center")
          q-avatar(icon="delete" color="primary" text-color="white")
          span(class="q-ml-sm") Selected clients will be deleted.
        q-card-actions(align="right")
          q-btn(flat label="Cancel" color="primary" v-close-popup)
          q-btn(flat label="Delete" color="primary" v-close-popup @click="deleteClients")

    q-table(
      title="Clients"
      :data="data"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected")
</template>

<script>
import NewClient from './new.vue'
import EditClient from './edit.vue'

export default {
  name: 'Clients',
  data() {
    return {
      selected: [],
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone' },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email' }
      ],
      data: [],
      newClient: false,
      editClient: false,
      editClientId: null,
      editClientFullName: null,
      editClientPhone: null,
      editClientEmail: null,
      deleteClient: false,
      errors: false,
      errorText: ''
    }
  },
  created () {
    this.loadClients()
  },
  methods: {
    loadClients () {
      this.$api.clients.index()
      .then(({ data }) => {
        this.data = data
      })
    },

    createClient (fullName, phone, email) {
      this.$api.clients.create(fullName, phone, email)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: 'Created'
            })
            this.newClient = false
          }
        })
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadClients())
    },

    updateClient (fullName, phone, email, organizations) {
      this.$api.clients.update(this.editClientId, fullName, phone, email, organizations)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: 'Updated'
            })
            this.editClient = false
            this.selected = []
          }
        })
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadClients())
    },

    editClientClick () {
      let row = this.selected[0]

      this.editClientId = row.id
      this.editClientFullName = row.full_name
      this.editClientPhone = row.phone
      this.editClientEmail = row.email

      this.editClient = true
    },

    deleteClients () {
      this.selected.forEach((item, index, array) => {
        this.$api.clients.delete(item.id)
          .catch((response) => {
            this.errors = true
            this.errorText = response
          })
          .finally(() => {
            this.loadClients()
            this.selected = []
          })
      })
    },

    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  },
  components: {
    NewClient,
    EditClient
  }
}
</script>
