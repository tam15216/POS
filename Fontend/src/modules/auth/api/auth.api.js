import api from '../../../shared/api/axios';

export const loginApi = async (data) => {
    return await api.post('/auth/login', data);
};

export const registerApi = async (data) => {
    return await api.post('/auth/register', data);
}