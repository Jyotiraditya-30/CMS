import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteAccount = ({ userId }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }

            await axios.delete(`/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            window.location.href = '/';
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>Delete Account</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete your account permanently?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteAccount;
