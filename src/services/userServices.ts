import api from '@/lib/api'

export interface User {
  id: number
  user_name: string
  user_email: string
  user_status: boolean
  // tambahkan properti lain sesuai struktur API kamu
}

export interface CreateUserPayload {
  user_name: string
  user_email: string
  user_password: string
  user_status?: boolean
}

export interface UpdateUserPayload {
  user_name?: string
  user_email?: string
  user_password?: string
  user_status?: boolean
}

export const loginUser = async (credentials: {
  user_email: string
  user_password: string
}) => {
  const response = await api.post('/signin', credentials)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data; // hanya ambil array user-nya
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post('/users', data)
  return response.data
}

export const updateUser = async (
  id: number,
  data: UpdateUserPayload
): Promise<User> => {
  const response = await api.put(`/users/${id}`, data)
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}

export const logoutUser = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}
