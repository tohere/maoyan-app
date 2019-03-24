// 存储用户信息
const SETADDRESS = 'SETADDRESS'

const user = {
  state: {
    // 用户位置信息
    userAddress: {}
  },
  mutations: {
    // 存储用户位置信息
    [SETADDRESS] (state, address) {
      state.userAddress = address
    }
  },
  actions: {
    // 存储用户位置信息
    setAddress ({ commit }, address) {
      commit('SETADDRESS', address)
    }
  }
}

export default user
