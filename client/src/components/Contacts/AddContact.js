import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Box, CardContent, Typography, TextField, Button } from '@mui/material';

import axios from 'axios';

function AddContact({ open, onClose, fetchContacts }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleAddContact = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }
            const response = await axios.post('/api/contacts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            fetchContacts();
            onClose();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-contact-modal"
            aria-describedby="add-contact-form"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '350px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        textAlign: 'center', 
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Add Contact</Typography>
                        <TextField name="firstname" label="First Name" fullWidth margin="normal" value={formData.firstname} onChange={handleChange} />
                        <TextField name="lastname" label="Last Name" fullWidth margin="normal" value={formData.lastname} onChange={handleChange} />
                        <TextField name="email" label="Email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
                        <TextField name="phone" label="Phone" fullWidth margin="normal" value={formData.phone} onChange={handleChange} />
                        <TextField name="address" label="Address" fullWidth margin="normal" value={formData.address} onChange={handleChange} />
                        <Button variant="contained" color="primary" onClick={handleAddContact} style={{ marginTop: '10px' }}>Add Contact</Button>
                    </CardContent>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddContact;
