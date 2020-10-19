<template lang="pug">
  q-dialog(ref="dialog" v-model="newDialog" persistent @hide="pushToEquipments")
    q-card
      div(class="q-pa-md" style="max-width: 330px")
        q-form(ref="form" @submit="onSubmit" @reset="onReset" class="q-gutter-md")
          q-input(
            ref="name"
            filled
            v-model="equipment.name"
            label="Name *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s name' ]"
          )

          q-input(
            ref="equipment_type"
            filled
            v-model="equipment.equipment_type"
            label="Type *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s type' ]"
          )

          q-input(
            ref="serial_number"
            filled
            v-model="equipment.serial_number"
            label="Serial number *"
            lazy-rules
            :rules="[ val => !!val || 'Please enter equipment`s serial number' ]"
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
      equipment: this.equipmentInitialize(),
      newDialog: true
    }
  },

  methods: {
    equipmentInitialize () {
      return {
        name: null,
        equipment_type: null,
        serial_number: null
      }
    },

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$emit('createEquipment', this.equipment)
          this.$refs.dialog.hide()
        }
      })
    },

    onReset () {
      this.equipment = this.equipmentInitialize()

      this.$refs.form.resetValidation()
    },

    pushToEquipments () {
      this.$router.push({ name: 'equipments' })
    }
  }
}
</script>
