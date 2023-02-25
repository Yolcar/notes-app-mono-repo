import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }

  return axios
    .post(baseUrl, newObject, config)
    .then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  return axios
    .put(`${baseUrl}/${id}`, newObject, config)
    .then(response => response.data)
}

export default { getAll, create, update, setToken }
