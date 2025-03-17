import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardJob } from './CardJob';
import { FormJob } from './FormJob';
import { Job } from '../models/job';

export const ListJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        getAllJobs()
    }, []);

    const getAllJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('id_doctor');
            const response = await axios.get(`http://localhost:4000/jobs/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    }

    return (
        <>
            {jobs.length === 0 ? <h3 className='p-3 text-center border border-black rounded-3'>
                No ha registrado ningún servicio</h3> :
                <div className='container p-3'>
                    <div className='row gy-3 row-cols-2'>
                        {jobs.map(job => (
                            <CardJob
                                key={job.id_job}
                                title={job.title}
                                description={job.description}
                                cost={job.cost}
                            />
                        ))}
                    </div>
                </div>}
            <button type='submit' className='btn btn-success ms-5' onClick={openModal}>
                Agregar servicio médico</button>
            <FormJob
                show={showModal}
                close={closeModal}
            />
        </>
    );
};