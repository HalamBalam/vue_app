<template>
  <q-card>
    <div class="q-pa-md" style="max-width: 430px">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <q-input
          ref="name"
          filled
          v-model="name"
          label="Name *"
          lazy-rules
          :rules="[ 
            val => val !== null && val !== '' || 'Please enter organization\'s name'
          ]"
        />

        <q-radio v-model="type" val="LE" label="Legal Entity" />
        <q-radio v-model="type" val="IE" label="Individual Entrepreneur" />

        <q-input
          ref="inn"
          filled
          v-model="inn"
          label="INN *"
          hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
          lazy-rules
          :rules="[
            val => val && (this.type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value'
          ]"
        />

        <q-input
          ref="ogrn"
          filled
          v-model="ogrn"
          label="OGRN *"
          hint="Main state registration number (13 ch.)"
          lazy-rules
          :rules="[
            val => val && val.length == 13 || 'Please enter correct value'
          ]"
        />

        <q-table
          title="Clients"
          :data="data"
          :columns="columns"
          row-key="id"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        />

        <div>
          <q-btn label="Update" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
        </div>
      </form>
    </div>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      id: this.editOrganizationId,
      name: this.editOrganizationName,
      type: this.editOrganizationType,
      inn: this.editOrganizationINN,
      ogrn: this.editOrganizationOGRN,

      selected: [],
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone' },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email' }
      ],
      data: []
    }
  },

  props: ['editOrganizationId', 'editOrganizationName', 'editOrganizationType', 'editOrganizationINN', 'editOrganizationOGRN'],

  created () {
    this.loadClients()
  },

  methods: {
    onSubmit () {
      this.$refs.name.validate()
      this.$refs.inn.validate()
      this.$refs.ogrn.validate()

      if (this.$refs.name.hasError || this.$refs.inn.hasError || this.$refs.ogrn.hasError) {
        this.formHasError = true
      }
      else {
        let clients = []
        for (let item of this.selected) {
          clients.push(item.id)
        }

        this.$emit('updateOrganization', this.name, this.type, this.inn, this.ogrn, clients)
      }
    },

    onReset () {
      this.name = null
      this.type = 'LE'
      this.inn = null
      this.ogrn = null

      this.$refs.name.resetValidation()
      this.$refs.inn.resetValidation()
      this.$refs.ogrn.resetValidation()
    },

    loadClients () {
      this.$api.clients.index()
      .then(({ data }) => {
        this.data = data

        this.$api.clients.index(this.id)
        .then(({ data }) => {
          for (let item of this.data) {
            let result = data.find(organizations_client => organizations_client.id == item.id)
            if (result) {
              this.selected.push(result)
            }
          }
        })
      })
    },

     getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  }
}
</script>
