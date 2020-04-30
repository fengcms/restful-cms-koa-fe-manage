<template>
  <PageMain>
    <TableSearch :model="searchParams" :items="searchItems" @upSearchParams="upSearchParams" />
    <TableList
      :table-loading="tableLoading"
      :table-data="tableData"
      :page-result="pageResult"
      :page-curr-change="pageCurrChange"
      :selection-change="selectionChange"
    >
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="title" label="文章标题" />
      <el-table-column prop="channel_id" label="归属栏目" width="180" :formatter="tableColFormat" />
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/article/edit/${scope.row.id}`)">编辑</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="content" label="操作内容" /> -->
    </TableList>
  </PageMain>
</template>
<script>
import getTableData from '@/mixin/getTableData'
import { getChannel } from '@/api/channel'
export default {
  mixins: [getTableData],
  data () {
    return {
      pageInfo: {
        dontGetData: true,
        listApiName: 'article'
      },
      searchParams: {
        'title-like': '',
        timeRange: []
      },
      // 数组搜索参数拆解配置
      searchParamsTear: {
        timeRange: ['startDate', 'endDate']
      },
      searchItems: [
        { label: '文章标题', field: 'title-like' },
        {
          type: 'datePicker', label: '时间区间', field: 'timeRange',
          pickerType: 'daterange', startPlaceholder: '开始时间', endPlaceholder: '结束时间'
        }
      ],
      tableBase: {}
    }
  },
  created () {
    this.getBaseData()
  },
  methods: {
    getBaseData () {
      getChannel().then(r => {
        const o = {}
        r.data.list.forEach(r => { o[r.id] = r.name })
        this.tableBase.channel_id = o
        this.getData()
      })
    }
  }
}
</script>
