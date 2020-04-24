<template>
  <div v-loading="tableLoading" class="page-table">
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <slot />
    </el-table>
    <div class="page-pagination">
      <el-pagination
        background
        :layout="layout"
        :page-sizes="pageSizes"
        :page-size="pageResult.pageSize"
        :total="pageResult.count"
        @current-change="pageCurrChange"
        @size-change="goPageSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { PageSizes } from '@/config'
export default {
  name: 'TableList',
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    pageResult: {
      type: Object,
      default () {
        return {
          pageSize: 10,
          count: 0
        }
      }
    },
    pageCurrChange: {
      type: Function,
      default: () => {}
    },
    pageSizeChange: {
      type: Function,
      default: () => {}
    },
    selectionChange: {
      type: Function,
      default: () => {}
    },
    tableLoading: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => {
        return PageSizes
      }
    }
  },
  data () {
    return {
      hasPageSizeChangeFunc: false,
      layout: 'prev, pager, next'
    }
  },
  mounted () {
    this.calcPageSizeChangeFunc()
  },
  methods: {
    calcPageSizeChangeFunc () {
      this.hasPageSizeChangeFunc = this.pageSizeChange.name !== '_default'
      this.hasPageSizeChangeFunc && (this.layout += ', sizes')
    },
    goPageSizeChange (e) {
      this.hasPageSizeChangeFunc && this.pageSizeChange(e)
    }
  }
}
</script>
