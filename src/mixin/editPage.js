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
        }
      }).finally(() => {
        this.pageInfo.loading = false
      })
    },
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { apiName, editId, itemName } = this.pageInfo
          const data = this.calcSubmitData(this.form)
          this.pageInfo.sumbiting = true
          const method = editId ? 'put' : 'post'
          const actionParams = {
            put: {
              api: `${apiName}/${editId}`, tip: '编辑'
            },
            post: {
              api: `${apiName}`, tip: '添加'
            }
          }
          request({
            url: actionParams[method].api,
            method,
            data
          }).then(r => {
            this.afterSubmit && this.afterSubmit(r)
            this.$message({ message: `${itemName}${actionParams[method].tip}成功！`, type: 'success' })
            editId ? this.getData() : this.$router.back()
          }).finally(() => {
            this.pageInfo.sumbiting = false
          })
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
    }
  }
}
