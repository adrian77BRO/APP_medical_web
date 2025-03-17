import { api } from './baseEndpoint/endpoint';

const API_URL = 'doctors';

export const loginUser = async (email: string, password: string) => {
    const response = await api.post(`${API_URL}/login`, {
        email,
        password
    });
    return response;
};

export const registerUser = async (
    fname: string,
    lname: string,
    email: string,
    password: string
) => {
    const response = await api.post(`${API_URL}/register`, {
        fname,
        lname,
        email,
        password
    });
    return response;
};