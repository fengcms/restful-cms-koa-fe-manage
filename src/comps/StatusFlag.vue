<template>
  <div :class="`status_flag ${status ? 'active' : ''}`"><em>{{ status ? trueText : falseText }}</em><span /></div>
</template>
<script>
export default {
  name: 'StatusFlag',
  props: {
    value: {
      type: [String, Number],
      default: 1
    },
    trueValue: {
      type: [String, Number],
      default: 1
    },
    falseValue: {
      type: [String, Number],
      default: -1
    },
    trueText: {
      type: String,
      default: '启用'
    },
    falseText: {
      type: String,
      default: '禁用'
    }
  },
  computed: {
    status () {
      // eslint-disable-next-line
      return this.value == this.trueValue
    }
  }
}
</script>
<style lang="scss" scoped>
.status_flag {
  display: inline-flex;align-items: center;height: 20px;vertical-align: middle;position: relative;
  em {
    font-size: 12px;position: absolute;color: #fff;font-style: normal;right: 5px;
  }
  span {
    width: 50px;height: 20px;border-radius: 10px;background: #DCDFE6;display: inline-block;color: #fff;
    &:before {
      width: 16px;height: 16px;border-radius: 50%;background: #fff;position: absolute;top: 2px;left: 2px;content: '';transition: all .3s;
    }
  }
  &.active {
    em {
      left: 5px;right: auto;
    }
    span {
      background: #1890ff;
      &:before {
        left: 100%;margin-left: -18px;
      }
    }
  }
}
</style>
