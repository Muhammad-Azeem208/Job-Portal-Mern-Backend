import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Job title required!"],
        minLength:[3, "Title must contain at least 3 characters!"],
        maxLength:[50, "Title can not exceed 50 characters!"],
    },
    description:{
        type: String,
        required:[true, "description is required!"],
        minLength:[3, "Description must contain at least 3 characters!"],
        maxLength:[350, "Description can not exceed 350 characters!"],
    },
    category:{
        type:String,
        required:[true, "Category is required!"],
    },
    country:{
        type:String,
        required:[true, "Country is required!"],
    },
    city:{
        type:String,
        required:[true, "City is required!"],
    },
    location:{
        type:String,
        required:[true, "Location is required!"],
        minLength:[50, "Location must contain at least 50 characters!"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4, "Salary must be 4 digits and above!"],
        maxLength:[9, "Salary must not exceed 9 digits!"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4, "Starting Salary must be 4 digits and above!"],
        maxLength:[9, "Starting Salary must not exceed 9 digits!"],
    },
    salaryTo:{
        type:Number,
        minLength:[4, "Ending Salary must be 4 digits and above!"],
        maxLength:[9, "Ending Salary must not exceed 9 digits!"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
});

export const Job = mongoose.model("Job", jobSchema);