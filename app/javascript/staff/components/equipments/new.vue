<template lang="pug">
  q-dialog(ref="dialog" v-model="newDialog" persistent @hide="pushToEquipments")
    q-card
      div.q-pa-md(style="max-width: 330px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit" @reset="onReset")
          q-input(
            ref="name"
            filled
            v-model="$store.state.equipments.equipment.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s name' ]"
          )

          q-input(
            ref="equipment_type"
            filled
            v-model="$store.state.equipments.equipment.equipment_type"
            label="Type *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s type' ]"
          )

          q-input(
            ref="serial_number"
            filled
            v-model="$store.state.equipments.equipment.serial_number"
            label="Serial number *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s serial number' ]"
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
      create: 'equipments/create'
    }),

    ...mapMutations({
      EQUIPMENT_INITIALIZE: 'equipments/EQUIPMENT_INITIALIZE'
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
      this.EQUIPMENT_INITIALIZE()
      this.$refs.form.resetValidation()
    },

    pushToEquipments () {
      this.$router.push({ name: 'equipments' })
    }
  }
}
</script>
