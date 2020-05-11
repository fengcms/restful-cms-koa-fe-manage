<template>
  <PageMain v-loading="pageInfo.loading">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="站点名称" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="站点标题" prop="title">
        <el-input v-model="form.title" style="width: 500px" />
      </el-form-item>
      <el-form-item label="LOGO" prop="logo">
        <UpImg v-model="form.logo" :limit="1" />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="form.keywords" style="width: 500px" />
        <QuickAssistant v-model="form.keywords" type="tags" mode="append" />
        <Tip block>英文逗号隔开</Tip>
      </el-form-item>
      <el-form-item label="站点描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" style="width: 500px" />
      </el-form-item>
      <el-form-item label="版权" prop="copyright">
        <el-input v-model="form.copyright" type="textarea" :rows="3" style="width: 500px" />
        <Tip>支持HTML</Tip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="pageInfo.sumbiting" @click="submit">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
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
        apiName: 'site',
        itemName: '站点信息',
        editId: 'first'
      },
      form: {
        title: '',
        content: '',
        channel: []
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择文章归属栏目', trigger: 'blur' }
        ]
      },
      base: {
        treeChannel: [],
        channel: []
      }
    }
  },
  created () {},
  methods: {
  }
}
</script>
