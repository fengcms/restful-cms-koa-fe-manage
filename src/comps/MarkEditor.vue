<template>
  <div class="mark-editor">
    <div class="upload-progress" :style="`width:${progress}%`" />
    <MarkdownPro v-model="content" :toolbars="toolbars" theme="oneDark" @on-ready="ready" @on-upload-image="upImg" />
  </div>
</template>
<script>
import { MarkdownPro } from 'vue-meditor'
const editor = {}
export default {
  name: 'MarkEditor',
  components: { MarkdownPro },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      toolbars: {
        uploadImage: true,
        split: true
      },
      progress: 0
    }
  },
  watch: {
    value (val) {
      this.content = val
    },
    content (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    ready (el) {
      editor.vm = el.vm
      editor.insert = el.insertContent
    },
    upImg (file) {
      const formData = new FormData()
      formData.set('file', file)
      const xhr = new XMLHttpRequest()
      xhr.open('post', '/api/v1/upload')
      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.response || xhr.responseText)
          if (res.status === 0) {
            const imgMdStr = `\n![${file.name}](${res.data.path})\n`
            editor.insert(imgMdStr)
          } else {
            this.$message.error('图片上传失败')
          }
          this.progress = 0
        } else {
          this.$message.error('图片上传失败')
          this.progress = 0
        }
      }
      xhr.upload.onprogress = (e) => {
        // 上传进度
        if (e.lengthComputable) {
          this.progress = ~~(e.loaded / e.total * 100)
        }
      }
      xhr.send(formData)
    }
  }
}
</script>
<style lang="scss">
.mark-editor {
  position: relative;padding-top: 2px;
  .upload-progress {
    position: absolute;top: 0;left: 0;height: 2px;background: green;
  }
}
</style>
