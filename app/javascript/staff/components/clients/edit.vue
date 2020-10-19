<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToClients")
    q-card
      div(class="q-pa-md" style="max-width: 400px")
        q-form(ref="form" @submit="onSubmit" class="q-gutter-md")
          q-input(
            ref="fullName"
            filled
            v-model="client.full_name"
            label="Full name *"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => !!val && val.length >= 5 || 'Please enter client`s full name' ]"
          )

          q-input(
            ref="phone"
            filled
            mask="(###) ### - ####"
            unmasked-value
            v-model="client.phone"
            label="Phone's number *"
            lazy-rules
            hint="Mask: (###) ### - ####"
            :rules="[ val => !!val || 'Please enter client`s phone' ]"
          )

          q-input(
            ref="email"
            filled
            v-model="client.email"
            label="Email *"
            lazy-rules
            :rules="[ val => this.validEmail(val) || 'Please enter correct email' ]"
          )

          q-dialog(v-model="resetPasswordDialog")
            ResetPassword(@resetPassword="resetPassword")

          q-select(
            filled
            clearable
            v-model="client.organizations"
            multiple
            :options="organizations"
            label="Organizations"
            style="width: 250px"
            @clear="clearOrganizations"
          )

          div
            q-btn(label="Update" type="submit" color="primary")
            q-btn(label="Reset Password" color="primary" flat class="q-ml-sm" @click="showResetPasswordDialog")
            q-btn(label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup)

</template>

<script>
import ResetPassword from '../reset_password/ResetPassword.vue'

export default {
  data () {
    return {
      editDialog: true,
      resetPasswordDialog: false,
      client: {
        full_name: null,
        phone: null,
        email: null,
        organizations: []
      },
      organizations: []
    }
  },
 
  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.clientInitialize()
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.client.organizations = this.client.organizations.map(item => item.value)

          this.$emit('updateClient', this.id, this.client)
          this.$refs.dialog.hide()
        }
      })
    },

    clientInitialize () {
      this.$api.clients.show(this.id)
      .then(({ data }) => {
        this.client.full_name = data.full_name
        this.client.phone = data.phone
        this.client.email = data.email

        for (let item of data.organizations) {
          this.client.organizations.push({
            label: item.name,
            value: item.id
          })
        }

        this.loadOrganizations()
      })
    },

    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    loadOrganizations () {
      this.$api.organizations.index()
        .then(({ data }) => {
          for (let item of data) {
            this.organizations.push({
              label: item.name,
              value: item.id
            })
          }
        })
    },

    pushToClients () {
      this.$router.push({ name: 'clients' })
    },

    showResetPasswordDialog () {
      this.resetPasswordDialog = true
    },

    resetPassword (newPassword) {
      this.$api.clients.resetPassword(this.id, newPassword)
        .then(() => this.resetPasswordDialog = false)
    },

    clearOrganizations () {
      this.client.organizations = []
    }
  },

  components: {
    ResetPassword
  }
}
</script>
