import request from '@/utils/request'

export function getRsaKey () {
  return request({
    url: 'rsa_public_key',
    method: 'get'
  })
}

export function login (data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: 'profile',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: 'logout',
    method: 'get'
  })
}
