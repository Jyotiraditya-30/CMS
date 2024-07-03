import React, { useState } from 'react';
import {
    IconButton, Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Modal,
    Backdrop,
    Fade,
    Box,
    CardContent,
    Typography,
    TextField,
    Menu,
    MenuItem,
} from '@mui/material';
import { Edit as EditIcon, MoreVert as MoreVertIcon, Delete as DeleteIcon } from '@mui/icons-material';

import axios from 'axios';

function EditContact({ contactId, contactData, fetchContacts }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editData, setEditData] = useState(contactData);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditContact = () => {
        setOpenEditModal(true);
        handleMenuClose();
    };

    const handleDeleteConfirmation = () => {
        setOpenConfirmation(true);
        handleMenuClose();
    };

    const handleEditModalClose = () => {
        setOpenEditModal(false);
    };

    const handleClose = () => {
        setOpenConfirmation(false);
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateContact = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token available');
                return;
            }
            await axios.put(`/api/contacts/${contactId}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchContacts();
            handleEditModalClose();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleDeleteContact = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token available');
                return;
            }
            await axios.delete(`/api/contacts/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchContacts();
            handleClose();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <>
            <IconButton aria-label="edit" onClick={handleMenuOpen} size="large">
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="edit-contact-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditContact}>
                    <EditIcon fontSize="small" />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteConfirmation}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
            <Modal
                open={openEditModal}
                onClose={handleEditModalClose}
                aria-labelledby="edit-contact-modal"
                aria-describedby="edit-contact-form"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditModal}>
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
                        <CardContent >
                            <Typography variant="h6" gutterBottom>Edit Contact</Typography>
                            <TextField name="firstname" label="First Name" fullWidth margin="normal" value={editData.firstname} onChange={handleChange} />
                            <TextField name="lastname" label="Last Name" fullWidth margin="normal" value={editData.lastname} onChange={handleChange} />
                            <TextField name="email" label="Email" fullWidth margin="normal" value={editData.email} onChange={handleChange} />
                            <TextField name="phone" label="Phone" fullWidth margin="normal" value={editData.phone} onChange={handleChange} />
                            <TextField name="address" label="Address" fullWidth margin="normal" value={editData.address} onChange={handleChange} />
                            <Button variant="contained" color="primary" onClick={handleUpdateContact} style={{ marginTop: '10px' }}>Update Contact</Button>
                        </CardContent>
                    </Box>
                </Fade>
            </Modal>
            <Dialog
                open={openConfirmation}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this contact permanently?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteContact} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditContact;
