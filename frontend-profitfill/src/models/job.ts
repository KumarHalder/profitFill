export type Job = {
    id: number;
    customerName: string;
    jobType: string;
    status: string;
    appointmentDate: string;
    technician: string;
};

export interface JobFormState {
    id: string;
    customerName: string;
    jobType: string;
    status: string;
    appointmentDate: string;
    technician: string;
}

export interface JobFormErrors {
    id?: string;
    customerName?: string;
    jobType?: string;
    status?: string;
    appointmentDate?: string;
    technician?: string;
}

