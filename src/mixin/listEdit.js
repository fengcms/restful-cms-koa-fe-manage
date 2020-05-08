import request from '@/utils/request'
import { toType } from '@/utils/tools'
export default {
  data () {
    return {
      editStatus: {
        showEdit: false,
        editId: null,
        editDat: null,
        editIndex: null
      }
    }
  },
  methods: {
    addItem () {
      this.editStatus = {
        showEdit: true,
        editId: null,
        editDat: null
      }
    },
    editItem (o) {
      if (toType(o) === 'object') {
        if (Object.keys(o).includes('$index')) {
          this.editStatus.editDat = o.row
          this.editStatus.editIndex = o.$index
        } else {
          this.editStatus.editDat = o
        }
      } else {
        this.editStatus.editId = o
      }
      setTimeout(() => {
        this.editStatus.showEdit = true
      }, 500)
    },
    closeEditBox () {
      this.editStatus = {
        showEdit: false,
        editId: null,
        editDat: null
      }
    },
    // 删除行数据，兼容批量删除写法
    delRowItem (id, dontConfirm) {
      const delFunc = () => {
        const apiName = this.pageInfo.listApiName
        if (!apiName) {
          this.$message.error('列表数据接口配置错误，请前端检查代码！')
          return
        }
        request({
          url: `${apiName}/${id}`,
          method: 'delete'
        }).then(r => {
          const { fail, succ } = r.data
          if (succ.length) this.$message.success(`ID 为 ${succ.join(',')} 的${this.pageInfo.itemName}删除成功!`)
          if (fail.length) this.$message.error(`ID 为 ${fail.join(',')} 的${this.pageInfo.itemName}删除失败!`)
          this.getData()
        })
      }
      if (!dontConfirm) {
        this.$confirm(`此操作将永久删除 ID 为 ${id} 的${this.pageInfo.itemName}, 是否继续?`, '提示', {
          type: 'warning'
        }).then(() => delFunc())
      } else {
        delFunc()
      }
    },
    // 纯属装逼写的批量删除
    batchDelRowItem () {
      const arr = this.selectionArray
      const len = arr.length
      if (!len) {
        this.$message.warning(`您没有选择任何${this.pageInfo.itemName}`)
        return
      }
      this.$confirm(`此操作将永久删除所选${this.pageInfo.itemName}, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        this.delRowItem(arr.map(r => r.id).join(','), true)
      })
    }
  }
}
