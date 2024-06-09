import {Box, Button, CircularProgress, FormControl, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import {createJob} from "../services/jobService";
import {JobFormErrors, JobFormState} from "../models/job";
import {useSnackbar} from "../context/SnackbarContext";


const Create: React.FC = () => {
    const { setSnackbar } = useSnackbar();

    const [formValues, setFormValues] = useState<JobFormState>({
        id: '',
        customerName: '',
        jobType: '',
        status: '',
        appointmentDate: '',
        technician: '',
    });

    const [formErrors, setFormErrors] = useState<JobFormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        setFormErrors({ ...formErrors, [id]: undefined }); // Clear error on change
    };

    const validateFields = () => {
        const errors: JobFormErrors = {};
        if (!formValues.id || isNaN(parseInt(formValues.id))) errors.id = 'Valid ID is required';
        if (!formValues.customerName) errors.customerName = 'Customer Name is required';
        if (!formValues.jobType) errors.jobType = 'Job Type is required';
        if (!formValues.status) errors.status = 'Status is required';
        if (!formValues.appointmentDate) errors.appointmentDate = 'Appointment Date is required';
        if (!formValues.technician) errors.technician = 'Technician is required';
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {

            setLoading(true);
            try {
                const item = await createJob(formValues);
                setSnackbar(`Job with id: ${item.id} created successfully!`, 'success');
            }
            catch (e) {
                setSnackbar(`Job creation Task failed!`, 'error');
            }
            finally {
                setLoading(false);
            }
        }
    };


    return (

        <Stack direction={'row'}>
            <Box width={'20%'} maxWidth={200} minWidth={180}></Box>
            <Box width={'80%'} display='flex' flexGrow={6} justifyContent="center"
                 alignItems="center"  paddingY={15} paddingX={10}>

                <FormControl fullWidth={true} component="form" onSubmit={e => {
                    handleSubmit(e)
                }}>
                    <Stack spacing={8}>
                        <Stack spacing={2}>

                            <TextField

                                id="id"
                                label="ID"
                                variant="outlined"
                                value={formValues.id}
                                onChange={handleInputChange}
                                error={!!formErrors.id}
                                helperText={formErrors.id}
                            />
                            <TextField
                                id="customerName"
                                label="Customer Name"
                                variant="outlined"
                                value={formValues.customerName}
                                onChange={handleInputChange}
                                error={!!formErrors.customerName}
                                helperText={formErrors.customerName}
                            />
                            <TextField
                                id="jobType"
                                label="Job Type"
                                variant="outlined"
                                value={formValues.jobType}
                                onChange={handleInputChange}
                                error={!!formErrors.jobType}
                                helperText={formErrors.jobType}
                            />
                            <TextField
                                id="status"
                                label="Status"
                                variant="outlined"
                                value={formValues.status}
                                onChange={handleInputChange}
                                error={!!formErrors.status}
                                helperText={formErrors.status}
                            />
                            <TextField
                                id="appointmentDate"
                                label="Appointment Date"
                                variant="outlined"
                                value={formValues.appointmentDate}
                                onChange={handleInputChange}
                                error={!!formErrors.appointmentDate}
                                helperText={formErrors.appointmentDate}
                                inputProps={{
                                    "step": 1,
                                }}
                                InputLabelProps={{ shrink: true }}
                                type="datetime-local"
                            />
                            <TextField
                                id="technician"
                                label="Technician"
                                variant="outlined"
                                value={formValues.technician}
                                onChange={handleInputChange}
                                error={!!formErrors.technician}
                                helperText={formErrors.technician}

                            />

                        </Stack>
                        <Box width={'100%'}>
                            <Button type='submit' fullWidth={true} size="large" variant="contained">
                                {loading ? <CircularProgress color={"inherit"} size={26}/> : <> Create Job</>}
                            </Button>
                        </Box>
                    </Stack>
                </FormControl>

            </Box>

        </Stack>

    );
}

export default Create;
