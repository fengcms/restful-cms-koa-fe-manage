<template>
  <div :class="`niao-row niao-row-${labelPosition}`">
    <div class="niao-row-label" :style="`width:${labelWidth}px`">{{ label }}</div>
    <div class="niao-row-label-right"><slot name="right" /></div>
    <div class="niao-row-slot"><slot /></div>
  </div>
</template>
<script>
export default {
  name: 'Row',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number,
      default: 120
    },
    labelPosition: {
      type: String,
      default: 'left'
    }
  }
}
</script>
<style lang="scss" scoped>
.niao-row {
  font-size: 14px;padding:8px 0;line-height: 1.4;
  &.niao-row-left {
    clear: both;display: table;width: 100%;
    & > .niao-row-label,& > .niao-row-slot {display: table-cell;}
    & > .niao-row-label {
      vertical-align: top;text-align: right;padding-right: 12px;color: #606266;
      &:after {
        content: ":"
      }
    }
    & > .niao-row-label-right { display: none;}
  }
  &.niao-row-top {
    position: relative;
    & > .niao-row-label {
      padding-bottom: 6px;color: #606266;text-align: center;background: #fff;position: relative;left: 20px;font-weight: bold;font-size: 15px;
    }
    & > .niao-row-label-right {
      position: absolute;right: 5px;top: 0;
    }
    &:before {
      content: '';left: 0;right: 0;height: 1px;background: #ddd;top: 17px;display: block;position: absolute;
    }
  }
}
</style>
