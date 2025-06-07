import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API}/login`, { email, password })
  return res.data
}

export const getUser = async () => {
  const res = await axios.get(`${API}/me`)
  return res.data
}
