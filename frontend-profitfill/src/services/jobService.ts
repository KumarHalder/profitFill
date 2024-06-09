import axios from "axios";
import {Job, JobFormState} from "../models/job";

// Define the base URL for your API
export const BASE_URL = "http://localhost:5236";
export const BASE_URL_API = BASE_URL + "/api";

// Define the function to fetch data
export const fetchJobs = async (): Promise<Job[]> => {
    const url = `${BASE_URL_API}/jobs`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchJobById = async (
    id: string
): Promise<Job> => {
    const url = `${BASE_URL_API}/jobs/${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};


export const createJob = async (data: JobFormState) => {
    try {
        const newData = {
            ...data,
            appointmentDate: new Date(data.appointmentDate).toISOString().split('.')[0] + 'Z'
        };
        const response = await axios.post(`${BASE_URL_API}/jobs`, newData);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

export const updateJob = async (data: JobFormState) => {
    try {
        const newData = {
            ...data,
            appointmentDate: new Date(data.appointmentDate).toISOString().split('.')[0] + 'Z'
        };
        const response = await axios.put(`${BASE_URL_API}/jobs/${data.id}`, newData);
        return response.data;
    } catch (error) {
        console.error('Error Updating job:', error);
        throw error;
    }
};


export const deleteJobById = async (id: string) => {
    const response = await axios.delete(`${BASE_URL_API}/jobs/${id}`);
    return response.data;
};

