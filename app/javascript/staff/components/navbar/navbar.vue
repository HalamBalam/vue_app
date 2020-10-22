<template lang="pug">
  q-header.bg-primary.text-white(reveal elevated height-hint="98")
    q-toolbar
      q-avatar
        img(src="/logo.jpg")
      template(v-if="userSignedIn")
        q-toolbar-title Welcome, {{ user }}
        .q-pa-md.q-gutter-sm
          q-btn(dense flat @click="showResetPasswordDialog") Reset Password
          q-btn(dense flat @click="logOut") Exit

        q-dialog(v-model="resetPasswordDialog")
          ResetPassword(@resetPassword="resetPassword")

      template(v-else)
        q-toolbar-title Please, log in to the system
        .q-pa-md.q-gutter-sm
          q-btn(dense flat @click="logIn") Log in
          q-btn(dense flat @click="newStaff") New staff
</template>

<script>
import ResetPassword from '../reset_password/ResetPassword.vue'

export default {
  name: 'Navbar',
  data () {
    return {
      resetPasswordDialog: false
    }
  },

  props: {
    user: {
      type: String,
      required: true
    },
    userSignedIn: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    logIn () {
      this.$api.staffs.signIn()
        .then(({ data }) => {
          this.$emit('staffAuthorization', data)
        })
    },

    logOut () {
      this.$api.staffs.signOut()
        .then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
    },

    newStaff () {
      this.$api.staffs.signUp()
        .then(({ data }) => {
          this.$emit('staffAuthorization', data)
        })
    },

    showResetPasswordDialog () {
      this.resetPasswordDialog = true
    },

    resetPassword (newPassword) {
      this.$api.staffs.resetPassword(newPassword)
        .then(() => this.resetPasswordDialog = false)
    }
  },

  components: {
    ResetPassword
  }
}
</script>
