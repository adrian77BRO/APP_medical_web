import { api } from './baseEndpoint/endpoint';
import { getToken } from '../storage/token';
import { getDoctorId } from '../storage/user';

const API_URL = 'appoints';

export const getPendingAppointments = async () => {
    const token = getToken();
    const id = getDoctorId();
    const response = await api.get(`${API_URL}/pending/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return response;
};

export const confirmAppointment = async (id_appoint: number) => {
    const token = getToken();
    const response = await api.put(`${API_URL}/${id_appoint}`, {}, {
        headers: {
            Authorization: token
        }
    });
    return response;
};