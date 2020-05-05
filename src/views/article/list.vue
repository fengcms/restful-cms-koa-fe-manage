<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="$router.push('/article/add')">添加文章</ControlBtn>
      <ControlBtn icon="el-icon-delete" type="danger" @click="batchDelRowItem">批量删除</ControlBtn>
    </ControlBox>
    <TableSearch :model="searchParams" :items="searchItems" @upSearchParams="upSearchParams" />
    <TableList
      :table-loading="tableLoading"
      :table-data="tableData"
      :page-result="pageResult"
      :page-curr-change="pageCurrChange"
      :selection-change="selectionChange"
    >
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="id" align="center" label="ID" width="50" />
      <el-table-column min-width="300" label="文章标题">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.title" />
        </template>
      </el-table-column>
      <el-table-column prop="channel_id" label="归属栏目" width="180" :formatter="tableColFormat" />
      <el-table-column label="封面图片" align="center" width="100">
        <template slot-scope="scope">
          <TableImage :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" align="center" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/article/edit/${scope.row.id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="delRowItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </TableList>
  </PageMain>
</template>
<script>
import getTableData from '@/mixin/getTableData'
import listEdit from '@/mixin/listEdit'
import { getChannel } from '@/api/channel'
export default {
  mixins: [getTableData, listEdit],
  data () {
    return {
      pageInfo: {
        dontGetData: true,
        listApiName: 'article',
        itemName: '文章'
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
