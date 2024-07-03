import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const UpdateAccount = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token available");
                    return;
                }    
                const response = await axios.get(`/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); 
                setUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setPhone(response.data.phone || '');
            } catch (error) {
                console.error('Error fetching user:', error);
               
            }
        };
    
        fetchUser();
    }, [userId]);
    

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }

            await axios.put(`/api/user/profile`, {
                username,
                email,
                password,
                phone 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            window.location.href = '/UserProfile';
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>My Profile</h1>
            <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone || 'N/A'}</p> 
            </div>
            <div>
                <TextField
                    label="New Username"
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <Button onClick={() => handleUpdate()}>Update Password</Button> */}
            </div>
            <div>
                <TextField
                    label="New Phone"
                    placeholder="Enter new phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {/* <Button onClick={() => handleUpdate()}>Update Phone</Button> */}
            </div>
            <Button onClick={handleUpdate}>Update All</Button>
        </>
    );
};

export default UpdateAccount;

