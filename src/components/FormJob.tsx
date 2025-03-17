import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { JobReq } from '../models/job';
import { ModalProps } from '../models/modal';
import { createJob } from '../endpoints/jobEndpoints';

export const FormJob: React.FC<ModalProps> = ({ show, close, onJobCreated }) => {
    const [job, setJob] = useState<JobReq>({
        title: '', description: '', cost: 0
    });
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setJob({ ...job, [name]: value });
        setMessage('');
    };

    const saveJob = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (job.title === '' || job.description === '' || job.cost.toString() === '') {
                setMessage('Todos los campos son requeridos');
                return;
            }
            if (job.cost < 0) {
                setMessage('Formato inválido');
                return;
            }
            const response = await createJob(job.title, job.description, job.cost)
            Swal.fire({
                title: 'Nuevo servicio médico agregado',
                text: response.data.message,
                icon: 'success'
            });
            setMessage('');
            onJobCreated();
            close();
        } catch (error: any) {
            console.error('Error al agregar el servicio:', error);
            setMessage(error.response.data.message);
        }
    }

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='p-3'>
                    <label htmlFor='title' className='form-label'>Nombre</label>
                    <input className='form-control' id='title'
                        type='text' name='title' value={job.title} onChange={handleChange} />
                </div>
                <div className='p-3'>
                    <label htmlFor='description' className='form-label'>Descripción</label>
                    <input className='form-control' id='description'
                        type='text' name='description' value={job.description} onChange={handleChange} />
                </div>
                <div className='p-3'>
                    <label htmlFor='cost' className='form-label'>Costo</label>
                    <input className='form-control' id='cost'
                        type='number' name='cost' value={job.cost} onChange={handleChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex justify-content-around'>
                    {message !== '' && <div className='text-danger text-center m-2 p-2' role='alert'>{message}</div>}
                    <button className='btn btn-success border-0 rounded-3 m-2 p-2' type='submit'
                        onClick={saveJob}>Guardar</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};