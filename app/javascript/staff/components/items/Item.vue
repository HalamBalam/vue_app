<template lang="pug">
  div
    slot(name="title" :firstname="item.firstname")
      p {{ item.firstname }}
    slot(name="button")
      button(@click="change") Change
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: Object
  },
  data () {
    return {}
  },
  methods: {
    change() {
      this.$emit('changed', this.item.id)
    }
  }
}
</script>
