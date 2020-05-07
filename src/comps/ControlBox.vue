<template>
  <div class="control-box">
    <el-button-group ref="leftBtns" size="small">
      <slot />
    </el-button-group>
    <el-button-group ref="rightBtns" size="small">
      <slot name="right" />
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'ControlBox'
}
</script>
<style lang="scss" scoped>
.control-box {
  margin: -15px -15px 10px;padding: 10px 15px;background: #f9f9f9;
  display: flex;justify-content: space-between;
  align-items: center;min-height: 52px;
}
</style>
