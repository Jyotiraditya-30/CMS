import bcrypt from 'bcryptjs';

import User from '../models/UserModel.js';

const UserController = {
    async UserProfile(req, res) {
        try {
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },

    async updateUser(req, res) {
        const { username, password, phone } = req.body;
        try {
            let user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            if (username) {
                if (username.length > 20) {
                    return res.status(400).json({ username: 'Username must be less than 20 characters' });
                }
                user.username = username;
            }

            if (password) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(password)) {
                    return res.status(400).json({
                        password: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
                    });
                }
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            if (phone) {
                user.phone = phone;
            }

            await user.save();
            res.json({ msg: 'User updated successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },

    async deleteUser(req, res) {
        try {

            await User.findByIdAndDelete(req.user.id);
            res.json({ msg: 'User Deleted Successfully' });

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
        }
    },


};

export default UserController;