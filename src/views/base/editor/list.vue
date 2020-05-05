<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="addItem">添加编辑</ControlBtn>
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
      <el-table-column prop="name" label="编辑姓名" min-width="140" />
      <el-table-column label="头像" align="center" width="100">
        <template slot-scope="scope">
          <TableImage :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" width="150" />
      <el-table-column prop="mobile" label="手机" width="130" />
      <el-table-column prop="email" label="邮箱" width="240" />
      <el-table-column label="主页" width="280">
        <template slot-scope="scope">
          <OneLineText :link="scope.row.website" :text="scope.row.website" />
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="入驻时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delRowItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </TableList>
    <editBox :visible="editStatus.showEdit" :edit-dat="editStatus.editDat" @close="closeEditBox" />
  </PageMain>
</template>
<script>
import getTableData from '@/mixin/getTableData'
import listEdit from '@/mixin/listEdit'
import editBox from './edit'
export default {
  components: { editBox },
  mixins: [getTableData, listEdit],
  data () {
    return {
      pageInfo: {
        listApiName: 'editor',
        itemName: '编辑'
      },
      searchParams: {
        'name-like': '',
        'contact-like': '',
        mobile: ''
      },
      searchItems: [
        { label: '编辑姓名', field: 'name-like', width: '100px' },
        { label: '联系人', field: 'contact-like', width: '100px' },
        { label: '手机', field: 'mobile', width: '100px' }
      ],
      tableBase: {}
    }
  },
  methods: {
  }
}
</script>
