<template>
  <span class="goods-cycle">生命周期<em> {{ dayNumber }} </em>天 <em>{{ inStoreTime }}</em>入库 <strong>{{ timeRemaining }}</strong></span>
</template>
<script>
export default {
  name: 'GoodsCycle',
  props: {
    dat: { type: Object, default () { return {} } }
  },
  data () {
    return {
      inStoreTime: '',
      dayNumber: '',
      timeRemaining: ''
    }
  },
  watch: {
    dat: {
      handler: function (val, oldVal) {
        this.calcValue()
      },
      deep: true
    }
  },
  mounted () {
    this.calcValue()
  },
  methods: {
    calcValue () {
      const o = this.dat
      const sku = o.sku
      if (sku && sku.skuSpecAttr) {
        this.inStoreTime = sku.liveDate
        this.dayNumber = sku.dayNumber != null ? sku.dayNumber : 10
        this.timeRemaining = this.calcCycleDay(sku.timeRemaining)
      } else {
        this.inStoreTime = o.liveDate
        this.dayNumber = o.dayNumber != null ? o.dayNumber : 10
        this.timeRemaining = this.calcCycleDay(o.timeRemaining)
      }
    },
    calcCycleDay (s) {
      s = s || ~~(this.dayNumber - (+new Date() - +new Date(this.inStoreTime)) / 86400000)
      return s < 0 ? `已过期${~s}天` : s > 0 ? `剩余${s}天` : '小于1天'
    }
  }
}
</script>
<style lang="scss">
.goods-cycle {
  font-size: 12px;color: #999;
  em, strong {color: #000;font-style: normal;}
}
</style>
