import fs from 'fs';
import unzipper from 'unzipper';
import path from 'path';
import connectDB from './db'
import csv from "csv-parser"
import { Model } from 'mongoose';
import Product from '../models/Product';
import Sale from '../models/Sale';

const compressedFolder = path.resolve(__dirname , '../../../dataset.zip');
const extractFolder = path.resolve(__dirname , '../../../extractFolder');

const loadData = async (filePath:string , model: Model<any> ,batchSize = 1000) =>{
   const data: any[] = [];
   return new Promise<void>((resolve , reject)=>{
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(csv())
    .on('data', (row: any) => {
        data.push(row);
    })
    .on('end', async() => {
      try{
        await model.insertMany(data)
        console.log('the data inserted successfully')
        resolve();
      }catch(err){
        console.log(err);
    }
    })
    .on("error", reject)
   })
}
const importData = async () => {
    try{
        await connectDB();
        console.log("Connected to MongoDB.");

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(compressedFolder)
              .pipe(unzipper.Extract({ path: extractFolder }))
              .on('close', () => {
                console.log("Data extracted.");
                resolve();
              })
              .on('error', (err) => {
                console.error('Error inserting data:', err.message, err);
                reject(err);
              });
          })

        // Define paths for files
        const productsFilePath = path.join(extractFolder, "products.csv");
        const salesFilePath = path.join(extractFolder, "sales.csv");

        // load data into mongodb
        await loadData(productsFilePath ,Product );
        await loadData(salesFilePath ,Sale );
        console.log("Data loaded successfully.");

    }catch(err){
        console.log(err);
    }
}
export default importData;