/* eslint-disable */

import axios from 'axios'
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

/* ------------------影院部分------------------------- */
// 获取影院数据
// day 日期
export const getFilms = (day) => axios.get(`/api/ajax/cinemaList?day=${day}&offset=0&limit=20`)