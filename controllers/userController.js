import {catchErrors} from "../middlewares/catchErrors.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"

//user registration
export const register = catchErrors(async(req, res, next)=>{
    const {name, email, phone, role, password} = req.body;

    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Fill full form"));
    }

    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("User Already registered with this email!"));
    }
    const user = await User.create({
        name, 
        email, 
        phone, 
        role, 
        password,
    });
    sendToken(user, 200, res, "User registered successfully!");
});

//user login
export const login = catchErrors(async (req, res, next)=>{
    const {email, password , role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide all values!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or password!", 400));
    }
    const ifPassMatched = await user.comparePasswords(password);
    if(!ifPassMatched){
        return next(new ErrorHandler("Invalid Email or password!", 400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found!", 400));
    }
    sendToken(user, 200, res, "User Logged in!");
});

//user logout
export const logout = catchErrors(async(req, res, next)=>{
    res.status(201).cookie("token", "", {
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"User logged Out!",
        secure:true,
        sameSite:"None",
    });
});

export const getUser = catchErrors((req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});