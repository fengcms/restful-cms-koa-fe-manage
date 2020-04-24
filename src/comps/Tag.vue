<template>
  <el-tag :type="value == trueValue ? type : 'info'" :effect="value == trueValue ? 'dark' : 'light'">{{ text }}</el-tag>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    type: { type: String, default: 'default' },
    text: { type: String, default: '-' },
    value: { type: [String, Number], default: 1 },
    trueValue: { type: [String, Number], default: 1 }
  }
}
</script>
