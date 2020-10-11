<template>
  <q-card>
    <div class="q-pa-md" style="max-width: 430px">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <q-input
          ref="fullName"
          filled
          v-model="fullName"
          label="Full name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length >= 5 || 'Please enter client\'s full name']"
        />

        <q-input
          ref="phone"
          filled
          mask="(###) ### - ####"
          unmasked-value
          v-model="phone"
          label="Phone's number *"
          lazy-rules
          hint="Mask: (###) ### - ####"
          :rules="[
            val => val !== null && val !== '' && val !== undefined || 'Please enter client\'s phone'
          ]"
        />

        <q-input
          ref="email"
          filled
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[
            val => this.validEmail(val) || 'Please enter correct email'
          ]"
        />

        <q-table
          title="Organizations"
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
      id: this.editClientId,
      fullName: this.editClientFullName,
      phone: this.editClientPhone,
      email: this.editClientEmail,

      data: [],
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'org_type', required: true, label: 'Type', align: 'left', field: 'org_type' },
        { name: 'inn', required: true, label: 'INN', align: 'left', field: 'inn' },
        { name: 'ogrn', required: true, label: 'OGRN', align: 'left', field: 'ogrn' }
      ],
      selected: []
    }
  },

  props: ['editClientId', 'editClientFullName', 'editClientPhone', 'editClientEmail'],
 
  created () {
    this.loadOrganizations()
  },

  methods: {
    onSubmit () {
      this.$refs.fullName.validate()
      this.$refs.phone.validate()
      this.$refs.email.validate()

      if (this.$refs.fullName.hasError || this.$refs.phone.hasError || this.$refs.email.hasError) {
        this.formHasError = true
      }
      else {
        let organizations = []
        for (let item of this.selected) {
          organizations.push(item.id)
        }

        this.$emit('updateClient', this.fullName, this.phone, this.email, organizations)
      }
    },

    onReset () {
      this.fullName = null
      this.phone = null
      this.email = null

      this.$refs.fullName.resetValidation()
      this.$refs.phone.resetValidation()
      this.$refs.email.resetValidation()
    },

    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    loadOrganizations () {
      this.$api.organizations.index()
      .then(({ data }) => {
        this.data = data

        this.$api.organizations.index(this.id)
        .then(({ data }) => {
          for (let item of this.data) {
            let result = data.find(clients_organization => clients_organization.id == item.id)
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
