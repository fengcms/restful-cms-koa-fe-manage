<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="addItem">添加{{ pageInfo.itemName }}</ControlBtn>
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
      <el-table-column prop="tag" label="关键词" min-width="140" />
      <el-table-column prop="channel_id" label="归属栏目" width="180" :formatter="tableColFormat" />
      <el-table-column prop="hits" align="center" label="点击量" width="100" />
      <el-table-column fixed="right" align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delRowItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </TableList>
    <editBox :visible="editStatus.showEdit" :base="base" :edit-dat="editStatus.editDat" @close="closeEditBox" />
  </PageMain>
</template>
<script>
import listPage from '@/mixin/listPage'
import listEdit from '@/mixin/listEdit'
import { getChannel, getTreeChannel } from '@/api/channel'
import editBox from './edit'
export default {
  components: { editBox },
  mixins: [listPage, listEdit],
  data () {
    return {
      pageInfo: {
        listApiName: 'tags',
        itemName: '关键词'
      },
      searchParams: {},
      searchItems: {
        'tag-like': '关键词'
      },
      tableBase: {},
      base: {
        treeChannel: [],
        channel: []
      }
    }
  },
  methods: {
    beforeGetData () {
      const chan = getChannel().then(r => {
        this.base.channel = r.data.list
        const o = {}
        r.data.list.forEach(r => { o[r.id] = r.name })
        this.tableBase.channel_id = o
      })
      const tree = getTreeChannel().then(r => { this.base.treeChannel = r.data })
      return [chan, tree]
    }
  }
}
</script>
