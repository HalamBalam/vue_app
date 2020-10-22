<template lang="pug">
  q-dialog(ref="dialog" v-model="newDialog" persistent @hide="pushToOrganizations")
    q-card
      div.q-pa-md(style="max-width: 330px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit" @reset="onReset")
          q-input(
            ref="name"
            filled
            v-model="organization.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter organization`s name' ]"
          )

          q-radio(v-model="organization.org_type" val="LE" label="Legal Entity")
          q-radio(v-model="organization.org_type" val="IE" label="Individual Entrepreneur")

          q-input(
            ref="inn"
            filled
            v-model="organization.inn"
            label="INN *"
            hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
            lazy-rules
            :rules="[ val => !!val && (this.organization.type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value' ]"
          )

          q-input(
            ref="ogrn"
            filled
            v-model="organization.ogrn"
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
export default {
  data () {
    return {
      organization: this.organizationInitialize(),
      newDialog: true
    }
  },

  methods: {
    organizationInitialize () {
      return {
        name: null,
        org_type: 'LE',
        inn: null,
        ogrn: null
      }
    },

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$emit('createOrganization', this.organization)
          this.$refs.dialog.hide()
        }
      })
    },

    onReset () {
      this.organization = this.organizationInitialize()

      this.$refs.form.resetValidation()
    },

    pushToOrganizations () {
      this.$router.push({ name: 'organizations' })
    }
  }
}
</script>
