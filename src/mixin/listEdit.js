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
        console.log(this.editStatus)
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
        const data = {}
        data[this.pageInfo.idName] = id
        const apiName = this.pageInfo.delApiName
        if (!apiName) {
          this.$message.error('列表数据接口配置错误，请前端检查代码！')
          return
        }
        request({
          url: apiName,
          method: 'post',
          data
        }).then(r => {
          this.$message({ type: 'success', message: `ID 为 ${id} 的${this.pageInfo.itemName}删除成功!` })
          !dontConfirm && this.getData()
        })
      }
      if (!dontConfirm) {
        this.$confirm(`此操作将永久删除 ID 为 ${id} 的${this.pageInfo.itemName}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => delFunc())
      } else {
        delFunc()
      }
    },
    // 纯属装逼写的批量删除
    batchDelRowItem () {
      this.$confirm(`此操作将永久删除所选${this.pageInfo.itemName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const arr = this.selectionArray
        const len = arr.length
        let i = 0
        const timer = setInterval(() => {
          if (i === len) {
            clearInterval(timer)
            this.getData()
          } else {
            this.delRowItem(arr[i][this.pageInfo.idName], true)
            i++
          }
        }, 500)
      })
    }
  }
}
