<template>
  <el-image
    v-if="src"
    class="niao-table-image"
    fit="cover"
    :src="src"
    :preview-src-list="preview"
  />
</template>
<script>
export default {
  name: 'TableImage',
  props: {
    src: {
      type: String, default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    preview () {
      return [this.src]
    }
  }
}
</script>
<style lang="scss">
  .niao-table-image {
    display: block;width: 80px;height: 24px;
  }
</style>
