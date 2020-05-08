<template>
  <div class="mark-editor">
    <div class="upload-progress" :style="`width:${progress}%`" />
    <MarkdownPro v-model="content" :toolbars="toolbars" theme="oneDark" @on-ready="ready" @on-upload-image="upImg" />
  </div>
</template>
<script>
import { MarkdownPro } from 'vue-meditor-fungleo'
import upload from './mixin/upload'
const editor = {}
export default {
  name: 'MarkEditor',
  components: { MarkdownPro },
  mixins: [upload],
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
      }
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
      this.content = this.value
    },
    upImg (file) {
      this.upload(file).then(({ name, path }) => {
        const imgMdStr = `\n![${name}](${path})\n`
        editor.insert(imgMdStr)
      })
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
