<template>
  <div class="goods-detail-img">
    <template v-if="imgArr.length">
      <img v-for="(i, k) in imgArr" :key="k" :src="i">
    </template>
    <article v-else-if="detail" v-html="detail" />
    <div v-else class="goods-detail-img-no">暂无详情内容</div>
  </div>
</template>
<script>
import { getImgsFromHtml, HTMLDecode } from '@/utils/tools'
export default {
  name: 'GoodsDetailImg',
  props: {
    detail: {
      type: String, default: ''
    }
  },
  computed: {
    imgArr () {
      return getImgsFromHtml(HTMLDecode(this.detail))
    }
  }
}
</script>
<style lang="scss">
.goods-detail-img {
  img {
    display: block;max-width: 375px;
  }
  .goods-detail-img-no {
    height: 100px;text-indent: 50px;color: #999;background: #f0f0f0;display: flex;align-items: center;
  }
  article {
    line-height: 2;font-size: 14px;
  }
}
</style>
