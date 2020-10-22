<template lang="pug">
  q-header.bg-primary.text-white(reveal elevated height-hint="98")
    q-toolbar
      q-avatar
        img(src="/logo.jpg")
      template(v-if="userSignedIn")
        q-toolbar-title Welcome, {{ user }}
        q-btn(dense flat @click="logOut") Exit
      template(v-else)
        q-toolbar-title Please, log in to the system
        .q-pa-md.q-gutter-sm
          q-btn(dense flat @click="logIn") Log in
</template>

<script>
export default {
  name: 'Navbar',
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
      this.$api.clients.signIn()
        .then(({ data }) => {
          this.$emit('clientAuthorization', data)
        })
    },

    logOut () {
      this.$api.clients.signOut()
        .then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
    },

    newClient () {
      this.$api.clients.signUp()
        .then(({ data }) => {
          this.$emit('clientAuthorization', data)
        })
    }
  }
}
</script>
