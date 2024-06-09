import React, {useEffect, useState} from "react";
import {Job} from "../models/job";
import {fetchJobs} from "../services/jobService";
import {
    Box, Paper,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";

import {useSnackbar} from "../context/SnackbarContext";
import {useNavigate} from "react-router-dom";


function Home() {
    const {setSnackbar} = useSnackbar();
    const [jobs, setJobs] = useState<Job[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        handleRequest();
    }, []);


    const handleRequest = async () => {
        try {
            // Replace with your actual backend request
            const response = await fetchJobs();
            setJobs(response);
            setSnackbar('Search was successful!', 'success');

        } catch (error) {
            setSnackbar('Search failed!', 'error');
        }
    }

    return (
        <>
            <Stack direction={'row'}>
                <Box width={'20%'} maxWidth={200} minWidth={180}></Box>
                <Box width={'80%'} display='flex' flexGrow={6} justifyContent="center"
                     alignItems="center" paddingY={5} paddingX={15}>
                    <Stack width={'100%'}>
                    <Box marginTop={10} marginBottom={5} display={'flex'} justifyContent={'center'}>
                        {jobs.length > 0 ? <Typography variant={'h4'}> Result</Typography>: <Typography variant={'body1'}> Nothing to show!</Typography>}
                    </Box>
                        {jobs.length > 0 ?    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{backgroundColor: 'lightblue'}}>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell >Customer Name</TableCell>
                                        <TableCell >Status</TableCell>
                                        <TableCell >Appointment Date</TableCell>
                                        <TableCell >Technician</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs.map((job, index) => (
                                        <TableRow
                                            onClick={() => {
                                                navigate(`/job/${job.id}`);
                                            }}
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {job.id}
                                            </TableCell>
                                            <TableCell >{job.customerName}</TableCell>
                                            <TableCell >{job.status}</TableCell>
                                            <TableCell >{new Date(job.appointmentDate).toLocaleString()}</TableCell>
                                            <TableCell >{job.technician}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                    </Stack>
                </Box>
            </Stack>

        </>
    );
}

export default Home;
