import axios from 'axios';

export interface User {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string;
  mobile: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

const API = axios.create({
  baseURL: `${(import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:4000'}/api/users`,
});

export const getUsers = async (
  page = 1,
  limit = 10,
  search = '',
  sortBy = '',
  sortOrder = 'asc'
) =>
  (await API.get('/', { params: { page, limit, search, sortBy, sortOrder } })).data;
export const createUser = async (data: User) => (await API.post('/', data)).data;
export const updateUser = async (id: number, data: User) => (await API.put(`/${id}`, data)).data;
export const deleteUser = async (id: number) => API.delete(`/${id}`);



