<template>
  <div class="niao-quick-assistant">
    <el-button type="success" @click="initQuickAssistant">快速选择</el-button>
    <el-dialog
      title="快速选择助手"
      :visible.sync="isShowBox"
      width="600px"
      append-to-body
    >
      <div class="niao-quick-assistant-search">
        <TableSearch v-if="isShowBox" size="small" :model="searchParams" :items="searchItems" @upSearchParams="upSearchParams" />
      </div>
      <div v-if="mode === 'append' && currentValue.length" class="niao-quick-assistant-value">
        <el-tag v-for="(i, k) in currentValue" :key="k" closable @close="removeTag(k)">
          {{ i }}
        </el-tag>
      </div>
      <div class="niao-quick-assistant-list">
        <ul>
          <li v-for="(i, k) in tableData" :key="k" @click="emitValue(i)">{{ i.name || i.tag }}</li>
        </ul>
      </div>
      <div class="niao-quick-assistant-pagination">
        <el-pagination
          background
          small
          :layout="'prev, pager, next'"
          :page-size="pageResult.pageSize"
          :total="pageResult.count"
          @current-change="pageCurrChange"
        />
      </div>
      <span v-if="mode === 'append'" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTags">确认</el-button>
        <el-button @click="currentValue = []">清空</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import listPage from '@/mixin/listPage'
export default {
  name: 'QuickAssistant',
  mixins: [listPage],
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: '' },
    mode: { type: String, default: 'replace' }
  },
  data () {
    return {
      pageInfo: {
        dontGetData: true,
        listApiName: 'tags',
        itemName: '关键词'
      },
      searchParams: {
        pageSize: 50
      },
      searchItems: {},
      isShowBox: false,
      dict: {
        tags: { api: 'tags', itemName: '关键词', filed: 'tag' },
        author: { api: 'author', itemName: '作者', filed: 'name' },
        origin: { api: 'origin', itemName: '来源', filed: 'name' },
        editor: { api: 'editor', itemName: '小编', filed: 'name' }
      },
      currentValue: []
    }
  },
  methods: {
    initQuickAssistant () {
      const { dict, type, mode, value } = this
      this.pageInfo.listApiName = dict[type].api
      this.searchItems[`${dict[type].filed}-like`] = dict[type].itemName
      this.isShowBox = true
      if (mode === 'append') {
        this.currentValue = value ? value.split(',') : []
      }
      this.getData()
    },
    emitValue (item) {
      const { dict, type, mode } = this
      if (mode === 'append') {
        this.currentValue.push(item[dict[type].filed])
        this.$emit('input', this.currentValue.join(','))
      }
      if (mode === 'replace') {
        this.$emit('input', item[dict[type].filed])
        this.isShowBox = false
      }
    },
    saveTags () {
      this.$emit('input', this.currentValue.join(','))
      this.isShowBox = false
    },
    removeTag (index) {
      this.currentValue.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.niao-quick-assistant {
  display: inline-block;
  .el-dialog__body {
    padding: 0 20px 10px;margin-top: -10px;
  }
  &-search {
    margin-bottom: -15px;
  }
  &-value {
    .el-tag+.el-tag {
      margin-left: 5px;
    }
  }
  &-list {
    ul {
      padding: 0;margin: 0;list-style: none;overflow: hidden;margin: 5px -5px;line-height: 1.6;
      li {
        float: left;border: 1px dashed #ddd;color: #409EFF;padding: 0 5px;margin: 5px;cursor: pointer;
      }
    }
  }
  &-pagination {
    text-align: center;
  }
}
</style>
