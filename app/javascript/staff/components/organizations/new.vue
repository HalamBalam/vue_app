<template lang="pug">
  q-dialog(ref="dialog" v-model="newDialog" persistent @hide="pushToOrganizations")
    q-card
      div.q-pa-md(style="max-width: 330px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit" @reset="onReset")
          q-input(
            ref="name"
            filled
            v-model="$store.state.organizations.organization.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter organization`s name' ]"
          )

          q-radio(v-model="$store.state.organizations.organization.org_type" val="LE" label="Legal Entity")
          q-radio(v-model="$store.state.organizations.organization.org_type" val="IE" label="Individual Entrepreneur")

          q-input(
            ref="inn"
            filled
            v-model="$store.state.organizations.organization.inn"
            label="INN *"
            hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
            lazy-rules
            :rules="[ val => !!val && ($store.state.organizations.organization.org_type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value' ]"
          )

          q-input(
            ref="ogrn"
            filled
            v-model="$store.state.organizations.organization.ogrn"
            label="OGRN *"
            hint="Main state registration number (13 ch.)"
            lazy-rules
            :rules="[ val => !!val && val.length == 13 || 'Please enter correct value' ]"
          )

          div
            q-btn(label="Create" type="submit" color="primary")
            q-btn.q-ml-sm(label="Reset" type="reset" color="primary" flat)
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      newDialog: true
    }
  },

  methods: {
    ...mapActions({
      create: 'organizations/create'
    }),

    ...mapMutations({
      ORGANIZATION_INITIALIZE: 'organizations/ORGANIZATION_INITIALIZE'
    }),

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create()
          this.$refs.dialog.hide()
        }
      })
    },

    onReset () {
      this.ORGANIZATION_INITIALIZE()
      this.$refs.form.resetValidation()
    },

    pushToOrganizations () {
      this.$router.push({ name: 'organizations' })
    }
  }
}
</script>
