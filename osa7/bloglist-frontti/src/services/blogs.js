import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const restoreToken = tokenToSave => {
  token = `bearer ${tokenToSave}`

}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async info => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.post(baseUrl, info, config)
  return res.data
}

const patch = async (id, info) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.patch(`${baseUrl}/${id}`, info, config)
  return res.data

}

const postComment = async (id, comment) => {

  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return res.data
}


const remove = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data

}



export default { getAll, restoreToken, create, patch, remove, postComment }