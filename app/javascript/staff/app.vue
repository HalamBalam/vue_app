<template lang="pug">
  #app
    template(v-if="loading")
      p Loading ...
    template(v-else-if="error")
      p Error :-(
    template(v-else)
      navbar(:user="currentStaff || ''", :userSignedIn="!!currentStaff")
      dashboard
      div(v-for="item in items" :key="item.id")
        item(:item="item" @changed="change")
          template(v-slot:title="{ firstname }")
            item-title(:title="firstname")
          template(v-slot:button)
            button Not change
</template>

<script>
import Navbar from './components/navbar/navbar.vue'
import Dashboard from './components/dashboard/dashboard.vue'
import Item from './components/items/Item.vue'
import ItemTitle from './components/items/ItemTitle.vue'

export default {
  data () {
    return {
      loading: true,
      error: false,
      currentStaff: null,
      items: []
    }
  },
  created () {
    this.setCurrentStaff()
    this.fetchItems()
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
    },
    async fetchItems () {
      this.loading = true
      try {
        const response = await this.$api.items.index()
        this.items = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },
    change (id) {
      console.log(`Change ${id} item`)
    }
  },
  components: {
    Navbar,
    Dashboard,
    Item,
    ItemTitle
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
