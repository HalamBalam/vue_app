<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToEquipments")
    q-card
      div(class="q-pa-md" style="max-width: 550px")
        q-form(ref="form" @submit="onSubmit" class="q-gutter-md")
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
            q-btn(label="Update" type="submit" color="primary")
            q-btn(label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup)
</template>

<script>
export default {
  data () {
    return {
      editDialog: true,
      equipment: {
        name: null,
        equipment_type: null,
        serial_number: null
      }
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.equipmentInitialize()
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$emit('updateEquipment', this.id, this.equipment)
          this.$refs.dialog.hide()
        }
      })
    },

    equipmentInitialize () {
      this.$api.equipments.show(this.id)
        .then(({ data }) => {
          this.equipment.name = data.name
          this.equipment.equipment_type = data.equipment_type
          this.equipment.serial_number = data.serial_number
        })
    },

    pushToEquipments () {
      this.$router.push({ name: 'equipments' })
    }
  }
}
</script>
