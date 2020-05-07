import dayjs from 'dayjs'
import request from '@/utils/request'
import { PageSize } from '@/config/index'
import { toType } from '@/utils/tools'
export default {
  data () {
    return {
      pageInfo: {},
      tableData: [],
      searchItems: {},
      pageParams: {
        page: 0,
        pageSize: PageSize
      },
      pageResult: {
        count: 0,
        pageSize: PageSize
      },
      tableLoading: true,
      selectionArray: [],
      tableBase: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // 页面数据接口
      const apiName = this.pageInfo.listApiName || ''
      if (!apiName) {
        this.$message.error('列表数据接口配置错误，请前端检查代码！')
        return
      }
      // 如果有前置执行函数，优先执行（该方法与接下来的请求是异步关系，执行顺序没有必然优先）
      const beforePromise = this.beforeGetData ? this.beforeGetData() : []
      Promise.all(beforePromise).then(() => {
        // 组织参数
        const searchParams = this.calcSearchParams()
        const params = { ...this.pageParams, ...searchParams }
        this.tableLoading = true
        request({
          url: apiName,
          method: 'get',
          params: params
        }).then(r => {
          const { count, pageSize, list } = r.data
          this.pageResult = { count, pageSize }
          // 如果有执行完执行方法，则执行并传入接口返回结果
          if (this.afterGetData) {
            const afterGetData = this.afterGetData(r.data)
            if (afterGetData) this.tableData = afterGetData
          } else {
            this.tableData = list
          }
        }).catch(e => {
          this.tableData = []
          console.log(e)
        }).finally(() => {
          this.tableLoading = false
        })
      })
    },
    calcSearchParams () {
      const searchParams = { ...this.searchParams } || {}
      const searchParamsTear = { ...this.searchParamsTear } || {}
      const tearTypes = {
        // 区间计算方法，将一个两位的数组处理成用中划线隔开的字符串
        // 如 [1, 2] >>> '1-2', [1] >>> '1', [] >>> ''
        between (params = []) {
          const [start = '', end = ''] = params
          return start + (start && end && '-') + end
        },
        join (params) {
          return params.join(',')
        }
        // 更多类型可根据需要在这里增加
      }
      // 循环处理各个搜索拆解参数
      for (const i in searchParamsTear) {
        const params = searchParams[i]
        /*
          支持对象格式和字符串的拆解配参
          Object time: { type: 'between', field: 'time' }
            用于拆解字段与保存字段名不一致的情况
          Object time: { type: 'between' }
            上一种支持了，这个就顺便支持了
          String time: 'between'
            简写方法，推荐
          以上配参方式都可以将 time 执行 between 拆解方法
        */
        const tearToType = toType(searchParamsTear[i])
        let type, field
        // 根据配参获得处理类型以及字段
        if (tearToType === 'object') {
          type = searchParamsTear[i].type
          field = searchParamsTear[i].field || i
          delete searchParams[i]
        }
        if (tearToType === 'string') {
          type = searchParamsTear[i]
          field = i
        }
        // 方法被支持则执行，否则报错
        if (tearTypes[type]) {
          searchParams[field] = tearTypes[type](params)
        } else {
          console.error(new Error('搜索配参类型不被支持，请检查搜索配参字段 searchParamsTear: ' + i))
        }
      }
      return searchParams
    },
    pageCurrChange (e) {
      this.pageParams.page = e - 1
      this.getData()
    },
    pageSizeChange (e) {
      this.pageParams.pageSize = e
      this.getData()
    },
    resetData () {
      this.pageParams.page = 0
      this.pageParams.pageSize = this.pageResult.pageSize
      this.getData()
    },
    upSearchParams (r) {
      this.searchParams = { ...r }
    },
    selectionChange (r) {
      this.selectionArray = [...r]
    },
    // 表格列数据格式化函数
    tableColFormat (row, col, val) {
      const feild = col.property
      const baseDict = this.tableBase[feild]
      // 首先从字典中查看，看有无配置字典以及字典中是否有对应的值
      const calcRes = dict => dict ? dict[val] : ''

      let res = calcRes(baseDict)
      // 如果字典中不存在，则尝试在搜索配置项中查找是否有同源数据
      if (!res) {
        const searchItems = this.searchItems[feild]
        // 如果字典中未配置数据，则将搜索项中的同源数据整理并赋值到 tableBase 里面去，避免多行数据每次到这里进行数组过滤的复杂运算
        if (!baseDict && searchItems && searchItems.options && searchItems.options.length) {
          const dict = {}
          searchItems.options.forEach(i => {
            dict[i.value] = i.label
          })
          this.tableBase[feild] = dict
          res = calcRes(dict)
        }
      }
      return res || '配参异常'
    },
    tableColFormatDate (row, col, val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
