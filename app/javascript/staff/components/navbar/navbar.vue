<template lang="pug">
  div
    img(src="/logo.jpg")
    template(v-if="userSignedIn")
      span Welcome, {{ user }}
      button(@click="logOut") Exit
    template(v-else)
      span Please, log in to the system
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
    logOut () {
      this.$api.stuffSignOut()
        .then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
    }
  }
}
</script>
