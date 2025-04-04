import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

// Schema
const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        required:[true, "Name is required."]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format."
        },
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password length should be greater than 6 character"],
    },
    location: {
        type: String,
        default: "India"
    }
},
{timestamps: true}
)
// middlewares
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

export default mongoose.model("User", userSchema);