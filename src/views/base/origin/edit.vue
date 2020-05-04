<template>
  <el-dialog :title="`${actionText}来源`" :visible="visible" width="620px" :close-on-click-modal="false" :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="来源名称" prop="name">
          <el-input v-model="form.name" style="width: 200px" />
        </el-form-item>
        <el-form-item label="LOGO" prop="logo">
          <UpImg v-model="form.logo" :limit="1" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" style="width: 200px" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" :maxlength="11" style="width: 200px" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 300px" />
        </el-form-item>
        <el-form-item label="主页" prop="website">
          <el-input v-model="form.website" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model="form.mark" type="textarea" autocomplete="off" style="width: 500px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" :loading="sumbiting" @click="submit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import editDialog from '@/mixin/editDialog'
export default {
  mixins: [editDialog],
  data () {
    return {
      pageInfo: {
        apiName: 'origin'
      },
      form: {
        name: '',
        contact: '',
        mobile: '',
        email: '',
        website: '',
        mark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入来源名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
      }
    }
  },
  methods: {}
}
</script>
