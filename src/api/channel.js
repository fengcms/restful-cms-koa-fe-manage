import request from '@/utils/request'

export function getTreeChannel () {
  return request({
    url: 'tree_channel',
    method: 'get'
  })
}
export function getChannel () {
  return request({
    url: 'channel',
    method: 'get',
    params: {
      pageSize: -1
    }
  })
}
