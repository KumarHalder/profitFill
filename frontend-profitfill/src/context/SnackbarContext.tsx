// SnackbarContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import SnackbarComponent from "../components/SnackBarComponent";

type SnackbarContextType = {
    setSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const setSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ setSnackbar }}>
            {children}
            <SnackbarComponent
                open={open}
                handleClose={handleClose}
                message={message}
                severity={severity}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
