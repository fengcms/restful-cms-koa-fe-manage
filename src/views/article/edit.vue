<template>
  <PageMain v-loading="pageInfo.loading">
    <ControlBox>
      <ControlBtn icon="el-icon-arrow-left" type="default" :loading="pageInfo.sumbiting" @click="$router.push('/article')">返回文章列表</ControlBtn>
      <ControlBtn icon="el-icon-check" :loading="pageInfo.sumbiting" @click="submit">保存文章</ControlBtn>
      <ControlBtn icon="el-icon-close" type="danger" @click="resetForm">清空录入</ControlBtn>
      <ControlBtn icon="el-icon-edit" type="warning" @click="changeTempEditor">切换编辑器</ControlBtn>
    </ControlBox>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-tabs v-model="pageInfo.tabActive">
        <el-tab-pane label="基础信息" name="base">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" clearable style="width: 500px" />
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
          <el-form-item label="关键词" prop="tags">
            <el-input v-model="form.tags" clearable style="width: 500px" />
            <Tip block>英文逗号隔开</Tip>
          </el-form-item>
          <el-form-item label="文章概要" prop="description">
            <el-input v-model="form.description" clearable type="textarea" :rows="3" placeholder="请输入文章概要" style="width: 500px" />
            <Tip block>如文章摘要留空，则会自动截取文章正文前200个字符作为文章概要</Tip>
          </el-form-item>
          <el-form-item label="封面图片" prop="img">
            <UpImg v-model="form.img" :limit="1" />
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="form.author" clearable style="width: 200px" />
          </el-form-item>
          <el-form-item label="来源" prop="origin">
            <el-input v-model="form.origin" clearable style="width: 200px" />
          </el-form-item>
          <el-form-item label="编辑" clearable prop="editor">
            <el-input v-model="form.editor" style="width: 200px" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="文章内容" name="content">
          <el-form-item v-if="calcEditorType() !== 'MARKDOWN'" prop="content" label-width="0px">
            <RichEditor v-model="form.content" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item v-else prop="markdown" label-width="0px">
            <MarkEditor v-model="form.markdown" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </PageMain>
</template>
<script>
import editPage from '@/mixin/editPage'
import { mapState } from 'vuex'
import { getTreeChannel, getChannel } from '@/api/channel'
export default {
  mixins: [editPage],
  data () {
    return {
      // 页面基础信息配置
      pageInfo: {
        apiName: 'article', // 编辑页面接口名称
        itemName: '文章', // 编辑页面项目名称
        // 以下为页面自定义参数
        tabActive: 'base',
        tempEditor: null
      },
      // 表单初始数据
      form: {
        title: '',
        content: '',
        markdown: '',
        channel: [],
        description: '',
        editor: '',
        tags: '',
        origin: '',
        author: ''
      },
      // 表单校验规则 参考 https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 100, message: '文章标题长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        markdown: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择文章归属栏目', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '请选择文章归属栏目', trigger: 'blur' }
        ]
      },
      // 页面基础字典数据
      base: {
        treeChannel: [],
        channel: []
      }
    }
  },
  computed: { ...mapState(['user']) },
  created () {},
  methods: {
    // 临时切换编辑器类型
    changeTempEditor () {
      this.pageInfo.tabActive = 'content'
      const currEditorType = this.calcEditorType()
      const { content, markdown } = this.form
      const changeFunc = () => {
        this.pageInfo.tempEditor = currEditorType === 'MARKDOWN' ? 'RICHEDITOR' : 'MARKDOWN'
      }
      if (!content && !markdown) {
        changeFunc()
      } else {
        const tip = !markdown && currEditorType === 'RICHEDITOR'
          ? `本文由富文本编辑器编辑，切换为 markdown 编辑器会导致原有内容全部丢失`
          : `切换编辑器会导致你当前编辑的文章内容丢失`
        this.$confirm(tip + '，确认继续？', '警告', { type: 'warning' }).then(() => {
          changeFunc()
        })
      }
    },
    // 检查当前编辑器类型
    calcEditorType () {
      const {
        pageInfo: { tempEditor },
        form: { content, markdown },
        user: { editor: defaultEditor }
      } = this
      if (tempEditor) return tempEditor
      if (!content && !markdown) return defaultEditor
      if (content && !markdown) return 'RICHEDITOR'
      return 'MARKDOWN'
    },

    /* 以下函数为配合 mixin 方法的配套方法 */

    // 获取详情数据之前执行方法，可省略
    // 需返回一个数组，里面包含提前执行的 Promise
    // 如无需确保在详情数据接口请求之前执行，可不返回值或返回空数组
    beforeGetData () {
      const tree = getTreeChannel().then(r => { this.base.treeChannel = r.data })
      const chan = getChannel().then(r => { this.base.channel = r.data.list })
      return [tree, chan]
    },
    // 获取详情数据后处理方法，入参为接口返回数据，可省略
    // 可将数据处理处理好 return，亦可不返回数据，直接在函数内对 this.form 进行赋值
    afterGetData (data) {
      const channel = []
      const calcChan = (id) => {
        const chanItem = this.base.channel.filter(i => i.id === id)[0]
        channel.push(chanItem.id)
        if (chanItem.pid !== 0) calcChan(chanItem.pid)
      }
      calcChan(data.channel_id)
      data.channel = channel.reverse()
      return data
    },
    // 计算提交参数，该方法在数据通过校验后，数据提交接口之前执行，可省略
    // 方法入参为通过校验的表单数据，处理好提交数据后，return 返回
    calcSubmitData (data) {
      data = { ...data }
      data.channel_id = data.channel[data.channel.length - 1]
      delete data.channel
      return data
    },
    // 表单数据未通过时执行方法，入参为错误信息，可省略
    submitError (msg) {
      Object.keys(msg).forEach(key => {
        msg[key].forEach((item, index) => {
          setTimeout(() => {
            this.$message.error(item.message)
          }, 500 * index)
        })
      })
    }
  }
}
</script>
