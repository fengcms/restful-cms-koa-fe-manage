import request from '@/utils/request'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editId: {
      type: [String, Number],
      default: ''
    },
    editDat: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageInfo: {},
      sumbiting: false,
      actionText: '添加',
      isEdit: false,
      loading: {
        detail: false
      }
    }
  },
  methods: {
    init () {
      const beforeInit = this.beforeInit && this.beforeInit()
      Promise.all(beforeInit || []).then(() => {
        if (this.editId || this.editDat) {
          this.actionText = '编辑'
          this.isEdit = true
          this.loading.detail = true
          this.beforeGetData && this.beforeGetData()
          const calcResponse = (resp, asyn) => {
            if (this.afterGetData) {
              const afterGetData = this.afterGetData(resp)
              if (afterGetData) this.form = { ...afterGetData }
            } else {
              this.form = asyn ? { ...resp.data } : { ...resp }
            }
          }
          if (this.editId) {
            // 构建请求详情数据数据
            const { apiName } = this.pageInfo
            request({
              url: `${apiName}/${this.editId}`,
              method: 'get'
            }).then(r => {
              calcResponse(r, true)
            }).finally(() => {
              this.loading.detail = false
            })
          }
          if (this.editDat) calcResponse(this.editDat)
        } else {
          this.actionText = '添加'
          this.isEdit = false
          this.addInit && this.addInit()
        }
      })
    },
    close () {
      this.beforeClose && this.beforeClose()
      this.resetForm()
      this.$emit('close')
    },
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.sumbiting) return
          this.sumbiting = true
          // 深拷贝提交数据
          const data = this.calcSubmitData ? this.calcSubmitData({ ...this.form }) : { ...this.form }
          // 如果有提交前执行方法，并且返回了数据，则要执行
          if (this.beforeSubmit) {
            const beforeSubmit = this.beforeSubmit(data)
            if (beforeSubmit != null) return
          }
          const { apiName } = this.pageInfo
          const isEdit = this.editId || this.editDat
          request({
            url: isEdit ? `${apiName}/${this.editId || this.editDat.id}` : apiName,
            method: isEdit ? 'put' : 'post',
            data
          }).then(r => {
            // 如果有后执行函数，则执行该函数
            this.afterSubmit && this.afterSubmit(r)
            // 其他方法
            this.$message({ message: `${this.actionText}成功！`, type: 'success' })
            this.close()
            // 尝试调用父组件的更新数据方法
            const parent = this.$parent.resetData
              ? this.$parent
              : this.$parent.$parent.resetData
                ? this.$parent.$parent
                : { resetData () {} }
            parent.resetData()
          }).finally(() => {
            this.sumbiting = false
          })
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
    }
  }
}
