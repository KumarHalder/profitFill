import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Stack,
    TextField,

} from '@mui/material';
import {deleteJobById} from "../services/jobService";
import {useSnackbar} from "../context/SnackbarContext";

interface DeleteJobFormValues {
    id: string;
}

const Delete: React.FC = () => {
    const { setSnackbar } = useSnackbar();

    const [formValues, setFormValues] = useState<DeleteJobFormValues>({ id: '' });
    const [formErrors, setFormErrors] = useState<{ id?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        setFormErrors({ ...formErrors, [id]: undefined }); // Clear error on change
    };

    const validateFields = () => {
        const errors: { id?: string } = {};
        if (!formValues.id) {
            errors.id = 'ID is required';
        } else if (isNaN(Number(formValues.id))) {
            errors.id = 'ID must be a number';
        }
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
                await deleteJobById(formValues.id);
                setSnackbar(`Job with id: ${formValues.id} deleted successfully!`, 'success');
            }
            catch (e) {
                setSnackbar(`Job Deletion Task Failed!`, 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Stack direction={'row'}>
            <Box width={'20%'} maxWidth={200} minWidth={180}></Box>
            <Box
                width={'80%'}
                display="flex"
                flexGrow={6}
                justifyContent="center"
                alignItems="center"
                paddingY={15}
                paddingX={10}
            >
                <Stack width={"100%"}>
                    <FormControl component="form" fullWidth={true} onSubmit={handleSubmit}>
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
                            </Stack>
                            <Box width={'100%'}>
                                <Button type='submit' fullWidth={true} size="large" variant="contained" >
                                    {loading ? <CircularProgress color={"inherit"} size={26}/> : <>Delete Job</>}
                                </Button>
                            </Box>
                        </Stack>
                    </FormControl>
                </Stack>
            </Box>

        </Stack>
    );
}

export default Delete;
