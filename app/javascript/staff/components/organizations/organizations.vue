<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(v-model="errors" :position="'top'")
      q-card(style="width: 350px")
        q-card-section(class="row items-center no-wrap")
          .text-weight-bold {{ errorText }}

    q-btn(color="primary" unelevated label="New" @click="newOrganizationClick")

    router-view(
      @createOrganization="createOrganization"
      @updateOrganization="updateOrganization"
    )

    q-dialog(v-model="deleteDialog" persistent)
      q-card
        q-card-section(class="row items-center")
          q-avatar(icon="delete" color="primary" text-color="white")
          span(class="q-ml-sm") Selected organization will be deleted.
        q-card-actions(align="right")
          q-btn(label="Delete" color="primary" v-close-popup @click="deleteOrganization")
          q-btn(flat label="Cancel" color="primary" v-close-popup)

    q-table(
      title="Organizations"
      :data="data"
      :columns="columns"
      row-key="id"
    )
      template(v-slot:body-cell-actions="props")
        td.text-right
          q-btn(@click="editOrganizationClick(props.row.id)" text-color="orange-5" icon="fas fa-edit")
          q-btn(@click="deleteOrganizationClick(props.row.id)" text-color="red-5" icon="fas fa-trash-alt")
</template>

<script>
export default {
  name: 'Organizations',
  data() {
    return {
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'org_type', required: true, label: 'Type', align: 'left', field: 'org_type' },
        { name: 'inn', required: true, label: 'INN', align: 'left', field: 'inn' },
        { name: 'ogrn', required: true, label: 'OGRN', align: 'left', field: 'ogrn' },
        { name: 'actions', label: 'Actions' }
      ],
      data: [],
      deleteDialog: false,
      currentOrganizationId: null,
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

    newOrganizationClick () {
      this.$router.push({ name: 'new_organization' })
    },

    createOrganization (organization) {
      this.$api.organizations.create(organization)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadOrganizations())
    },

    editOrganizationClick (id) {
      this.$router.push({ name: 'edit_organization', params: { id } })
    },

    updateOrganization (id, organization) {
      this.$api.organizations.update(id, organization)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadOrganizations())
    },

    deleteOrganizationClick (id) {
      this.deleteDialog = true
      this.currentOrganizationId = id
    },

    deleteOrganization () {
      this.$api.organizations.delete(this.currentOrganizationId)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => {
          this.loadOrganizations()
          this.currentOrganizationId = null
        })
    }
  }
}
</script>
