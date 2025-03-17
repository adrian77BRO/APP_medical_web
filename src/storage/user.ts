export const getDoctorId = (): string | null => {
    return localStorage.getItem('id_doctor');
};

export const setDoctorId = (id: string) => {
    localStorage.setItem('id_doctor', id);
};

export const getUsername = (): string | null => {
    return localStorage.getItem('user');
};

export const setUsername = (name: string) => {
    localStorage.setItem('user', name);
};