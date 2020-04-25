<template>
  <div v-loading="pageInfo.loading" class="page-main">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" style="width: 500px" />
      </el-form-item>
      <el-form-item label="归属栏目" prop="channel">
        <el-cascader
          v-model="form.channel"
          :options="base.treeChannel"
          :props="{ checkStrictly: false }"
          clearable
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="5" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="pageInfo.sumbiting" @click="submit">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import editPage from '@/mixin/editPage'
import { getTreeChannel, getChannel } from '@/api/channel'
export default {
  mixins: [editPage],
  data () {
    return {
      pageInfo: {
        apiName: 'article',
        itemName: '文章'
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
    beforeGetData () {
      const tree = getTreeChannel().then(r => { this.base.treeChannel = r.data })
      const chan = getChannel().then(r => { this.base.channel = r.data.list })
      return [tree, chan]
    },
    afterGetData (data) {
      this.form = data
      const channel = []
      const calcChan = (id) => {
        const chanItem = this.base.channel.filter(i => i.id === id)[0]
        channel.push(chanItem.id)
        if (chanItem.pid !== 0) calcChan(chanItem.pid)
      }
      calcChan(data.channel_id)
      this.form.channel = channel.reverse()
    },
    calcSubmitData (data) {
      data = { ...data }
      data.channel_id = data.channel[data.channel.length - 1]
      delete data.channel
      return data
    }
  }
}
</script>
