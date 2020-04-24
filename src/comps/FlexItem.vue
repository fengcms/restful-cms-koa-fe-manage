<template>
  <el-col :xs="calcSize.xs" :sm="calcSize.sm" :lg="calcSize.lg">
    <slot />
  </el-col>
</template>
<script>
export default {
  name: 'FlexItem',
  props: {
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    calcSize () {
      const sizes = {
        default: { xs: 24, sm: 12, lg: 6 },
        long: { xs: 24, sm: 24, lg: 18 },
        half: { xs: 24, sm: 24, lg: 12 },
        all: { xs: 24, sm: 24, lg: 24 },
        third: { xs: 24, sm: 8, lg: 8 },
        small: { xs: 12, sm: 6, lg: 4 }
      }
      return sizes[Object.keys(sizes).includes(this.size) ? this.size : 'default']
    }
  },
  created () {
  }
}
</script>
