import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 4000;
// middewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// connection with the datebase

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
            console.log('Database connecting successful');
    }
    catch(err){
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
}
export default connectDB;
