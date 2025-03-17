import React from 'react';
import jobIcon from '../assets/medjob.jpg';
import { JobCard } from '../models/job';

export const CardJob: React.FC<JobCard> = ({
    title, description, cost
}) => {
    return (
        <div className='col-lg-3'>
            <div className='cards p-2 m-1'>
                <img src={jobIcon} className='job_card' alt='' />
                <h6 className='mt-2'>{title}</h6>
                <p className='mb-2'>{description}</p>
                <h6 className='mt-2'>{`Costo: $${cost}`}</h6>
            </div>
        </div>
    );
};