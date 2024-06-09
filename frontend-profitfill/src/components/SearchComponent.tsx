import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Stack,
    TextField, Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {fetchJobById} from "../services/jobService";
import {Job} from "../models/job";
import {JobItem} from "./JobItem";
import {useSnackbar} from "../context/SnackbarContext";
import {useParams} from "react-router-dom";


const Search: React.FC = () => {

    const { jobId } = useParams();

    const [job, setJob] = useState<Job | null>(null);

    const {setSnackbar} = useSnackbar();

    useEffect(()=> {
        fetchJob(jobId);
    }, []);


    const fetchJob = async (id: string | undefined)=>  {
        if (!id) {
            setSnackbar(`wrong id! `, 'error');
            return;
        }
        try {
            const result = await fetchJobById(id);
            setJob(result);
            setSnackbar(`Success!`, 'success');
        }
        catch (e){
            setSnackbar(`Something went wrong!!`, 'error');
        }
    }


    return (
        <Stack direction={'row'}>
            <Box width={'20%'} maxWidth={200} minWidth={180}></Box>
            <Box
                width={'80%'}
                display="flex"
                flexGrow={6}
                justifyContent="center"
                alignItems="center"
                paddingY={5}
                paddingX={10}
            >
                <Stack width={"100%"}>
                    {!!job && <>
                        <Box marginTop={10} display={'flex'} justifyContent={'center'}>
                            <Typography variant={'h4'}> Result</Typography>
                        </Box>
                        <Box marginY={5} display={'flex'} justifyContent={'center'}>
                            <JobItem job={job} expanded={true}></JobItem>
                        </Box>
                    </>}
                </Stack>
            </Box>
        </Stack>
    );
}

export default Search;
