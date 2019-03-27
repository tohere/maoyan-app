const SETONETAB = 'SETONETAB'
const SETDISTRICT = 'SETDISTRICT'
const SETSUBWAY = 'SETSUBWAY'
const SETONEID = 'SETONEID'
const SETSECID = 'SETSECID'
const SETTWOTAB = 'SETTWOTAB'
const SETCINEMAS = 'SETCINEMAS'
const SETBRAND = 'SETBRAND'
const SETHALLTYPE = 'SETHALLTYPE'
const SETSERVICE = 'SETSERVICE'
const SETHS = 'SETHS'
const SETFIXED = 'SETFIXED'
const film = {
  state: {
    tabs: [
      { id: -1, name: '全城' },
      { id: -1, name: '品牌' },
      { id: -1, name: '特色' }
    ],
    district: [], // 城市集合
    subway: [], // 地铁集合
    oneId: -1, // 记录一级城市id
    secId: -1, // 记录二级城市id
    cinemas: [], // 影院集合
    brand: [], // 影院品牌
    hallType: [], // 特殊厅
    service: [], // 特色功能
    // 用来记录被选中的特殊厅和特色功能选项
    hs: {
      hallType: { id: -1 },
      service: { id: -1 }
    },
    isFixed: false // 控制详情页tab栏是否固定定位
  },
  mutations: {
    [SETONETAB] (state, item) {
      state.tabs[0] = item
    },
    /**
     * 获取城市
     */
    [SETDISTRICT] (state, district) {
      state.district = district
    },
    /**
     * 获取地铁线
     */
    [SETSUBWAY] (state, subway) {
      state.subway = subway
    },
    /**
     * 设置城市一级分类id
     */
    [SETONEID] (state, oneId) {
      state.oneId = oneId
    },
    /**
     * 设置城市二级分类id
     */
    [SETSECID] (state, secId) {
      state.secId = secId
    },
    [SETTWOTAB] (state, item) {
      state.tabs[1] = item
    },
    /**
     * 获取影院数据
     */
    [SETCINEMAS] (state, cinemas) {
      state.cinemas = cinemas
    },
    /**
     * 获取影院品牌
     */
    [SETBRAND] (state, brand) {
      state.brand = brand
    },
    /**
     * 获取特殊厅数据
     */
    [SETHALLTYPE] (state, hallType) {
      state.hallType = hallType
    },
    /**
     * 获取特色功能数据
     */
    [SETSERVICE] (state, service) {
      state.service = service
    },
    [SETHS] (state, hs) {
      state.hs = hs
    },
    // 设置fixed
    [SETFIXED] (state, isFixed) {
      state.isFixed = isFixed
    },
  },
  actions: {
    setOneTab ({commit}, item) {
      commit('SETONETAB', item)
    },
    setDistrict ({commit}, district) {
      commit('SETDISTRICT', district)
    },
    setSubway ({commit}, subway) {
      commit('SETSUBWAY', subway)
    },
    setOneId ({commit}, oneId) {
      commit('SETONEID', oneId)
    },
    setSecId ({commit}, secId) {
      commit('SETSECID', secId)
    },
    setTwoTab ({commit}, item) {
      commit('SETTWOTAB', item)
    },
    setCinemas ({commit}, cinemas) {
      commit('SETCINEMAS', cinemas)
    },
    setBrand ({commit}, brand) {
      commit('SETBRAND', brand)
    },
    setHallType ({commit}, hallType) {
      commit('SETHALLTYPE', hallType)
    },
    setService ({commit}, service) {
      commit('SETSERVICE', service)
    },
    setHS ({commit}, hs) {
      commit('SETHS', hs)
    },
    setFixed ({commit}, isFixed) {
      commit('SETFIXED', isFixed)
    }
  }
}

export default film
