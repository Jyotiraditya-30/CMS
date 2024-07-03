import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Menu, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';


import NavBar from '../components/Navbar';
import SideBar from '../components/Sidenav';
import AddContact from '../components/Contacts/AddContact';
import EditContact from '../components/Contacts/EditContact';
import ExportContactsCSV from '../components/Export and Import/ExportToCSV';
import ImportContactsCSV from '../components/Export and Import/ImportFromCSV';
import axios from 'axios';

function Directory() {
    const [contacts, setContacts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token available");
                return;
            }
            const response = await axios.get('/api/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContacts(response.data);
            setFilteredContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        const filtered = contacts.filter(contact =>
        (contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(contact.phone).toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.address.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredContacts(filtered);
    }, [searchQuery, contacts]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddContact = () => {
        setOpenModal(true);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleImportContacts = (importedContacts) => {
        if (importedContacts && importedContacts.length > 0) {
            const updatedContacts = [...contacts, ...importedContacts];
            setContacts(updatedContacts);
            setFilteredContacts(updatedContacts);
            handleMenuClose();
        }
    };
    return (
        <>
            <NavBar onSearch={handleSearch} />

            <Box height={50} />
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
                    <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px' }}>
                            <Box>
                                <IconButton onClick={handleAddContact} aria-label="add contact" color="black">
                                    <AddIcon fontSize="large" />
                                    <Typography variant="body1" component="span" marginLeft={1}>
                                        Add
                                    </Typography>
                                </IconButton>
                            </Box>
                            <Box>
                                <Typography variant="h5" component="div" margin={1}>
                                    DIRECTORY ({filteredContacts.length})
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={handleMenuOpen} aria-label="menu" color="black">
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="directory-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <ImportContactsCSV onImport={handleImportContacts} />
                                    <ExportContactsCSV contacts={contacts} />
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            backgroundColor: "rgb(248, 248, 255)",
                            minWidth: 250,
                            borderRadius: 5,
                            overflow: 'hidden',
                            height: '74vh',
                            margin: '0px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent sx={{ margin: '0px', padding: 0 }}>
                            <TableContainer sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white', width: '20%' }}>Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white', width: '20%' }}>Email Id</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white', width: '15%' }}>Phone Number</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white', width: '30%' }}>Address</TableCell>
                                            <TableCell sx={{ backgroundColor: 'black', color: 'white', width: '15%' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredContacts.map(contact => (
                                            <TableRow key={contact._id}>
                                                <TableCell style={{ width: '20%' }}>{contact.firstname} {contact.lastname}</TableCell>
                                                <TableCell style={{ width: '20%' }}>{contact.email}</TableCell>
                                                <TableCell style={{ width: '20%' }}>{contact.phone}</TableCell>
                                                <TableCell style={{ width: '20%' }}>{contact.address}</TableCell>
                                                <TableCell style={{ width: '20%' }}>
                                                    <EditContact key={`edit_${contact._id}`} contactId={contact._id} contactData={contact} fetchContacts={fetchContacts} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                </Box>
            </Box>
            <AddContact open={openModal} onClose={() => setOpenModal(false)} fetchContacts={fetchContacts} />
        </>
    );
}

export default Directory;

