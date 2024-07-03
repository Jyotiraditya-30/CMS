import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: String,
    phone: {
        type: Number,
        required: true,
    },
    address: String,
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    phone: {
        type: Number,
        default: null
    },
    role: {
        type: Number,
        enum: [0, 1], 
        default: 0 // (0 -> User, 1 -> Admin)
    },
    contacts: [contactSchema]
}, { timestamps: true });

const User = model('User', userSchema);
export default User;
