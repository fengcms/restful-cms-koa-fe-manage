import request from '@/utils/request'
export default {
  data () {
    return {
      pageInfo: {
        editId: this.$route.params.id,
        itemName: '',
        loading: false,
        sumbiting: false
      },
      isEdit: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.pageInfo.loading = true
      // 查看有无接口请求前置操作
      const beforePromise = this.beforeGetData ? this.beforeGetData() : []

      Promise.all(beforePromise).then(() => {
        const { apiName, editId } = this.pageInfo

        // 如果有 editId 表示是编辑模式，则请求接口数据
        if (editId) {
          this.isEdit = true
          request({
            url: apiName + '/' + editId,
            method: 'get'
          }).then(r => {
            // 查看有无接口请求后置操作
            if (this.afterGetData) {
              // 查看后置方法有无返回值，若有，则赋值给 this.form 若无，则交给该方法自行处理
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
      this.$refs.ruleForm.validate((valid, msg) => {
        if (valid) {
          this.pageInfo.sumbiting = true
          const { apiName, editId, itemName } = this.pageInfo
          // 查看有无计算提交数据方法，若有，则赋值给 data 若无，则将 this.form 直接赋值给 data
          const data = this.calcSubmitData ? { ...this.calcSubmitData(this.form) } : { ...this.form }

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
        } else {
          this.submitError && this.submitError(msg)
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
    }
  }
}
