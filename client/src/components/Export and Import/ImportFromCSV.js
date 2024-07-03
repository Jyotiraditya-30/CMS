import React, { useState } from 'react';
import { MenuItem, Snackbar } from '@mui/material';

import axios from 'axios';

const ImportContactsCSV = ({ onImport }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append('csvFile', file); // Ensure that the file field name matches the backend's expectation
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }
            const response = await axios.post('/api/contacts/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.data && response.data.message === 'Contacts imported successfully') {
                setSnackbarOpen(true); 
                onImport(response.data.contact); // Ensure that imported contacts data is passed back to the parent component
            } else {
                console.error('Error importing contacts: Unexpected response');
            }
        } catch (error) {
            console.error('Error importing contacts:', error);
        }
    };
    

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <MenuItem>
                <label htmlFor="csv-file-input">
                    Import CSV
                    <input
                        id="csv-file-input"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            </MenuItem>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} 
                onClose={handleSnackbarClose}
                message="Contacts imported successfully"
            />
        </>
    );
};

export default ImportContactsCSV;
