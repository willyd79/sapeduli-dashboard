import api from './axiosInstance';
import { Reward } from '@/types/Reward';

export const getRewards = async (): Promise<Reward[]> => {
  const response = await api.get('/rewards');
  return response.data.data || [];
};

export const createReward = async (reward: Partial<Reward>) => {
  return await api.post('/rewards', reward);
};

export const updateReward = async (id: number, reward: Partial<Reward>) => {
  return await api.put(`/rewards/${id}`, reward);
};

export const deleteRewardById = async (id: number) => {
  return await api.delete(`/rewards/${id}`);
};
