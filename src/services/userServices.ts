import api from '@/lib/api'

export const loginUser = async (credentials: {
  user_email: string
  password: string
}) => {
  const response = await api.post('/login', credentials)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const createUser = async (data: any) => {
  const response = await api.post('/users', data)
  return response.data
}

export const updateUser = async (id: number, data: any) => {
  const response = await api.put(`/users/${id}`, data)
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}
