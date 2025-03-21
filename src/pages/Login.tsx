import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoginReq } from '../models/user';
import { setToken } from '../storage/token';
import { setDoctorId, setUsername } from '../storage/user';
import { loginUser } from '../endpoints/userEndpoints';

const Login: React.FC = () => {
    const [user, setUser] = useState<LoginReq>({
        email: '', password: ''
    });
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setMessage('');
    };

    const login = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (user.email === '' || user.password === '') {
                setMessage('Todos los campos son requeridos');
                return;
            }
            const response = await loginUser(user.email, user.password);
            Swal.fire({
                title: '¡Bienvenido!',
                text: response.data.message,
                icon: 'success'
            });
            const name = response.data.user.fname + ' ' + response.data.user.lname;

            setToken(response.data.token);
            setDoctorId(response.data.user.id_doctor);
            setUsername(name);

            navigate('/home');
            setMessage('');
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className='fondo'>
            <form onSubmit={login} className='p-5 rounded-4 login'>
                <h3 className='text-center mb-5'>Iniciar sesión</h3>
                <div className='mb-2'>
                    <label htmlFor='email' className='form-label'>Correo electrónico</label>
                    <input type='email' name='email' value={user.email} onChange={handleChange}
                        className='form-control' id='email' placeholder='Ingrese su correo electrónico' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input type='password' name='password' value={user.password} onChange={handleChange}
                        className='form-control' id='password' placeholder='Ingrese su contraseña' />
                </div>
                <button type='submit' className='rounded border-0 p-2 w-100 mt-3 boton'>Ingresar</button>
                <Link to='/register' className='btn btn-link text-dark w-100 mt-2'>¿No tienes cuenta? Regístrate aquí</Link>
                {message && <p className='text-danger text-center mt-2'>{message}</p>}
            </form>
        </div>
    );
};

export default Login;