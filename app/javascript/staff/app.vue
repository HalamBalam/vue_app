<template lang="pug">
  #app
    template(v-if="loading")
      p Loading ...
    template(v-else-if="error")
      p Error :-(
    template(v-else)
      navbar(:user="currentStaff || ''", :userSignedIn="!!currentStaff")
      dashboard
</template>

<script>
import Navbar from './components/navbar/navbar.vue'
import Dashboard from './components/dashboard/dashboard.vue'

export default {
  data () {
    return {
      loading: true,
      error: false,
      currentStaff: null
    }
  },
  created () {
    this.setCurrentStaff()
  },
  methods: {
    setCurrentStaff () {
      this.loading = true

      this.$api.currentStaff()
      .then(({ data }) => {
        this.currentStaff = data
      })
      .catch(() => (this.error = true))
      .finally(() => this.loading = false)
    }
  },
  components: {
    Navbar,
    Dashboard
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
