export interface Job  {
    id_job: number;
    title: string;
    description: string;
    cost: number;
    id_doctor: number;
}

export interface JobReq  {
    title: string;
    description: string;
    cost: number;
}

export interface JobCard  {
    title: string;
    description: string;
    cost: number;
}