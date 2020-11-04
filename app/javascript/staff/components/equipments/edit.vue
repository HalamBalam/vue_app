<template lang="pug">
  q-dialog(ref="dialog" v-model="editDialog" persistent @hide="pushToEquipments")
    q-card
      div.q-pa-md(style="max-width: 550px")
        q-form.q-gutter-md(ref="form" @submit="onSubmit")
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
            q-btn(label="Update" type="submit" color="primary")
            q-btn.q-ml-sm(label="Cancel" color="primary" flat v-close-popup)
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      editDialog: true
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
    ...mapActions({
      show: 'equipments/show',
      update: 'equipments/update'
    }),

    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update(this.id)
          this.$refs.dialog.hide()
        }
      })
    },

    equipmentInitialize () {
      this.show(this.id)
    },

    pushToEquipments () {
      this.$router.push({ name: 'equipments' })
    }
  }
}
</script>
