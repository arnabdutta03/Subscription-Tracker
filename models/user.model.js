import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'User name is required'],
        trim: true,
        minLength: 5,
        maxLength: 30,
    },
    email: {
        type: String, 
        require: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match:[/\S+@\S+\.\S+/, 'Please fill the valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;