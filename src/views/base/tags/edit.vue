<template>
  <el-dialog :title="`${actionText}关键词`" :visible="visible" width="620px" :close-on-click-modal="false" :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="关键词" prop="tag">
          <el-input v-model="form.tag" style="width: 200px" />
        </el-form-item>
        <el-form-item label="归属栏目" prop="channel">
          <el-cascader
            v-model="form.channel"
            :options="base.treeChannel"
            :props="{ checkStrictly: true }"
            clearable
            style="width: 400px"
          />
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
  props: {
    base: {
      type: Object,
      default () {
        return {
          treeChannel: [],
          channel: []
        }
      }
    }
  },
  data () {
    return {
      pageInfo: {
        apiName: 'tags'
      },
      form: {
        name: '',
        mobile: '',
        email: '',
        website: '',
        mark: ''
      },
      rules: {
        tag: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
