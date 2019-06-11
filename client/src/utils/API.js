import axios from "axios";

export const getAllSearches = () => {
  return axios.get(`/api/searches`)
}

export const getSearchById = (searchId) => {
  return axios.get(`/api/searches/${searchId}`)
}

export const saveSearch = (searchInfo) => {
  return axios.post(`/api/searches/`, searchInfo)
}

export const deleteSearch = (searchId) => {
  return axios.delete(`/api/searches/${searchId}`)
}

export const scrapeWhoSampled = (query) => {
  return axios.get('/api/samples', {params: {q: query}});
}

export default {
  saveSearch,
  getAllSearches,
  getSearchById,
  deleteSearch,
  scrapeWhoSampled
}

