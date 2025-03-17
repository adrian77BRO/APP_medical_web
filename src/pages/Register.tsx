import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Signup } from '../models/user';

export const Register: React.FC = () => {
    const [user, setUser] = useState<Signup>({
        fname: '', lname: '', email: '', password: ''
    });
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setMessage('');
    };

    const register = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (user.fname === '' || user.lname === '' || user.email === '' || user.password === '') {
                setMessage('Todos los campos son requeridos');
                return;
            }
            const response = await axios.post('http://localhost:4000/doctors/register', user);
            Swal.fire({
                title: '¡Bienvenido!',
                text: response.data.message,
                icon: 'success'
            });
            setMessage('');
        } catch (error: any) {
            console.error('Error al registrarse:', error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className='fondo'>
            <form onSubmit={register} className='p-5 rounded-4 login'>
                <h3 className='text-center mb-4'>Regístrate aquí</h3>
                <div className='mb-2'>
                    <label htmlFor='username' className='form-label'>Nombre</label>
                    <input type='text' name='username' value={user.fname} onChange={handleChange}
                        className='form-control' id='username' placeholder='Ingrese un nombre' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='username' className='form-label'>Apellidos</label>
                    <input type='text' name='username' value={user.lname} onChange={handleChange}
                        className='form-control' id='username' placeholder='Ingrese un nombre' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' className='form-label'>Correo electrónico</label>
                    <input type='email' name='email' value={user.email} onChange={handleChange}
                        className='form-control' id='email' placeholder='Ingrese un correo eléctronico' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input type='password' name='password' value={user.password} onChange={handleChange}
                        className='form-control' id='password' placeholder='Mínimo 6 caracteres' />
                </div>
                <button type='submit' className='rounded border-0 p-2 w-100 mt-3 boton'>Registrar</button>
                <Link to='/' className='btn btn-link text-dark w-100 mt-2'>¿Ya tienes cuenta? Inicia sesión</Link>
                {message && <p className='text-danger text-center mt-2'>{message}</p>}
            </form>
        </div>
    );
};