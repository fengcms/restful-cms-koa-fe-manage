<template>
  <div class="page-main">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="审核" prop="examineStatus">

      </el-form-item>
    </el-form>
    <!-- <div class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button @click="resetForm">重 置</el-button>
      <el-button type="primary" :loading="sumbiting" @click="submit">确 定</el-button>
    </div> -->
  </div>
</template>
<script>
import editPage from '@/mixin/editPage'
export default {
  mixins: [editPage],
  data () {
    return {
      pageInfo: {
        apiName: 'article'
      },
      form: {
        examineStatus: null,
        remark: ''
      },
      rules: {
        examineStatus: [
          { required: true, message: '请选择审批状态', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // afterGetData (data) {
    //   this.actionText = '审核'
    //   const { id, examineStatus, remark } = data
    //   return { id, examineStatus, remark }
    // },
    // calcSubmitData (data) {
    //   // 审核成功自动添加备注
    //   data.examineStatus === 1 && (data.remark = '审核通过')
    //   return data
    // },
    // clearRemark () {
    //   const { examineStatus, remark } = this.form
    //   if (examineStatus === -1 && remark === '审核通过') {
    //     this.form.remark = ''
    //   }
    // }
  }
}
</script>
