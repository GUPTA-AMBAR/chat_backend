import mongoose from 'mongoose';


const connectToDataBase = async()=>{
    try {
        console.log("connecting to the data base...");

        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("database is connected successfully");
        
    } catch (error) {
        console.log("error in connecting to the database" , error.message);
    }
}

export default connectToDataBase;

