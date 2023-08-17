const mongoose = require('mongoose');

const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Databse Connected Successfully");
    }
    catch (error){

        console.log("Database Connection failed",error.message);

    }
}

dbConnect();