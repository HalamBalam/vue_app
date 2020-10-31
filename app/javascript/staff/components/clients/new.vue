<template lang="pug">
  q-dialog(ref="dialog" v-model="newDialog" persistent @hide="pushToClients")
    q-card
      div.q-pa-md(style="max-width: 330px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit" @reset="onReset")
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

          q-input(
            ref="password"
            filled
            v-model="$store.state.clients.client.password"
            :type="hidePassword ? 'password' : 'text'"
            label="Password"
            lazy-rules
            :rules="[ val => !!val || 'Please enter client`s password' ]"
          )
            template(v-slot:append)
              q-icon.cursor-pointer(
                :name="hidePassword ? 'visibility_off' : 'visibility'"
                @click="hidePassword = !hidePassword"
              )

          q-input(
            ref="passwordConfirmation"
            filled
            v-model="$store.state.clients.client.passwordConfirmation"
            :type="hidePasswordConfirmation ? 'password' : 'text'"
            label="Confirm password"
            lazy-rules
            :rules="[ val => val == $store.state.clients.client.password || 'Invalid password confirmation' ]"
          )
            template(v-slot:append)
              q-icon.cursor-pointer(
                :name="hidePasswordConfirmation ? 'visibility_off' : 'visibility'"
                @click="hidePasswordConfirmation = !hidePasswordConfirmation"
              )

          div
            q-btn(label="Create" type="submit" color="primary")
            q-btn.q-ml-sm(label="Reset" type="reset" color="primary" flat)
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      newDialog: true,
      hidePassword: true,
      hidePasswordConfirmation: true
    }
  },

  methods: {
    ...mapActions({
      create: 'clients/create'
    }),

    ...mapMutations({
      CLIENT_INITIALIZE: 'clients/CLIENT_INITIALIZE'
    }),

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create()
          this.$refs.dialog.hide()
        }
      })
    },

    onReset () {
      this.CLIENT_INITIALIZE()
      this.$refs.form.resetValidation()
    },
    
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    pushToClients () {
      this.$router.push({ name: 'clients' })
    }
  }
}
</script>
