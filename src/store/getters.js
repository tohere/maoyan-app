
const getters = {
  // 用户信息相关
  userAddress: state => state.user.userAddress,

  // film相关
  tabs: state => state.film.tabs,
  district: state => state.film.district,
  subway: state => state.film.subway,
  oneId: state => state.film.oneId,
  secId: state => state.film.secId,
  cinemas: state => state.film.cinemas,
  brand: state => state.film.brand,
  hallType: state => state.film.hallType,
  service: state => state.film.service,
  hs: state => state.film.hs,
  isFixed: state => state.film.isFixed
}

export default getters
