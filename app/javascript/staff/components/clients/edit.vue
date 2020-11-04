<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToClients")
    q-card
      div.q-pa-md(style="max-width: 400px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit")
          q-input(
            ref="fullName"
            filled
            v-model="$store.state.clients.client.full_name"
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
            v-model="$store.state.clients.client.phone"
            label="Phone's number *"
            lazy-rules
            hint="Mask: (###) ### - ####"
            :rules="[ val => !!val || 'Please enter client`s phone' ]"
          )

          q-input(
            ref="email"
            filled
            v-model="$store.state.clients.client.email"
            label="Email *"
            lazy-rules
            :rules="[ val => this.validEmail(val) || 'Please enter correct email' ]"
          )

          q-dialog(v-model="resetPasswordDialog")
            ResetPassword(@resetPassword="resetPassword")

          q-select(
            filled
            clearable
            v-model="$store.state.clients.client.organizations"
            multiple
            :options="organizations"
            label="Organizations"
            style="width: 250px"
            @clear="CLEAR_ORGANIZATIONS"
          )

          div
            q-btn(label="Update" type="submit" color="primary")
            q-btn.q-ml-sm(label="Reset Password" color="primary" flat @click="showResetPasswordDialog")
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)

</template>

<script>
import ResetPassword from '../reset_password/ResetPassword.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      editDialog: true,
      resetPasswordDialog: false,
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
    ...mapActions({
      show: 'clients/show',
      update: 'clients/update'
    }),

    ...mapMutations({
      CLEAR_ORGANIZATIONS: 'clients/CLEAR_ORGANIZATIONS'
    }),

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update(this.id)
          this.$refs.dialog.hide()
        }
      })
    },

    clientInitialize () {
      this.show(this.id)
      this.loadOrganizations()
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
    }
  },

  components: {
    ResetPassword
  }
}
</script>
