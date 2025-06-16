// src/services/rewardServices.ts
import api from '@/lib/api' // bukan './axiosInstance'

export const getRewards = async () => {
  const response = await api.get('/rewards')
  return response.data
}

export const getRewardById = async (id: number) => {
  const response = await api.get(`/rewards/${id}`)
  return response.data
}

export const createReward = async (data: any) => {
  const response = await api.post('/rewards', data)
  return response.data
}

export const updateReward = async (id: number, data: any) => {
  const response = await api.put(`/rewards/${id}`, data)
  return response.data
}

export const deleteReward = async (id: number) => {
  const response = await api.delete(`/rewards/${id}`)
  return response.data
}
