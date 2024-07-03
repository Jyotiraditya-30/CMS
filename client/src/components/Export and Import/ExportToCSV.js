import React from 'react';
import { MenuItem } from '@mui/material';

const ExportContactsCSV = ({ contacts }) => {
    const exportCSV = () => {
        const headers = Object.keys(contacts[0]).filter(key => key !== '_id').join(',');

        const csvContent = "data:text/csv;charset=utf-8," + headers + '\n' +
            contacts.map(contact => {
                const contactData = Object.keys(contact)
                    .filter(key => key !== '_id')
                    .map(key => contact[key] || '')
                    .join(',');
                return contactData;
            }).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "contacts.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <MenuItem onClick={exportCSV}>Export</MenuItem>
    );
};

export default ExportContactsCSV;
