<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(v-model="errors" :position="'top'")
      q-card(style="width: 350px")
        q-card-section(class="row items-center no-wrap")
          .text-weight-bold {{ errorText }}

    q-btn(color="primary" label="New" @click="newOrganization = true")
    q-dialog(v-model="newOrganization" persistent)
      newOrganization(v-on:createOrganization="createOrganization")

    template(v-if="selected.length == 1")
      q-btn(color="primary" label="Edit" @click="editOrganizationClick")
    q-dialog(v-model="editOrganization" persistent)
      editOrganization(
        :editOrganizationId="editOrganizationId",
        :editOrganizationName="editOrganizationName",
        :editOrganizationType="editOrganizationType",
        :editOrganizationINN="editOrganizationINN",
        :editOrganizationOGRN="editOrganizationOGRN"
        v-on:updateOrganization="updateOrganization")

    template(v-if="selected.length > 0")
      q-btn(color="primary" label="Delete" @click="deleteOrganization = true")
    q-dialog(v-model="deleteOrganization" persistent)
      q-card
        q-card-section(class="row items-center")
          q-avatar(icon="delete" color="primary" text-color="white")
          span(class="q-ml-sm") Selected organizations will be deleted.
        q-card-actions(align="right")
          q-btn(flat label="Cancel" color="primary" v-close-popup)
          q-btn(flat label="Delete" color="primary" v-close-popup @click="deleteOrganizations")

    q-table(
      title="Organizations"
      :data="data"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected")
</template>

<script>
import NewOrganization from './new.vue'
import EditOrganization from './edit.vue'

export default {
  name: 'Organizations',
  data() {
    return {
      selected: [],
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'org_type', required: true, label: 'Type', align: 'left', field: 'org_type' },
        { name: 'inn', required: true, label: 'INN', align: 'left', field: 'inn' },
        { name: 'ogrn', required: true, label: 'OGRN', align: 'left', field: 'ogrn' }
      ],
      data: [],
      newOrganization: false,
      editOrganization: false,
      editOrganizationId: null,
      editOrganizationName: null,
      editOrganizationType: null,
      editOrganizationINN: null,
      editOrganizationOGRN: null,
      deleteOrganization: false,
      errors: false,
      errorText: ''
    }
  },

  created () {
    this.loadOrganizations()
  },
  
  methods: {
    loadOrganizations () {
      this.$api.organizations.index()
      .then(({ data }) => {
        this.data = data
      })
    },

    createOrganization (name, type, inn, ogrn) {
      this.$api.organizations.create(name, type, inn, ogrn)
        .then((response) => {
          this.newOrganization = false
        })
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadOrganizations())
    },

    updateOrganization (name, type, inn, ogrn, clients) {
      this.$api.organizations.update(this.editOrganizationId, name, type, inn, ogrn, clients)
        .then((response) => {
          this.editOrganization = false
          this.selected = []
        })
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadOrganizations())
    },

    editOrganizationClick () {
      let row = this.selected[0]

      this.editOrganizationId = row.id
      this.editOrganizationName = row.name
      this.editOrganizationType = row.org_type
      this.editOrganizationINN = row.inn
      this.editOrganizationOGRN = row.ogrn

      this.editOrganization = true
    },

    deleteOrganizations () {
      this.selected.forEach((item, index, array) => {
        this.$api.organizations.delete(item.id)
          .catch((response) => {
            this.errors = true
            this.errorText = response
          })
          .finally(() => {
            this.loadOrganizations()
            this.selected = []
          })
      })
    },

    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  },
  components: {
    NewOrganization,
    EditOrganization
  }
}
</script>
