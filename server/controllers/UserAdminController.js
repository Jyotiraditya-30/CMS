import User from '../models/UserModel.js';

const UserAdminController = {
    
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },

    async deleteUser(req, res){
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.remove();
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');            
        }
    }

};

export default UserAdminController;
