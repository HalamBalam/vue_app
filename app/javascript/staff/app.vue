<template lang="pug">
  #app
    template(v-if="loading")
      q-spinner(color="primary" size="3em")
    template(v-else-if="error")
      p Error :-(
    template(v-else)
      q-layout(view="hHh lpr fff")

        navbar(:user="currentStaff || ''", :userSignedIn="!!currentStaff" v-on:staffAuthorization="staffAuthorization")

        dashboard(:rawHtml="rawHtml", :userSignedIn="!!currentStaff")

        q-footer(elevated class="bg-grey-8 text-white")
          q-toolbar
            q-toolbar-title
              q-avatar
                img(src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg")
</template>

<script>
import Navbar from './components/navbar/navbar.vue'
import Dashboard from './components/dashboard/dashboard.vue'

export default {
  data () {
    return {
      loading: true,
      error: false,
      currentStaff: null,
      rawHtml: ''
    }
  },
  created () {
    this.setCurrentStaff()
  },
  methods: {
    setCurrentStaff () {
      this.loading = true

      this.$api.staffs.current()
      .then(({ data }) => {
        this.currentStaff = data
      })
      .catch(() => (this.error = true))
      .finally(() => this.loading = false)
    },
    staffAuthorization (data) {
      this.rawHtml = data
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
