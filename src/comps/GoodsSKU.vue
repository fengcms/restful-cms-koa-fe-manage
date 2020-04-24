<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  name: 'GoodsSKU',
  props: {
    sku: {
      type: [Object, String],
      default: null
    }
  },
  data () {
    return {
      value: '-'
    }
  },
  watch: {
    sku: {
      handler: function (val, oldVal) {
        this.calcValue()
      },
      deep: true
    }
  },
  mounted () {
    this.calcValue()
  },
  methods: {
    calcValue () {
      if (this.sku && this.sku.skuSpecAttr && this.sku.skuSpecAttr.length) {
        const attrs = []
        this.sku.skuSpecAttr.forEach(i => attrs.push(i.attrName))
        this.value = attrs.join('/')
      }
    }
  }
}
</script>
