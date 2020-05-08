<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-arrow-left" type="default" @click="$router.push('/')">返回后台首页</ControlBtn>
      <ControlBtn icon="el-icon-user" @click="$router.push('/profile')">维护个人信息</ControlBtn>
    </ControlBox>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" style="width: 200px" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" style="width: 200px" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="form.checkPassword" style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="pageInfo.sumbiting" @click="submit">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </PageMain>
</template>
<script>
import { rsaEn } from '@/utils/tools'
import { mapState } from 'vuex'
import request from '@/utils/request'
export default {
  data () {
    const validatePass = (rule, value, callback, str) => {
      if (value === '') {
        callback(new Error(`请输入${str}密码`))
      } else if (value.length < 6) {
        callback(new Error(`密码长度必须是6位以上哦！`))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validateOldPass = (rule, value, callback) => validatePass(rule, value, callback, '原')
    const validateNewPass = (rule, value, callback) => validatePass(rule, value, callback, '新')
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pageInfo: {
        sumbiting: false
      },
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, validator: validateOldPass, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validateNewPass, trigger: 'blur' }],
        checkPassword: [{ required: true, validator: validateCheckPass, trigger: 'blur' }]
      }
    }
  },
  computed: { ...mapState(['user']) },
  methods: {
    submit () {
      const { rsaKey } = this.user
      if (!rsaKey) {
        this.$message.error('RSA加密公钥丢失，请重新登录后重新尝试操作！')
        return false
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const { oldPassword, newPassword } = this.form
          const data = {
            oldPassword: rsaEn(oldPassword, rsaKey),
            newPassword: rsaEn(newPassword, rsaKey)
          }
          request({
            url: 'change_password',
            method: 'post',
            data
          }).then(r => {
            this.$message.success('密码修改成功！')
          })
        }
      })
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>
