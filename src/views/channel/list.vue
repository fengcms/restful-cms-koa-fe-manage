<template>
  <PageMain>
    <ControlBox>
      <ControlBtn v-if="breadCrumb.length !== 1" icon="el-icon-arrow-left" @click="goBack">返回上级</ControlBtn>
      <ControlBtn icon="el-icon-plus" @click="addItem">添加栏目</ControlBtn>
      <template slot="right">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="i in breadCrumb" :key="i.id">{{ i.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </ControlBox>
    <TableList
      :table-loading="tableLoading"
      :table-data="tableData"
      :page-result="pageResult"
      :page-curr-change="pageCurrChange"
      :selection-change="selectionChange"
    >
      <el-table-column prop="id" align="center" label="ID" width="50" />
      <el-table-column prop="name" label="栏目名称">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.name" @click="getChannelByPid(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序" width="80" />
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="getChannelByPid(scope.row)">查看子栏目</el-button>
        </template>
      </el-table-column>
    </TableList>
    <editBox :visible="editStatus.showEdit" :add-pid="searchParams.pid" :edit-dat="editStatus.editDat" @close="closeEditBox" />
  </PageMain>
</template>
<script>
import listPage from '@/mixin/listPage'
import listEdit from '@/mixin/listEdit'
import editBox from './edit'
export default {
  components: { editBox },
  mixins: [listPage, listEdit],
  data () {
    return {
      pageInfo: {
        dontGetData: false,
        listApiName: 'channel'
      },
      breadCrumb: [{ id: 0, name: '栏目导航' }],
      searchParams: {
        pid: 0,
        sort: '-sort,-id'
      },
      tableBase: {}
    }
  },
  methods: {
    getChannelByPid (item) {
      this.breadCrumb.push(item)
      this.searchParams.pid = item.id
      this.getData()
    },
    goBack () {
      const pid = this.breadCrumb[this.breadCrumb.length - 2].id
      this.breadCrumb.pop()
      this.searchParams.pid = pid
      this.getData()
    }
  }
}
</script>
