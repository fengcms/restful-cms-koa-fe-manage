import request from '@/utils/request'
export default {
  data () {
    return {
      pageInfo: {
        editId: this.$route.params.id,
        actionText: '添加',
        loading: false,
        sumbiting: false
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.pageInfo.loading = true
      const beforePromise = this.beforeGetData ? this.beforeGetData() : []
      Promise.all(beforePromise).then(() => {
        const { apiName, editId } = this.pageInfo
        if (editId) {
          this.pageInfo.actionText = '编辑'
          request({
            url: apiName + '/' + editId,
            method: 'get'
          }).then(r => {
            if (this.afterGetData) {
              const afterGetData = this.afterGetData(r.data)
              if (afterGetData) this.form = { ...afterGetData }
            } else {
              this.form = { ...r.data }
            }
          })
        } else {
          this.pageInfo.actionText = '添加'
        }
      }).finally(() => {
        this.pageInfo.loading = false
      })
    },
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { apiName, editId, itemName, actionText } = this.pageInfo
          const data = this.calcSubmitData(this.form)
          this.pageInfo.sumbiting = true
          request({
            url: `${apiName}${editId ? `/${editId}` : ''}`,
            method: editId ? 'put' : 'post',
            data
          }).then(r => {
            this.afterSubmit && this.afterSubmit(r)
            this.$message({ message: `${itemName}${actionText}成功！`, type: 'success' })
          }).finally(() => {
            this.pageInfo.sumbiting = false
          })
        }
      })
    }
  }
}
