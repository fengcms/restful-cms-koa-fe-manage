<template>
  <span :class="`niao-tip niao-tip-${type} ${block ? 'block' : ''}`">
    <i v-if="icon" :class="icon" />
    <span v-html="text" />
    <slot />
  </span>
</template>
<script>
export default {
  name: 'Tip',
  props: {
    text: { type: String, default: '' },
    block: { type: Boolean, default: false },
    icon: { type: String, default: 'el-icon-info' },
    type: { type: String, default: 'warning' }
  }
}
</script>
<style lang="scss">
.niao-tip {
  $colors: ('default': #909399, 'success': #67C23A, 'warning': #E6A23C, 'danger': #F56C6C, 'primary': #409EFF);
  color: #909399;font-size: 12px;
  @each $type, $color in $colors {
    &.niao-tip-#{$type} {
      color: $color;
    }
  }
  &.block {
    display: block;line-height: 1;padding: 5px 0;
  }
}
</style>
