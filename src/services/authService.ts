import api from '@/lib/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/login', payload);

  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token); // simpan token untuk digunakan fetch data user
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // set global
  }

  return response.data;
};

export const logout = async () => {
  await api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export const getCurrentUser = async () => {
  return await api.get('/auth/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
