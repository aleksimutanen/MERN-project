import axios from 'axios'

const baseUrl = '/api/projects'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, content, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const uploadImages = async (formData) => {
  const response = await axios.post(`${baseUrl}/images`, formData)
  return response.data
}

const getImage = async (fileName) => {
  const response = await axios.get(`${baseUrl}/image/${fileName}`, { responseType: 'blob'})
  return response.data
}

export default {
  getAll,
  getById,
  createNew,
  update, 
  getImage,
  uploadImages,
  setToken,
  remove
}