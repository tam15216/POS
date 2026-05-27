import api from '../../../shared/api/axios';

export const loginApi = async (data) => {
    return await api.post('/auth/login', data);
};

export const getMeApi = () => {
  return api.get('/auth/me');
};

