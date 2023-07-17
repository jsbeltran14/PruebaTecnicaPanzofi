import axios from 'axios'
export const getAllUsers = ()=>{
    return axios.get('http://localhost:8000/users/api/v1/users/');
}
export const getUser = (id) => axios.get(`http://localhost:8000/users/api/v1/users/${id}`)
export const updateUser = (id, user) => axios.put(`http://localhost:8000/users/api/v1/users/${id}/`,user)