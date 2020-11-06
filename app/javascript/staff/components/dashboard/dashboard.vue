<template lang="pug">
  div
    q-drawer(show-if-above v-model="left" side="left" bordered content-class="bg-grey-3")
      q-scroll-area.fit
        q-list
          template(v-for="(menuItem, index) in menuList")
            q-item(
              :key="index"
              clickable
              :active="currentMenuItem === index"
              v-ripple
              @click="menuItemClick(menuItem, index)"
            )
              q-item-section(avatar)
                q-icon(:name="menuItem.icon")
              q-item-section {{ menuItem.label }}
            q-separator(:key="'sep' + index"  v-if="menuItem.separator")

    q-page-container
      q-page
        template(v-if="!!rawHtml")
          span(v-html="rawHtml")
        template(v-else-if="userSignedIn")
          router-view

</template>

<script>
import Clients from '../clients/clients.vue'
import Organizations from '../organizations/organizations.vue'

const menuList = [
  {
    icon: 'people',
    label: 'Clients',
    separator: false,
    route: 'clients'
  },
  {
    icon: 'apartment',
    label: 'Organizations',
    separator: true,
    route: 'organizations'
  },
  {
    icon: 'construction',
    label: 'Equipments',
    separator: false,
    route: 'equipments'
  }
]

export default {
  data () {
    return {
      left: false,
      menuList,
      currentMenuItem: 0
    }
  },
  name: 'Dashboard',
  props: ['rawHtml', 'userSignedIn'],

  created () {
    this.currentMenuItem = this.menuList.findIndex(item => item.route === this.$route.name)
  },

  methods: {
    menuItemClick (menuItem, index) {
      this.currentMenuItem = index
      if (this.$route.name !== menuItem.route) {
        this.$router.push({ name: menuItem.route })
      }
    }
  },

  components: {
    Clients,
    Organizations
  }
}
</script>
