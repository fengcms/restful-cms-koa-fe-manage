<!--
  图片列表组件，用于显示多张图片
  参数：
    list: Array   图片列表数据，格式为 [{ label: '照片名称', value: '照片地址' }]  必填
    size: Object  图片展示尺寸，格式为 { w: 200, h: 200 }                       非必填，默认为200
    noPreview: Boolean  是否开启图片预览功能，默认为开启
  使用示例：
    <ImageList :list="picList" :size="{w:180, h:180}" noPreview />
-->
<template>
  <div class="niao-image-list">
    <div v-for="(i, k) in list" :key="k" class="niao-image-list-item">
      <el-image :style="`width: ${size.w}px; height: ${size.h}px`" :src="getImgUrl(i.value)" :preview-src-list="preList" fit="cover" />
      <span class="niao-image-list-title">{{ i.label }}</span>
    </div>
    <div v-if="!list.length" class="niao-image-list-noimg" :style="`width: ${size.w}px; height: ${size.h}px`">图集中暂无图片</div>
  </div>
</template>
<script>
import { getImgUrl } from '@/utils/tools'
export default {
  name: 'ImageList',
  props: {
    list: {
      type: Array,
      default () { return [] }
    },
    size: {
      type: Object,
      default () { return { w: 200, h: 200 } }
    },
    noPreview: { type: Boolean, default: false }
  },
  computed: {
    preList () {
      const res = []
      !this.noPreview && this.list.forEach(r => {
        r.value && res.push(getImgUrl(r.value))
      })
      return res.length ? res : null
    }
  },
  methods: { getImgUrl }
}
</script>
<style lang="scss">
.niao-image-list {
  overflow: hidden;margin: 0 -10px;
  .niao-image-list-item {
    float: left;padding: 1px;border: 1px solid #eee;margin: 10px;border-radius: 5px;position: relative;overflow: hidden;
    .niao-image-list-title {
      display: block;height: 36px;line-height: 36px;text-align: center;
      position: absolute;bottom: 0;left: 0;right: 0;background: rgba(#000, .5);color: #fff;
      white-space: nowrap;text-overflow: ellipsis;overflow: hidden;
    }
  }
  .niao-image-list-noimg {
    display: flex;justify-content: center;align-items: center;background: #f0f0f0;margin: 10px;border: 1px solid #eee;color: #999;border-radius: 5px;padding: 1px;
  }
}
</style>
