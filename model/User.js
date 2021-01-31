import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    email: {
        type: String,
        required:true,
        min: 6,
        max: 250
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1050
    }
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);