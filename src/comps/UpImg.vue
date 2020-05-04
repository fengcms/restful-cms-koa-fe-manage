<template>
  <div :class="`niao-upload ${imgs.length === limit ? 'niao-upload-hide-add' : ''}`">
    <el-upload
      ref="upload"
      class="niao-upload-el"
      :action="api"
      :on-success="success"
      :on-exceed="exceed"
      :on-preview="preview"
      :on-remove="remove"
      :limit="limit"
      :file-list="imgs"
      :multiple="limit !== 1"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>
<script>
import { toType } from '@/utils/tools'
export default {
  name: 'UpImg',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      api: '/api/v1/upload',
      imgs: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    value (val) {
      val = !val ? [] : toType(val) === 'array' ? val : [val]
      const imgs = []
      val.forEach((item, index) => imgs.push({ name: index, url: item }))
      this.imgs = imgs
    }
  },
  methods: {
    success (res, file, list) {
      this.emitRes(list)
    },
    remove (file, list) {
      this.emitRes(list)
    },
    emitRes (list) {
      const res = []
      list.forEach(i => {
        const url = i.url.substring(0, 5) !== 'blob:' ? i.url : i.response.data.path
        res.push(url)
      })
      this.$refs.upload.clearFiles()
      this.$emit('input', this.limit === 1 ? (res[0] || '') : res)
    },
    preview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    exceed () {
      this.$message.error(`超过上传图片数量限制，只允许上传${this.limit}张图片`)
    }
  }
}
</script>
<style lang="scss">
.niao-upload {
  &.niao-upload-hide-add {
    .el-upload { display: none; }
  }
  .el-upload-list--picture-card, .el-upload-list__item {
    transition: none; vertical-align: top;
  }
}
</style>
