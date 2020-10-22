<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToOrganizations")
    q-card
      div.q-pa-md(style="max-width: 550px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit")
          q-input(
            ref="name"
            filled
            v-model="organization.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter organization`s name' ]"
          )

          q-radio(v-model="organization.org_type" val="LE" label="Legal Entity")
          q-radio(v-model="organization.org_type" val="IE" label="Individual Entrepreneur")

          q-input(
            ref="inn"
            filled
            v-model="organization.inn"
            label="INN *"
            hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
            lazy-rules
            :rules="[ val => !!val && (this.organization.org_type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value' ]"
          )

          q-input(
            ref="ogrn"
            filled
            v-model="organization.ogrn"
            label="OGRN *"
            hint="Main state registration number (13 ch.)"
            lazy-rules
            :rules="[ val => !!val && val.length == 13 || 'Please enter correct value' ]"
          )

          q-select(
            filled
            clearable
            v-model="organization.clients"
            multiple
            :options="clients"
            label="Clients"
            style="width: 250px"
            @clear="clearClients"
          )

          q-select(
            filled
            clearable
            v-model="organization.equipments"
            multiple
            :options="equipments"
            label="Equipment"
            style="width: 250px"
            @clear="clearEquipments"
          )

          div
            q-btn(label="Update" type="submit" color="primary")
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
export default {
  data () {
    return {
      editDialog: true,
      organization: {
        name: null,
        org_type: null,
        inn: null,
        ogrn: null,
        clients: [],
        equipments: []
      },
      clients: [],
      equipments: []
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.organizationInitialize()
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.organization.clients = this.organization.clients.map(item => item.value)
          this.organization.equipments = this.organization.equipments.map(item => item.value)
          
          this.$emit('updateOrganization', this.id, this.organization)
          this.$refs.dialog.hide()
        }
      })
    },

    organizationInitialize () {
      this.$api.organizations.show(this.id)
        .then(({ data }) => {
          this.organization.name = data.name
          this.organization.org_type = data.org_type
          this.organization.inn = data.inn
          this.organization.ogrn = data.ogrn

          for (let item of data.clients) {
            this.organization.clients.push({
              label: item.full_name,
              value: item.id
            })
          }

          for (let item of data.equipments) {
            this.organization.equipments.push({
              label: item.name,
              value: item.id
            })
          }
          
          this.loadClients()
          this.loadEquipments()
        })
    },

    loadClients () {
      this.$api.clients.index()
        .then(({ data }) => {
          for (let item of data) {
            this.clients.push({
              label: item.full_name,
              value: item.id
            })
          }
        })
    },

    loadEquipments () {
      this.$api.equipments.index()
        .then(({ data }) => {
          for (let item of data) {
            this.equipments.push({
              label: item.name,
              value: item.id
            })
          }
        })
    },
    
    pushToOrganizations () {
      this.$router.push({ name: 'organizations' })
    },

    clearClients() {
      this.organization.clients = []
    },

    clearEquipments() {
      this.organization.equipments = []
    }
  }
}
</script>
