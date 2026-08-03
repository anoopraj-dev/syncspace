import mongoose from "mongoose";
import { AUTH_PROVIDER } from "../constants/auth.js";


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim:true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      
    },
    password: {
        type: String,
        required: true,
        select:false,
        minlength:8,
    },
    avatar: {
        type: String,
        default:'',
    },
    bio: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    provider: {
        type: String,
        enum: Object.values(AUTH_PROVIDER),
        default: AUTH_PROVIDER.LOCAL
    },
    providerId: {
        type: String,
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;