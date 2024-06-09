import {Job} from "../models/job";
import {Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

interface JobItemProps {
    job: Job;
    expanded?: boolean;
}

export const JobItem: React.FC<JobItemProps> = ({ job, expanded = false }) => {

    return <Accordion key={job.id} defaultExpanded={expanded}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}

        >
            <Typography fontWeight={"bold"}>ID: {job.id}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Stack spacing={2}>
                <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Customer Name :  <Typography sx={{ marginLeft: 2 }}>{job.customerName}</Typography></Box>
                <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Job Type :  <Typography sx={{ marginLeft: 2 }}>{job.jobType}</Typography></Box>
                <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Status :  <Typography sx={{ marginLeft: 2 }}>{job.status}</Typography></Box>
                <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Appointment Date :  <Typography sx={{ marginLeft: 2 }}>{new Date(job.appointmentDate).toLocaleString()}</Typography></Box>
                <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Technician :  <Typography sx={{ marginLeft: 2 }}>{job.technician}</Typography></Box>
            </Stack>
        </AccordionDetails>
    </Accordion>;
}
