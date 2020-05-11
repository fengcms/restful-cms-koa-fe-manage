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
      <el-table-column prop="status" label="状态" align="center" width="80" :formatter="tableColFormat" />
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
import listPage from '@/mixin/listPage'
import listEdit from '@/mixin/listEdit'
import { getChannel } from '@/api/channel'
export default {
  mixins: [listPage, listEdit],
  data () {
    return {
      // 页面基本信息
      pageInfo: {
        listApiName: 'article',
        itemName: '文章'
      },
      // 搜索项配置默认参数，为空的默认参数可不填写
      searchParams: {
        // 'title-like': '',
        // time: []
      },
      // 数组搜索参数拆解配置
      // 详细配置查看 src/mixin/listPage.js calcSearchParams 函数注释
      searchParamsTear: {
        time: 'between'
      },
      // 页面搜索项配置，详细配置查看 src/comps/TableSearch.vue 注释
      searchItems: {
        'title-like': '标题',
        time: {
          type: 'datePicker', label: '时间区间', pickerType: 'datetimerange'
        },
        status: {
          type: 'select', label: '状态',
          options: [
            { label: '普通', value: 'NORMAL' },
            { label: '热门', value: 'HOT' },
            { label: '最新', value: 'NEW' },
            { label: '隐藏', value: 'HIDE' }
          ]
        }
      },
      // 表格字段数据格式化配参字典
      tableBase: {}
    }
  },
  methods: {
    beforeGetData () {
      const chan = getChannel().then(r => {
        const o = {}
        r.data.list.forEach(r => { o[r.id] = r.name })
        this.tableBase.channel_id = o
      })
      return [chan]
    }
  }
}
</script>
