<template lang="pug">
  q-card
    div(class="q-pa-md" style="max-width: 330px")
      form(@submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md")
        q-input(
          ref="name"
          filled
          v-model="name"
          label="Name *"
          lazy-rules
          :rules="[ val => !!val || 'Please enter organization`s name' ]"
        )

        q-radio(v-model="type" val="LE" label="Legal Entity")
        q-radio(v-model="type" val="IE" label="Individual Entrepreneur")

        q-input(
          ref="inn"
          filled
          v-model="inn"
          label="INN *"
          hint="Taxpayer identification number (LE - 10 ch., IE - 12 ch.)"
          lazy-rules
          :rules="[ val => !!val && (this.type == 'LE' ? val.length == 10 : val.length == 12) || 'Please enter correct value' ]"
        )

        q-input(
          ref="ogrn"
          filled
          v-model="ogrn"
          label="OGRN *"
          hint="Main state registration number (13 ch.)"
          lazy-rules
          :rules="[ val => !!val && val.length == 13 || 'Please enter correct value' ]"
        )

        div
          q-btn(label="Create" type="submit" color="primary")
          q-btn(label="Reset" type="reset" color="primary" flat class="q-ml-sm")
          q-btn(label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup)
</template>

<script>
export default {
  data () {
    return {
      name: null,
      type: 'LE',
      inn: null,
      ogrn: null
    }
  },

  methods: {
    onSubmit () {
      this.$refs.name.validate()
      this.$refs.inn.validate()
      this.$refs.ogrn.validate()

      if (this.$refs.name.hasError || this.$refs.inn.hasError || this.$refs.ogrn.hasError) {
        this.formHasError = true
      }
      else {
        this.$emit('createOrganization', this.name, this.type, this.inn, this.ogrn)
      }
    },

    onReset () {
      this.name = null
      this.type = 'LE'
      this.inn = null
      this.ogrn = null
      
      this.$refs.name.resetValidation()
      this.$refs.inn.resetValidation()
      this.$refs.ogrn.resetValidation()
    }
  }
}
</script>
