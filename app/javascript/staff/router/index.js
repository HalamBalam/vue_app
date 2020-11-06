import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Clients from '../components/clients/clients.vue'
import NewClient from '../components/clients/new.vue'
import EditClient from '../components/clients/edit.vue'

import Organizations from '../components/organizations/organizations.vue'
import NewOrganization from '../components/organizations/new.vue'
import EditOrganization from '../components/organizations/edit.vue'

import Equipments from '../components/equipments/equipments.vue'
import NewEquipment from '../components/equipments/new.vue'
import EditEquipment from '../components/equipments/edit.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/staffs' },
    {
      path: '/staffs/clients',
      component: Clients,
      name: 'clients',
      children: [
        { path: '/staffs/clients/new', component: NewClient, name: 'new_client' },
        { path: '/staffs/clients/:id', component: EditClient, name: 'edit_client' }
      ]
    },

    {
      path: '/staffs/organizations',
      component: Organizations,
      name: 'organizations',
      children: [
        { path: '/staffs/organizations/new', component: NewOrganization, name: 'new_organization' },
        { path: '/staffs/organizations/:id', component: EditOrganization, name: 'edit_organization' }
      ]
    },

    {
      path: '/staffs/equipments',
      component: Equipments,
      name: 'equipments',
      children: [
        { path: '/staffs/equipments/new', component: NewEquipment, name: 'new_equipment' },
        { path: '/staffs/equipments/:id', component: EditEquipment, name: 'edit_equipment' }
      ]
    }
  ]
})

export default router
