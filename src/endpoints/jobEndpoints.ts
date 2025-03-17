import { api } from './baseEndpoint/endpoint';
import { getToken } from '../storage/token';
import { getDoctorId } from '../storage/user';

const API_URL = 'jobs';

export const getAllJobs = async () => {
    const token = getToken();
    const id = getDoctorId();
    const response = await api.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return response;
};

export const createJob = async (title: string, description: string, cost: number) => {
    const token = getToken();
    const id = getDoctorId();
    const response = await api.post(`${API_URL}/${id}`, {
        title,
        description,
        cost
    }, {
        headers: {
            Authorization: token
        }
    });
    return response;
};