import JSEncrypt from 'jsencrypt'

// 精确校验数据格式方法
export const toType = obj => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 滤空方法
export const filterNull = o => {
  for (const key in o) {
    if (o[key] == null) delete o[key]
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (o[key] === '') delete o[key]
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
      if (JSON.stringify(o[key]) === '{}') delete o[key]
    } else if (toType(o[key]) === 'array') {
      // console.log(o[key])
      o[key] = filterNull(o[key])
      // console.log(o[key])
      o[key] = o[key].filter(arr => arr)
      if (o[key].length === 0) delete o[key]
    }
  }
  return o
}
/*
  多选框 全选 反选 不选 工具方法，支持单层和双层数据处理
  参数说明：
  type: String 操作功能
        'all'      全选
        ‘no’       不选
        'reverse'  反选
  checkedItems: Array  已经选中的多选框数据值数组
  allItems: Array      全部可选择的多选框数据值数组
  classItems: Array or null 仅需要处理的一组可选多选框数据值
*/
export const checkBoxTool = (type, checkedItems, allItems, classItems) => {
  let classChecked = []
  if (classItems) {
    // 组内选择功能
    // 计算当前项中已经选择的数据
    classItems.forEach(i => {
      checkedItems.includes(i) && classChecked.push(i)
    })
    // 在全部选择的数据中剔除当前组已选择的数据
    classChecked.forEach(i => {
      checkedItems.includes(i) && (delete checkedItems[checkedItems.indexOf(i)])
    })
    // 删除数据后，需要给已选择数据过滤空
    checkedItems = checkedItems.filter(i => i)
  } else {
    // 全部数据功能处理
    classItems = allItems
    classChecked = [...checkedItems]
    checkedItems = []
  }
  // 分别处理计算结果
  let res = []
  const actions = {
    all: () => {
      res = [...classItems]
    },
    no: () => {
      res = []
    },
    reverse: () => {
      classItems.forEach(i => !classChecked.includes(i) && res.push(i))
    }
  }
  actions[type]()
  return [...checkedItems, ...res]
}

/*
  构造 element-ui 通用 树形数据方法，接受一个参数对象
  {
    pid           顶级ID，一般为 0
    list          待计算的一维对象数组
    pidFiled      在原数组对象中 索引父ID字段名
    labelFiled    在原数组对象中 中文字段名
    valueFiled    在原数组对象中 值字段名
    moreLevel     最高递归层级， 默认为 99 层
  }
*/
export const makeElementTree = (params) => {
  const { pid, list, pidFiled, labelFiled, valueFiled, moreLevel = 99 } = params
  const makeTree = (pid, arr, level) => {
    const res = []
    arr.forEach(i => {
      if (i[pidFiled] === pid) {
        const rep = level < moreLevel ? makeTree(i[valueFiled], list, level + 1) : []
        const obj = {
          label: i[labelFiled],
          value: i[valueFiled]
        }
        rep.length && (obj.children = rep)
        res.push(obj)
      }
    })
    return res
  }
  return makeTree(pid, list, 1)
}

// 如果是数据类型的值，则返回数字，否则返回原值
export const calcNumberString = str => {
  return str === '' ? '' : isNaN(str) ? str : +str
}

// 富文本格式化函数
export const HTMLDecode = (text) => {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  text = text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
  text = text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
  return text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
}
// JSON 数据转 Url search 参数字符串
export const obj2Url = obj => {
  obj = filterNull(obj)
  return Object.keys(obj).map(i => `${i}=${obj[i]}`).join('&')
}
// Url search 参数字符串 转 JSON 数据
export const url2Obj = (url = '') => {
  const obj = {}
  url.slice(url.indexOf('?') + 1).split('&').forEach(i => {
    const temp = i.split('=')
    obj[temp[0]] = temp[1]
  })
  return filterNull(obj)
}
export const rsaEn = (str, key) => {
  try {
    const JSE = new JSEncrypt()
    JSE.setPublicKey(key)
    return JSE.encrypt(str)
  } catch (e) {
    return new Error(e)
  }
}
export default {
  toType,
  filterNull,
  checkBoxTool,
  makeElementTree,
  calcNumberString,
  HTMLDecode,
  obj2Url,
  url2Obj,
  rsaEn
}
