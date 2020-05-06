<template>
  <el-button icon="el-icon-upload" size="mini" type="primary" @click="chooseImage">
    上传图片
  </el-button>
</template>
<script>
import upload from '../../mixin/upload'
export default {
  mixins: [upload],
  watch: {
    progress (val) {
      this.$emit('progress', val)
    }
  },
  methods: {
    chooseImage () {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = () => {
        const files = input.files
        if (files[0]) {
          this.upload(files[0]).then(({ path }) => {
            this.$emit('success', path)
          })
          input.value = ''
        }
      }
      input.click()
    }
  }
}
</script>
