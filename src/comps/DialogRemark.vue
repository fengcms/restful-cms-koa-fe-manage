<template>
  <el-dialog
    :title="`${title}`"
    :visible="visible"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    @open="init"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item prop="remark">
        <el-input v-model="form.remark" type="textarea" :max="140" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogRemark',
  props: {
    visible: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    title: { type: String, default: '备注' },
    value: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        remark: ''
      },
      rules: {
        remark: [
          { required: this.required, message: `请填写${this.title}`, trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.form.remark = this.value
    },
    close () {
      this.$emit('close')
    },
    onSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form.remark)
          this.close()
        }
      })
    }
  }
}
</script>
