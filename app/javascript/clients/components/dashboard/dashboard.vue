<template lang="pug">
  q-page-container
    q-page
      template(v-if="!!rawHtml")
        span(v-html="rawHtml")
      template(v-else-if="userSignedIn")
        q-table(
          title="Organizations"
          :data="data"
          :columns="columns"
          row-key="id")

</template>

<script>
export default {
  data () {
    return {
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'right', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'org_type', required: true, label: 'Type', align: 'left', field: 'org_type' },
        { name: 'inn', required: true, label: 'INN', align: 'left', field: 'inn' },
        { name: 'ogrn', required: true, label: 'OGRN', align: 'left', field: 'ogrn' }
      ],
      data: []
    }
  },
  name: 'Dashboard',
  props: ['rawHtml', 'userSignedIn'],

  created () {
    this.loadOrganizations()
  },

  methods: {
    loadOrganizations () {
      this.$api.organizations.index()
        .then(({ data }) => {
          this.data = data
        })
    }
  }
}
</script>
