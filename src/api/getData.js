/* eslint-disable */

import axios from '../axios.js'
console.log(axios)
// axios.defaults.baseURL = '/api'
/* ------------------Home页------------------------- */
// 获取电影列表数据
export const getVideos = () => axios.get('/api/ajax/movieOnInfoList?token=')

// 获取新电影数据
// movieIds 要获取的电影id
export const getNewVideos = (movieIds) => axios.get('/api/ajax/moreComingList', {params: {
  token: '',
  movieIds
}})

// 获取即将上映banner电影数据
export const getSoonBanner = () => axios.get('/api/ajax/mostExpected?ci=1&limit=10&offset=0&token=')

// 获取即将上映电影数据
export const getComing = () => axios.get('/api/ajax/comingList?ci=1&token=&limit=10')

// 加载更多即将上映的电影
// movieIds 要获取的电影id
export const getMoreComing = (movieIds) => axios.get('/api/ajax/moreComingList?ci=1&token=&limit=10&movieIds=' + movieIds)


/* ------------------电影详情页------------------------- */
// 通过id获取电影详情
// @params {Number} movieId 电影id
export const getMovieDetail = (movieId) => axios.get('/api/ajax/detailmovie?movieId=' + movieId)

// 通过条件获取电影院信息
// @params {Number} movieId 电影id
// @params {String} day 日期
// @params {Number} forceUpdate 当前时间戳
// @params {Boolean} updateShowDay 是否是当天时间
export const getFilmsCon = (movieId, day, forceUpdate, updateShowDay) => axios.post('/api/ajax/movie?forceUpdate=' + forceUpdate, {
  movieId,
  day,
  updateShowDay,
  offset:0,
  limit:20,
  districtId:-1,
  lineId:-1,
  hallType:-1,
  brandId:-1,
  serviceId:-1,
  areaId:-1,
  stationId:-1,
  item:'',
  cityId:1
})


/* ------------------影院部分------------------------- */
// 获取影院数据
// day 日期
export const getFilms = (day) => axios.get(`/api/ajax/cinemaList?day=${day}&offset=0&limit=20`)

// 获取城市、品牌、特色
export const getInfos = () => axios.get('/api/ajax/filterCinemas?ci=1')

// 根据条件获取数据
// @params {String} day 日期
// @params {Number} districtId 一级城市id
// @params {Number} areaId 二级城市id
// @params {Number} brandId 品牌id
// @params {Number} hallType 特殊厅id
// @params {Number} serviceId 特色功能id
// @params {Boolean} updateShowDay 是否是当天时间
export const getFilmsByCon = (day, districtId, areaId, brandId, hallType, serviceId, updateShowDay) => axios.get('/api/ajax/cinemaList', {params: {
  day,
  offset:0,
  limit:20,
  districtId,
  lineId:-1,
  hallType,
  brandId,
  serviceId,
  areaId,
  stationId:-1,
  item:'',
  updateShowDay,
  cityId:1
}})