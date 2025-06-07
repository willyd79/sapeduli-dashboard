import api from './axiosInstance';
import { User } from '@/types/User';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data || [];
};

export const createUser = async (user: Partial<User>) => {
  return await api.post('/users', user);
};

export const updateUser = async (id: number, user: Partial<User>) => {
  return await api.put(`/users/${id}`, user);
};

export const deleteUserById = async (id: number) => {
  return await api.delete(`/users/${id}`);
};
