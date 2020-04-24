<template>
  <el-row :gutter="gutter">
    <slot />
  </el-row>
</template>
<script>
export default {
  name: 'FlexBox',
  props: {
    gutter: {
      type: Number,
      default: 10
    }
  }
}
</script>
