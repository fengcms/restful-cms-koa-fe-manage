<template>
  <el-dialog :title="`${actionText}栏目`" :visible="visible" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="栏目名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px" />
        </el-form-item>
        <el-form-item label="归属栏目" prop="pidArr">
          <el-cascader
            v-model="form.pidArr"
            :options="base.treeChannel"
            :props="{ checkStrictly: true }"
            style="width: 500px"
            clearable
          />
        </el-form-item>
        <el-form-item label="栏目排序" prop="sort">
          <el-input-number v-model="form.sort" style="width: 200px" />
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
import { getTreeChannel, getChannel } from '@/api/channel'
export default {
  mixins: [editDialog],
  data () {
    return {
      pageInfo: {
        apiName: 'channel'
      },
      form: {
        name: '',
        pidArr: [],
        sort: 0
      },
      base: {
        treeChannel: [{ label: '顶级栏目', value: 0, children: [] }],
        channel: []
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        pidArr: [
          { required: true, type: 'array', message: '请选择归属栏目', trigger: 'blur' }
        ],
        sort: [
          { required: true, type: 'number', message: '请输入栏目排序', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    beforeInit () {
      const tree = getTreeChannel().then(r => { this.base.treeChannel[0].children = r.data })
      const chan = getChannel().then(r => { this.base.channel = [...r.data.list] })
      return [tree, chan]
    },
    afterGetData (data) {
      const channel = []
      const calcChan = (id) => {
        const chanItem = this.base.channel.filter(i => i.id === id)[0]
        channel.push(chanItem.id)
        if (chanItem.pid !== 0) calcChan(chanItem.pid)
      }
      data.pid !== 0 && calcChan(data.pid)
      channel.reverse()
      data.pidArr = [0, ...channel]
      return data
    },
    calcSubmitData (data) {
      data.pid = data.pidArr.pop()
      delete data.pidArr
      return data
    }
  }
}
</script>
