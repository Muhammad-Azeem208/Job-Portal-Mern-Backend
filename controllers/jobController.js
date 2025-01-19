import {catchErrors} from "../middlewares/catchErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchErrors(async(req, res, next)=>{
    const jobs = await Job.find({ expired:false });
    res.status(200).json({
        success:true,
        jobs,
    });
});

export const postJob = catchErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker has no access for this resource!", 400));
    }
    const {title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo} = req.body;
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please provide all details!", 400));
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide one of the salary from 2.", 400));
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Please provide only 1 salary method from 2.", 400));
    }
    //id stores in mongo
    const postedBy = req.user._id;
    const job = await Job.create({
        title, 
        description, 
        category, 
        country, 
        city, 
        location, 
        fixedSalary, 
        salaryFrom, 
        salaryTo,
        postedBy,
    });
    res.status(200).json({
        success:true,
        message:"Job is Live!",
        job,
    });
});

export const getmyJobs = catchErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker has no access for this resource!", 400));
    }
    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myjobs,
    });
});

export const updateJob = catchErrors(async(req, res, next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker has no access for this resource!", 400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found!", 400)); 
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        job,
        message:"Job updated!",
    });
});

export const deleteJob = catchErrors(async(req,res,next)=>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker has no access for this resource!", 400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found!", 400)); 
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job Deleted!"
    });
});