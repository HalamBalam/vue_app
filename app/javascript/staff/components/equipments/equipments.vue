<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(v-model="errors" :position="'top'")
      q-card(style="width: 350px")
        q-card-section(class="row items-center no-wrap")
          .text-weight-bold {{ errorText }}

    q-btn(color="primary" unelevated label="New" @click="newEquipmentClick")

    router-view(
      @createEquipment="createEquipment"
      @updateEquipment="updateEquipment"
    )

    q-dialog(v-model="deleteDialog" persistent)
      q-card
        q-card-section(class="row items-center")
          q-avatar(icon="delete" color="primary" text-color="white")
          span(class="q-ml-sm") Selected equipment will be deleted.
        q-card-actions(align="right")
          q-btn(label="Delete" color="primary" v-close-popup @click="deleteEquipment")
          q-btn(flat label="Cancel" color="primary" v-close-popup)

    q-table(
      title="Equipments"
      :data="data"
      :columns="columns"
      row-key="id"
    )
      template(v-slot:body-cell-actions="props")
        td.text-right
          q-btn(@click="editEquipmentClick(props.row.id)" text-color="orange-5" icon="fas fa-edit")
          q-btn(@click="deleteEquipmentClick(props.row.id)" text-color="red-5" icon="fas fa-trash-alt")
</template>

<script>
export default {
  name: 'Equipments',
  data() {
    return {
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'equipment_type', required: true, label: 'Type', align: 'left', field: 'equipment_type' },
        { name: 'serial_number', required: true, label: 'Serial Number', align: 'left', field: 'serial_number' },
        { name: 'actions', label: 'Actions' }
      ],
      data: [],
      deleteDialog: false,
      currentEquipmentId: null,
      errors: false,
      errorText: ''
    }
  },

  created () {
    this.loadEquipments()
  },
  
  methods: {
    loadEquipments () {
      this.$api.equipments.index()
      .then(({ data }) => {
        this.data = data
      })
    },

    newEquipmentClick () {
      this.$router.push({ name: 'new_equipment' })
    },

    createEquipment (equipment) {
      this.$api.equipments.create(equipment)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadEquipments())
    },

    editEquipmentClick (id) {
      this.$router.push({ name: 'edit_equipment', params: { id } })
    },

    updateEquipment (id, equipment) {
      this.$api.equipments.update(id, equipment)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => this.loadEquipments())
    },

    deleteEquipmentClick (id) {
      this.deleteDialog = true
      this.currentEquipmentId = id
    },

    deleteEquipment () {
      this.$api.equipments.delete(this.currentEquipmentId)
        .catch((response) => {
          this.errors = true
          this.errorText = response
        })
        .finally(() => {
          this.loadEquipments()
          this.currentEquipmentId = null
        })
    }
  }
}
</script>
