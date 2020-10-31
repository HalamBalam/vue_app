<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToOrganizations")
    q-card
      div.q-pa-md(style="max-width: 550px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit")
          q-input(
            ref="name"
            filled
            v-model="$store.state.organizations.organization.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter organization`s name' ]"
          )

          q-radio(v-model="$store.state.organizations.organization.org_type" val="LE" label="Legal Entity")
          q-radio(v-model="$store.state.organizations.organization.org_type" val="IE" label="Individual Entrepreneur")

          q-input(
            ref="inn"
            filled
            v-model="$store.state.organizations.organization.inn"
            label="INN *"
            hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
            lazy-rules
            :rules="[ val => !!val && ($store.state.organizations.organization.org_type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value' ]"
          )

          q-input(
            ref="ogrn"
            filled
            v-model="$store.state.organizations.organization.ogrn"
            label="OGRN *"
            hint="Main state registration number (13 ch.)"
            lazy-rules
            :rules="[ val => !!val && val.length == 13 || 'Please enter correct value' ]"
          )

          q-select(
            filled
            clearable
            v-model="$store.state.organizations.organization.clients"
            multiple
            :options="clients"
            label="Clients"
            style="width: 250px"
            @clear="CLEAR_CLIENTS"
          )

          q-select(
            filled
            clearable
            v-model="$store.state.organizations.organization.equipments"
            multiple
            :options="equipments"
            label="Equipment"
            style="width: 250px"
            @clear="CLEAR_EQUIPMENTS"
          )

          div
            q-btn(label="Update" type="submit" color="primary")
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      editDialog: true,
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
    ...mapActions({
      show: 'organizations/show',
      update: 'organizations/update'
    }),

    ...mapMutations({
      CLEAR_CLIENTS: 'organizations/CLEAR_CLIENTS',
      CLEAR_EQUIPMENTS: 'organizations/CLEAR_EQUIPMENTS'
    }),

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update(this.id)
          this.$refs.dialog.hide()
        }
      })
    },

    organizationInitialize () {
      this.show(this.id)

      this.loadClients()
      this.loadEquipments()
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
    }
  }
}
</script>
