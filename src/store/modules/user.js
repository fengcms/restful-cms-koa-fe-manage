import { getRsaKey, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { rsaEn } from '@/utils/tools'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: 'editor',
    editor: 'MARKDOWN',
    rsaKey: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_OTHER: (state, { role, editor }) => {
    state.role = role
    state.editor = editor
  },
  SET_RSA_KEY: (state, rsaKey) => {
    state.rsaKey = rsaKey
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { account, password, role } = userInfo
    return new Promise((resolve, reject) => {
      // 首先读取 rsa 公钥
      getRsaKey().then(r => {
        const key = r.data
        commit('SET_RSA_KEY', key)
        // 使用 rsa 公钥加密密码
        const enPw = rsaEn(password, key)
        // 提交登录接口
        login({ account: account.trim(), password: enPw, role }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('校验失败，请重新登录！')
        }

        const { name, account, avatar, role, editor } = data
        commit('SET_NAME', name || account)
        commit('SET_AVATAR', avatar || '/image/manage-ico.jpg')
        commit('SET_OTHER', { role, editor })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
