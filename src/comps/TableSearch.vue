<template>
  <div class="page-search-box">
    <el-form ref="searchParams" :model="searchParams" :inline="true">
      <el-form-item v-for="(i, k) in items" :key="k" :label="i.label" :prop="i.field" :class="`${i.unit ? 'niao-search-form-item' : ''}`">
        <!-- 文本框 -->
        <el-input
          v-if="i.type === 'input' || i.type == null"
          v-model="searchParams[i.field]"
          :placeholder="i.placeholder"
          :style="`width:${i.width ? i.width : '120'}px`"
          clearable
        />
        <!-- 下拉选择器 -->
        <el-select
          v-if="i.type === 'select'"
          v-model="searchParams[i.field]"
          :placeholder="i.placeholder"
          :style="`width:${i.width ? i.width : '120'}px`"
        >
          <el-option
            v-for="ii in i.option"
            :key="ii.lable"
            :label="ii.label"
            :value="ii.value"
          />
        </el-select>
        <!-- 单选框 默认样式-->
        <el-radio-group
          v-if="i.type === 'radio'"
          v-model="searchParams[i.field]"
        >
          <el-radio
            v-for="ii in i.option"
            :key="ii.lable"
            :label="ii.value"
          >
            {{ ii.label }}
          </el-radio>
        </el-radio-group>
        <!-- 单选框 按钮样式 -->
        <el-radio-group
          v-if="i.type === 'radioBtn'"
          v-model="searchParams[i.field]"
        >
          <el-radio-button
            v-for="ii in i.option"
            :key="ii.lable"
            :label="ii.value"
          >
            {{ ii.label }}
          </el-radio-button>
        </el-radio-group>
        <!-- 日期选择器 -->
        <el-date-picker
          v-if="i.type === 'datePicker'"
          v-model="searchParams[i.field]"
          :type="i.pickerType || 'date'"
          :style="`width:${i.width ? i.width : i.pickerType.includes('range') ? '280' : '140'}px`"
          :placeholder="i.placeholder"
          :start-placeholder="i.startPlaceholder"
          :end-placeholder="i.endPlaceholder"
          :value-format="i.format || `yyyy-MM-dd HH:mm:ss`"
        />
        <!-- 联级菜单 -->
        <el-cascader
          v-if="i.type === 'cascader'"
          v-model="searchParams[i.field]"
          :style="`width:${i.width ? i.width : '240'}px`"
          :options="i.option"
          :props="{ checkStrictly: true }"
          clearable
        />
        <!-- 联级菜单 -->
        <el-input-number
          v-if="i.type === 'number'"
          v-model="searchParams[i.field]"
          :style="`width:${i.width ? i.width : '160'}px`"
        />
        <span v-if="i.unit" class="niao-search-form-item-unit">{{ i.unit }}</span>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!realtime" type="primary" @click="resetData">查询</el-button>
        <el-button v-if="!noreset" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button-group ref="rightBtns" :class="`el-form-item el-form-item--${$store.getters.size} niao-search-form-right-group`" :size="$store.getters.size">
      <slot />
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'TableSearch',
  props: {
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    /*
      传入搜索项参数，支持文本框和下拉框
      field: 'catname' 搜索字段名          必填项
      type: 'input' or 'select'          非填项 * 默认为 'input'
      label: '状态' 项目名称               非必填
      placeholder: '请输入XXX' 提示文案    非必填
      width: 100 文本框宽度，              非必填
      unit: '元' 后置单位                  非必填
      option: [{ label: '全部', value: 200 }] 下拉框必填

      传参示例:
      searchItems: [
        { type: 'input', label: '分类名称', field: 'catname', width: 100 },
        {
          type: 'select', label: '状态', field: 'useStatus',
          option: [
            { label: '全部', value: 200 },
            { label: '启用', value: 1 },
            { label: '禁用', value: -1 }
          ]
        }
      ]
    */
    items: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否开启实时搜索
    realtime: { type: Boolean, default: false },
    // 是否需要重置按钮
    noreset: { type: Boolean, default: false }
  },
  data () {
    return {
      searchParams: {}
    }
  },
  watch: {
    searchParams: {
      handler: function (val, oldVal) {
        this.$emit('upSearchParams', val)
        this.realtime && this.resetData()
      },
      deep: true
    }
  },
  created () {
    this.searchParams = { ...this.model }
  },
  methods: {
    resetData () {
      if (this.$parent.resetData) {
        this.$parent.resetData()
      } else if (this.$parent.$parent.resetData) {
        this.$parent.$parent.resetData()
      } else {
        console.log('是不是把这个组件用错地方了？')
      }
    },
    resetSearch () {
      this.$refs['searchParams'].resetFields()
      setTimeout(() => this.resetData(), 0)
    }
  }
}
</script>
<style lang="scss">
.page-search-box {
  display: flex;justify-content: space-between;
}
.niao-search-form-item {
  .el-form-item__content {
    white-space: nowrap;
  }
  .niao-search-form-item-unit {
    color: #999;
  }
}
.niao-search-form-right-group {
  display: flex;align-items: flex-end;
}
</style>
