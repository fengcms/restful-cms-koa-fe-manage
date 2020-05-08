<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-arrow-left" type="default" @click="$router.push('/')">返回后台首页</ControlBtn>
      <ControlBtn icon="el-icon-key" @click="$router.push('/changePassword')">修改密码</ControlBtn>
    </ControlBox>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" style="width: 200px" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <UpImg v-model="form.avatar" :limit="1" />
      </el-form-item>
      <el-form-item label="编辑器" prop="editor">
        <el-radio-group v-model="form.editor">
          <el-radio-button label="MARKDOWN">MarkDown 编辑器</el-radio-button>
          <el-radio-button label="RICHEDITOR">富文本编辑器</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" :maxlength="11" style="width: 200px" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" style="width: 300px" />
      </el-form-item>
      <el-form-item v-if="role === 'editor'" label="主页" prop="website">
        <el-input v-model="form.website" style="width: 300px" />
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input v-model="form.mark" type="textarea" autocomplete="off" style="width: 500px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="pageInfo.sumbiting" @click="submit">保存个人信息</el-button>
      </el-form-item>
    </el-form>
  </PageMain>
</template>
<script>
import editPage from '@/mixin/editPage'
export default {
  mixins: [editPage],
  data () {
    return {
      pageInfo: {
        apiName: 'profile',
        editId: 'first'
      },
      changePassword: false,
      form: {
        account: '',
        name: '',
        avatar: '',
        mobile: '',
        email: '',
        website: '',
        mark: '',
        editor: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        editor: [
          { required: true, message: '请选择常用编辑器', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3456789]\d{9}$/i, message: '手机号格式不正确', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        website: [
          { type: 'url', message: '网址格式不正确', trigger: 'blur' }
        ]
      },
      role: ''
    }
  },
  methods: {
    afterGetData (data) {
      this.role = data.role
      delete data.role
      return data
    }
  }
}
</script>
