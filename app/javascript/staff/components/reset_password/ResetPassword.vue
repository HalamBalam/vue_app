<template lang="pug">
  q-card
    q-card-section.q-gutter-md
      q-input(
        ref="password"
        filled
        v-model="password"
        :type="hidePassword ? 'password' : 'text'"
        label="New password"
        lazy-rules
        :rules="[ val => !!val || 'Please enter new password' ]"
      )
        template(v-slot:append)
          q-icon.cursor-pointer(
            :name="hidePassword ? 'visibility_off' : 'visibility'"
            @click="hidePassword = !hidePassword"
          )
      q-input(
        ref="passwordConfirmation"
        filled
        v-model="passwordConfirmation"
        :type="hidePasswordConfirmation ? 'password' : 'text'"
        label="Confirm password"
        lazy-rules
        :rules="[ val => val == this.password || 'Invalid password confirmation' ]"
      )
        template(v-slot:append)
          q-icon.cursor-pointer(
            :name="hidePasswordConfirmation ? 'visibility_off' : 'visibility'"
            @click="hidePasswordConfirmation = !hidePasswordConfirmation"
          )
      .q-gutter-sm
        q-btn(label="Reset" color="primary" @click="resetPassword")
        q-btn(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      password: null,
      passwordConfirmation: null,
      hidePassword: true,
      hidePasswordConfirmation: true
    }
  },

  methods: {
    resetPassword () {
      this.$refs.password.validate()
      this.$refs.passwordConfirmation.validate()

      if (!this.$refs.password.hasError && !this.$refs.passwordConfirmation.hasError) {
        this.$emit('reset-password', this.password)
      }
    }
  }
}
</script>
