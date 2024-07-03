import React, { useEffect, useState } from 'react';
import { Typography, Card, Box, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import axios from 'axios';

import NavBar from '../components/Navbar';
import SideBar from '../components/Sidenav';

function DeleteAccount({ userId, onDelete }) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }
            await axios.delete(`/api/Admin/userDelete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onDelete(userId); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return <Button onClick={handleDelete}>Delete</Button>;
}

function Admin() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }
            const response = await axios.get('/api/Admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data)
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
        ((user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (String(user.phone).toLowerCase().includes(searchQuery.toLowerCase())))
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleDelete = (userId) => {
        setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
    };

    return (
        <>
            <NavBar onSearch={handleSearch} />
            <Box height={60} />
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        height: '90vh',
                        overflowY: 'auto'
                    }}
                >
                    <Typography variant="h5" >User list ({filteredUsers.length})</Typography>
                    <Card
                        sx={{
                            backgroundColor: "rgb(248, 248, 255)",
                            minWidth: 250,
                            borderRadius: 5,
                            overflowY: 'auto',
                            height: '75vh',
                            margin: '0px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent sx={{ margin: '0px', padding: 0 }}>
                            <TableContainer sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Username</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Email Id</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Phone Number</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredUsers.map(user => (
                                            <TableRow key={user._id}>
                                                <TableCell>{user.username}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phone}</TableCell>
                                                <TableCell><DeleteAccount userId={user._id} onDelete={handleDelete} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    );
}

export default Admin;
