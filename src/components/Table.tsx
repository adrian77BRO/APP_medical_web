import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Appointment } from '../models/appointment';

export const Table: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id_doctor');

    useEffect(() => {
        getPendingAppointments()
    }, []);

    const getPendingAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/appoints/pending/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            setAppointments(response.data.appointments);
        } catch (error) {
            console.error('Error al obtener las citas:', error);
        }
    }

    const confirmAppointment = async (id_appoint: number) => {
        try {
            const result = await Swal.fire({
                title: '¿Confirmar cita del paciente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, confirmar'
            });

            if (result.isConfirmed) {
                const response = await axios.put(`http://localhost:4000/appoints/${id_appoint}`, {}, {
                    headers: {
                        'Authorization': token
                    }
                });
                Swal.fire({
                    title: 'Cita confirmada',
                    text: response.data.message,
                    icon: 'success'
                });
                getPendingAppointments();
            }
        } catch (error) {
            console.error('Error al confirmar la cita:', error);
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className='container mt-4'>
            <div className='table-responsive rounded-3'
                style={{ overflowY: 'scroll', backgroundColor: '#00ffa6', padding: '15px' }}
            >
                <table className='table table-success text-center mb-0'>
                    <thead>
                        <tr>
                            <th scope='col'>Fecha programada</th>
                            <th scope='col'>Observaciones</th>
                            <th scope='col'>Estatus</th>
                            <th scope='col'>Servicio</th>
                            <th scope='col'>Confirmar cita</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{formatDate(appointment.date_appoint)}</td>
                                    <td>{appointment.observations}</td>
                                    <td className='text-warning'>
                                        <strong>Pendiente</strong>
                                    </td>
                                    <td>{appointment.title}</td>
                                    <td>
                                        <button type='submit' className='btn btn-primary m-2'
                                            onClick={() => confirmAppointment(appointment.id_appoint)}>Confirmar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className='text-center text-muted py-3'>
                                    <strong>No hay citas pendientes</strong>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};