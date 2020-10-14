<template lang="pug">
  q-header(reveal elevated class="bg-primary text-white" height-hint="98")
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
          q-btn(dense flat @click="newStaff") New staff
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
    }
  }
}
</script>
