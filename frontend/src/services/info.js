import axios from 'axios'

const baseUrl = '/api/info'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const get = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
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
  get,
  update, 
  setToken,
  uploadImages,
  getImage
}