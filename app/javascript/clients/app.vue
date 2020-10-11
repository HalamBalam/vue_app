<template lang="pug">
  #app
    template(v-if="loading")
      q-spinner(color="primary" size="3em")
    template(v-else-if="error")
      p Error :-(
    template(v-else)
      q-layout(view="hHh lpr fff")

        navbar(:user="currentClient || ''", :userSignedIn="!!currentClient" v-on:clientAuthorization="clientAuthorization")

        dashboard(:rawHtml="rawHtml", :userSignedIn="!!currentClient")

        <q-footer elevated class="bg-grey-8 text-white">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
              </q-avatar>
              Title
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
</template>

<script>
import Navbar from './components/navbar/navbar.vue'
import Dashboard from './components/dashboard/dashboard.vue'

export default {
  data () {
    return {
      loading: true,
      error: false,
      currentClient: null,
      rawHtml: ''
    }
  },

  created () {
    this.setCurrentClient()
  },

  methods: {
    setCurrentClient () {
      this.loading = true

      this.$api.clients.current()
      .then(({ data }) => {
        this.currentClient = data
      })
      .catch(() => (this.error = true))
      .finally(() => this.loading = false)
    },

    clientAuthorization (data) {
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
