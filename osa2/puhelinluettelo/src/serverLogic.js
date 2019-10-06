import Axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = async () => {
    const res = await Axios.get(baseUrl)
    return res.data
}

export const postPerson = async (newPerson) => {
    const res = await Axios.post(baseUrl, newPerson)
    return res.data
}

export const deletePerson = (id) => {
    return Axios.delete(`${baseUrl}/${id}`)
}

export const putPerson = async (id, person) => {
    const res = await Axios.put(`${baseUrl}/${id}`, person)
    return res.data
}