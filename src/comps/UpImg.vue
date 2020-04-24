<!--
  图片上传组件
  info: 本组件是基于elemeui的上传组件封装的用于 NiaoCMS 系统管理后台的图片上传组件，支持单张和多张图片上传。
        默认是单张图片上传，单张图片上传，返回字符串，多张返回数组。
  params:
      name: String 上传接口中，二进制图片字段名，根据 NiaoCMS 系统，默认为 'goodsImg'
      limit: Numbner 上传图片数量限制，默认为 1
      disabled: Boolean 是否禁用，禁用后如果有默认值，则会显示图片，如果没有默认值，也不能上传新图片。默认值为 false
      value: String| Array, 接受字符串或数组
            example1: 'qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6'
            example2: ['qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6', 'qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6']
  methods:
      success: Function(res) 上传成功后调用函数，返回值为上传图片的结果。
  example:
      单张图片演示：
      <UpImg :value="oldBusinessPic" @success="img => form.businessPic = img" />
      oldBusinessPic: 'qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6'
      多张图片演示：
      <UpImg :limit="9" :value="oldBusinessPicArr" @success="img => form.businessPic = img" />
      oldBusinessPic: ['qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6', 'qiniu://FhRntySJ-DnvDWh2FCDgJO8ruYf6']
  warning:
      成功函数执行后，不能去覆盖 value 值，如：
      // error
      <UpImg :value="form.businessPic" @success="img => form.businessPic = img" />
      这样会导致重新上传时失败，具体原因未知，估计和双向绑定有关系。
      解决方法，将初始值单独放一个地方，组件内的运行不会去修改该值。
      // good
      <UpImg :value="oldBusinessPic" @success="img => form.businessPic = img" />
      ...
      /* 双向绑定数据和图片初始值分开放 */
      this.form = r.data
      this.oldBusinessPic = r.data.businessPic
-->
<template>
  <div class="niao-upload-image">
    <el-upload
      ref="niaoUploadImage"
      :class="`${closeUpload ? 'closeUpload' : ''}`"
      :action="api"
      :name="name"
      :show-file-list="true"
      :on-change="returnEmit"
      :on-remove="returnEmit"
      list-type="picture-card"
      :limit="limit"
      :file-list="fileList"
      :disabled="disabled"
    >
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
      <i class="el-icon-plus" />
    </el-upload>
    <DialogImage :visible="DialogImage.show" :img-url="DialogImage.imgUrl" @close="DialogImage.show = false" />
  </div>
</template>
<script>
import { ApiPre } from '@/config'
import { toType } from '@/utils/tools'
export default {
  name: 'UpImg',
  props: {
    limit: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: 'file' },
    value: { type: [String, Array], default: '' }
  },
  data () {
    return {
      api: `${ApiPre}upload`,
      imgList: [],
      closeUpload: false,
      DialogImage: {
        show: false,
        imgUrl: ''
      }
    }
  },
  computed: {
    fileList () {
      const res = []
      if (this.value) {
        if (toType(this.value) === 'array') {
          this.value.forEach(i => {
            res.push({ name: '', url: i })
          })
        } else if (toType(this.value) === 'string') {
          res.push({ name: '', url: this.value })
        }
      }
      // eslint-disable-next-line
      this.closeUpload = res.length >= this.limit
      return res
    }
  },
  methods: {
    handlePreview (file) {
      this.DialogImage = {
        show: true,
        imgUrl: file.url
      }
    },
    returnEmit (file, list) {
      this.imgList = list
      this.closeUpload = list.length >= this.limit
      const res = []
      list.forEach(i => {
        if (i.response) {
          res.push(i.response.data.goodsImg)
        } else if (i.url) {
          res.push(i.url)
        }
      })
      if (!JSON.stringify(res).includes('"blob:')) {
        this.$emit('success', this.limit === 1 && toType(this.value === 'string') ? res[0] : res)
      }
    },
    handleRemove (file) {
      this.$refs.niaoUploadImage.handleRemove(file)
    }
  }
}
</script>
<style lang="scss">
.closeUpload {
  & > div.el-upload {
    display: none;
  }
}
</style>
