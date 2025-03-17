import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoutes() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/' replace />
    }

    return <Outlet />;
}