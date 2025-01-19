import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide name."],
        minLength: [3, "Name must contain at least 3 characters."],
        maxLength: [30, "Name must not contain above 30 characters."],
    },
    email:{
        type:String,
        required:[true, "Please provide email."],
        validate: [validator.isEmail, "Please provide valid email."],
    },
    phone:{
        type:Number,
        required:[true, "Please provide phone number"],
    },
    password:{
        type:String,
        required:[true, "please provide password."],
        minLength:[8, "Password must contain 8 characters."],
        maxLength:[32, "Password can not exceed 32 characters."],
        select: false,
    },
    role:{
        type: String,
        required: [true, "Specify your role."],
        enum:["Job Seeker", "Employer"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
 });


 //password hashing
 userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
 });

 //comparing passw
 userSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
 };

 //generate jwt token
 userSchema.methods.getJWTtoken = function (){
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
 };

 export const User = mongoose.model("User", userSchema);