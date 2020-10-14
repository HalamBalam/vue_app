<template lang="pug">
  div
    q-drawer(show-if-above v-model="left" side="left" bordered content-class="bg-grey-3")
      q-scroll-area(class="fit")
        q-list
          template(v-for="(menuItem, index) in menuList")
            q-item(
              :key="index"
              clickable
              :active="currentMenuItem === index"
              v-ripple
              @click="currentMenuItem = index"
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
          template(v-if="currentMenuItem === 0")
            clients
          template(v-if="currentMenuItem === 1")
            organizations

</template>

<script>
import Clients from '../clients/clients.vue'
import Organizations from '../organizations/organizations.vue'

  const menuList = [
  {
    icon: 'people',
    label: 'Clients',
    separator: true
  },
  {
    icon: 'apartment',
    label: 'Organizations',
    separator: false
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
  components: {
    Clients,
    Organizations
  }
}
</script>
