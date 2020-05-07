<template>
  <div class="page-search-box">
    <el-form ref="searchParams" :model="searchParams" :inline="true">
      <el-form-item v-for="(i, k) in searchItems" :key="k" :label="i.label" :prop="k" :class="`${i.unit ? 'niao-search-form-item' : ''}`">
        <!-- 文本框 -->
        <el-input
          v-if="i.type === 'input' || i.type == null"
          v-model="searchParams[k]"
          :placeholder="i.placeholder"
          :style="`width:${i.width ? i.width : '140'}px`"
          clearable
        />
        <!-- 下拉选择器 -->
        <el-select
          v-if="i.type === 'select'"
          v-model="searchParams[k]"
          :placeholder="i.placeholder"
          :style="`width:${i.width ? i.width : '140'}px`"
        >
          <el-option
            v-for="ii in i.options"
            :key="ii.lable"
            :label="ii.label"
            :value="ii.value"
          />
        </el-select>
        <!-- 单选框 -->
        <el-radio-group
          v-if="['radio', 'radioBtn'].includes(i.type)"
          v-model="searchParams[k]"
        >
          <!-- 默认样式-->
          <template v-if="i.type === radio">
            <el-radio
              v-for="ii in i.options"
              :key="ii.lable"
              :label="ii.value"
            >
              {{ ii.label }}
            </el-radio>
          </template>
          <!-- 按钮样式 -->
          <template v-else>
            <el-radio-button
              v-for="ii in i.options"
              :key="ii.lable"
              :label="ii.value"
            >
              {{ ii.label }}
            </el-radio-button>
          </template>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group
          v-if="['checkbox', 'checkboxBtn'].includes(i.type)"
          v-model="searchParams[k]"
        >
          <!-- 默认样式-->
          <template v-if="i.type === checkbox">
            <el-checkbox
              v-for="ii in i.options"
              :key="ii.lable"
              :label="ii.value"
            >
              {{ ii.label }}
            </el-checkbox>
          </template>
          <!-- 按钮样式 -->
          <template v-else>
            <el-checkbox-button
              v-for="ii in i.options"
              :key="ii.lable"
              :label="ii.value"
            >
              {{ ii.label }}
            </el-checkbox-button>
          </template>
        </el-checkbox-group>
        <!-- 日期选择器 -->
        <el-date-picker
          v-if="i.type === 'datePicker'"
          v-model="searchParams[k]"
          :type="i.pickerType || 'date'"
          :style="`width:${i.width ? i.width : i.pickerType.includes('range') ? '280' : '180'}px`"
          :placeholder="i.placeholder"
          :start-placeholder="i.startPlaceholder || '开始时间'"
          :end-placeholder="i.endPlaceholder || '结束时间'"
          :value-format="i.format || `timestamp`"
        />
        <!-- 联级菜单 -->
        <el-cascader
          v-if="i.type === 'cascader'"
          v-model="searchParams[k]"
          :style="`width:${i.width ? i.width : '240'}px`"
          :options="i.options"
          :props="{ checkStrictly: true }"
          clearable
        />
        <!-- 联级菜单 -->
        <el-input-number
          v-if="i.type === 'number'"
          v-model="searchParams[k]"
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
import { toType } from '@/utils/tools'
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
      传入搜索项参数，为对象，支持文本框、下拉框、多选、单选、级联菜单、时间日期选择器等等
      key: 搜索字段名
      value: 可为字符串或对象
        String:value
          默认搜索类型为 'input', 项目名为 value 值， 提示文案为： 请输入{value}
        Object:value
          type: 'input'                      非填项 * 默认为 'input'
            'input'        文本框
            'number'       数字文本框
            'select'       下拉菜单
            'radio'        单选框普通形态
            'radioBtn'     单选框按钮形态
            'checkbox'     多选框普通形态
            'checkboxBtn'  多选框按钮形态
            'datePicker'   日期选择器
            'cascader'     级联菜单
          label: '状态' 项目名称               非必填
          placeholder: '请输入XXX' 提示文案    非必填
          width: 100 搜索项宽度，根据情况调整    非必填
          unit: '元' 搜索项后置单位             非必填

          下拉框、多选、单选、级联菜单更多配置
            options: [{ label: '全部', value: 200 }]  必填
              级联菜单 option 为 element 树形结构数据 参考 https://element.eleme.cn/#/zh-CN/component/cascader

          时间日期选择器 更多配置
            pickerType: 'date'            时间日期选择器类型   非必填 * 默认为 'date'
              支持 element 全部时间选择器格式
              year/month/date/dates/week/datetime/datetimerange/daterange/monthrange

            format: 'timestamp'           输出值格式         非必填 * 默认为 'timestamp'
              参考 https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi

            当时间日期选择器类型包含 range 时表示是时间区间搜索
            startPlaceholder: '开始时间'    开始提示语        非必填 * 默认为 '开始时间'
            endPlaceholder: '结束时间'      结束提示语        非必填 * 默认为 '结束时间'

      传参示例:
      searchItems: {
        'title-like': '文章标题',
        time: {
          type: 'datePicker', label: '时间区间', pickerType: 'daterange'
        },
        useStatus: {
          type: 'select', label: '状态',
          options: [
            { label: '全部', value: 200 },
            { label: '启用', value: 1 },
            { label: '禁用', value: -1 }
          ]
        }
      }
    */
    items: {
      type: Object,
      default () {
        return {}
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
  computed: {
    searchItems () {
      const items = {}
      for (const key in this.items) {
        const val = this.items[key]
        const valType = toType(val)
        if (valType === 'string') {
          items[key] = {
            label: val,
            placeholder: `请输入${val}`
          }
        }
        if (valType === 'object') {
          items[key] = val
        }
      }
      return items
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
