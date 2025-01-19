import mongoose from "mongoose";


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_APP",
    }).then(()=>{
        console.log(`Connected to database.`);
    }).catch((err)=>{
        console.log(`Error ${err}.`);
    });
};

