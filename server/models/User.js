import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        first_name: {
                type: String,
                required: true,
                trim: true,
        },
        last_name: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true
        },
        jti: {
                type: String,
                required: true,
        },
        image_url: {
                type: String,
                required: true,
        }
}, {
        timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;