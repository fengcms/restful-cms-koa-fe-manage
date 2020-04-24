import request from '@/utils/request'
import { PageSize } from '@/config/index'
import { calcNumberString } from '@/utils/tools'
export default {
  data () {
    return {
      pageInfo: {
        dontGetData: false
      },
      tableData: [],
      searchItems: [],
      pageParams: {
        page: 1,
        pageSize: PageSize
      },
      pageResult: {
        count: 0,
        pageSize: 10
      },
      tableLoading: true,
      selectionArray: [],
      tableBase: {}
    }
  },
  created () {
    // 可通过 this.pageInfo.dontGetData 参数设定进入页面后不主动加载 this.getData()
    !this.pageInfo.dontGetData && this.getData()
  },
  methods: {
    getData () {
      // 优化页面数据接口，由一开始的 tableDataApiName 存放到了 pageInfo.listApiName 内，此处做新旧兼容处理
      const apiName = (this.pageInfo ? this.pageInfo.listApiName : false) || this.tableDataApiName
      if (!apiName) {
        this.$message.error('列表数据接口配置错误，请前端检查代码！')
        return
      }
      // 如果有前置执行函数，优先执行（该方法与接下来的请求是异步关系，执行顺序没有必然优先）
      this.beforeGetData && this.beforeGetData()
      // 组织参数
      const searchParams = this.calcSearchParams()
      const params = { ...this.pageParams, ...searchParams }
      this.tableLoading = true
      request({
        url: apiName,
        method: 'post',
        data: params
      }).then(r => {
        const { count, pageSize, list } = r.data
        this.pageResult = { count, pageSize }
        // 如果有执行完执行方法，则执行并传入接口返回结果
        // this.afterGetData && this.afterGetData(r.data)
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
    },
    calcSearchParams () {
      const searchParams = { ...this.searchParams } || {}
      // 处理搜索参数数组分拆为多个值得情况，如将地区ID数组，分拆为 areaId1 areaId2 areaId3 这样的
      const searchParamsTear = { ...this.searchParamsTear } || {}
      for (const i in searchParamsTear) {
        searchParamsTear[i].forEach((val, index) => {
          searchParams[i][index] && (searchParams[val] = searchParams[i][index])
        })
        delete searchParams[i]
      }
      // 处理搜索参数数组取最后一个值的情况，如取分类ID，只需要最后一位
      const searchParamsPop = { ...this.searchParamsPop } || {}
      for (const i in searchParamsPop) {
        const pop = searchParams[i].pop()
        pop != null && (searchParams[searchParamsPop[i]] = pop)
        delete searchParams[i]
      }
      return searchParams
    },
    pageCurrChange (e) {
      this.pageParams.page = e
      this.getData()
    },
    pageSizeChange (e) {
      this.pageParams.pageSize = e
      this.getData()
    },
    resetData () {
      this.pageParams.page = 1
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
    tableColFormat (row, col) {
      const calcRes = () => {
        // 首先从 tableBase 数据中查看，看有无配置字典以及字典中是否有对应的值
        return this.tableBase[col.property] ? this.tableBase[col.property][row[col.property]] : ''
      }
      let res = calcRes()
      // 如果字典中不存在，则尝试在搜索配置项中查找是否有同源数据
      if (!res) {
        const searchItems = this.searchItems.filter(i => i.field === col.property)
        if (searchItems.length && searchItems[0].option && searchItems[0].option.length) {
          // 如果字典中未配置数据，则将搜索项中的同源数据整理并赋值到 tableBase 里面去，避免多行数据每次到这里进行数组过滤的复杂运算
          if (!this.tableBase[col.property]) {
            this.tableBase[col.property] = {}
            searchItems[0].option.forEach(i => {
              this.tableBase[col.property][i.value] = i.label
            })
            res = calcRes()
          }
        }
      }
      return res || '配参异常'
    },
    tableColMoney (row, col, val) {
      val = calcNumberString(val)
      return typeof val === 'number' ? `￥${val.toFixed(2)}元` : '入参错误'
    }
  }
}
