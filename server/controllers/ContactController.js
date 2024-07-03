import csv from 'csv-parser';
import fs from 'fs';

import User from '../models/UserModel.js';

const ContactController = {
  // Create a new contact for the authenticated user
  async createContact(req, res) {
    try {
      const { phone, address, email, firstname, lastname } = req.body;

      // Validation checks
      if (phone.length > 10) {
        return res.status(400).json({ message: 'Phone number must not exceed 10 digits' });
      }
      if (address.length > 25) {
        return res.status(400).json({ message: 'Address must not exceed 25 characters' });
      }
      if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
        return res.status(400).json({ message: 'Name must contain only alphabetic characters' });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.contacts.push(req.body);
      await user.save();
      res.status(201).json(user.contacts[user.contacts.length - 1]);
    } catch (error) {
      res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
  },

  // Get all contacts for the authenticated user
  async getAllContacts(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
  },

  // Get a single contact by ID for the authenticated user
  async getContactById(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const contact = user.contacts.id(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    }
  },

  // Update a contact by ID for the authenticated user
  async updateContact(req, res) {
    try {
      const { phone, address, email, firstname, lastname } = req.body;
      const { id } = req.params;

      // Validation checks
      if (phone && phone.length > 10) {
        return res.status(400).json({ message: 'Phone number must not exceed 10 digits' });
      }
      if (address && address.length > 25) {
        return res.status(400).json({ message: 'Address must not exceed 25 characters' });
      }
      if (email && (!email.includes('@') || !email.includes('.'))) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (firstname && !/^[a-zA-Z]+$/.test(firstname)) {
        return res.status(400).json({ message: 'First name must contain only alphabetic characters' });
      }
      if (lastname && !/^[a-zA-Z]+$/.test(lastname)) {
        return res.status(400).json({ message: 'Last name must contain only alphabetic characters' });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const contact = user.contacts.id(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      // Update contact fields if they exist in the request
      if (phone) contact.phone = phone;
      if (address) contact.address = address;
      if (email) contact.email = email;
      if (firstname) contact.firstname = firstname;
      if (lastname) contact.lastname = lastname;

      await user.save();
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
  },

  // Delete a contact by ID for the authenticated user
  async deleteContact(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const contact = user.contacts.id(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      contact.remove();
      await user.save();
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
  },

  // Import contacts from CSV file for the authenticated user
  async importContactsFromCSV(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const results = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', data => results.push(data))
        .on('end', async () => {
          for (const contactData of results) {
            user.contacts.push(contactData);
          }

          await user.save();

          fs.unlinkSync(req.file.path);

          res.status(200).json({ message: 'Contacts imported successfully', contact: results });

        });
    } catch (error) {
      console.error('Error importing contacts:', error);
      res.status(500).json({ message: 'Error importing contacts from CSV', error: error.message });
    }
  }

}

export default ContactController;
