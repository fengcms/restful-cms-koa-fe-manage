<template>
  <el-dialog class="dialog-my-image-component" :visible="visible" width="540px" @close="close">
    <el-image v-if="imgUrl" style="width: 500px; height: 500px" :src="getImgUrl(imgUrl)" fit="cover" />
    <el-alert v-else title="图片地址为空" type="error" show-icon center :closable="false" />
  </el-dialog>
</template>
<script>
import { getImgUrl } from '@/utils/tools'
export default {
  name: 'DialogImage',
  props: {
    visible: { type: Boolean, default: false },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    getImgUrl,
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
.dialog-my-image-component {
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      top: -30px;right: -30px;
      .el-dialog__close {
        color: #fff;font-size: 24px;
      }
    }
  }
  .el-dialog__body {
    padding: 20px;
  }
}
</style>
