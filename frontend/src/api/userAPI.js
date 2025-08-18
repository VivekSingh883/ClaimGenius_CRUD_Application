import axios from 'axios';
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/api/users`,
});
export const getUsers = async () => (await API.get('/')).data;
export const createUser = async (data) => (await API.post('/', data)).data;
export const updateUser = async (id, data) => (await API.put(`/${id}`, data)).data;
export const deleteUser = async (id) => API.delete(`/${id}`);
