<template>
  <span :class="`niao-tip niao-tip-${type} ${block ? 'block' : ''}`">
    <i v-if="icon" :class="icon" />
    <span :class="{cursor: $slots.dialog}" @click="openDialog" v-html="text" />
    <slot />
    <el-dialog v-if="$slots.dialog" class="niao-tip-dialog" width="600px" :title="text" :visible.sync="dialogVisible" destroy-on-close append-to-body>
      <slot name="dialog" />
    </el-dialog>
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
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
      if (this.$slots.dialog) {
        this.dialogVisible = true
      }
    }
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
    display: block;line-height: 1.4;padding: 5px 0;
  }
  .cursor { cursor: pointer; }
}
.niao-tip-dialog {
  line-height: 1.6;
  a, .iconfont {
    color: #f60;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;padding: 5px 0;
  }
  table {
    border-collapse: collapse;color: #555;
    &, td, th {
      border: 1px solid #ddd;
    }
    th, td {padding: 5px 8px;text-align: center;}
  }
}
</style>
