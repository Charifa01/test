import express from 'express';
import connectDB from './config/db';
import importData from './config/importData';
// import getSale  from './controllers/analyticsController';
import Product from './models/Product';
import Sale from './models/Sale';
import cors from 'cors';
import analyticsRoutes from './routes/analyticsRoutes';


const app = express();

const PORT = process.env.PORT || 4000;

// middewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const startServer = async () => {
    try {
      await connectDB();
      const productCount = await Product.countDocuments();
      const saleCount = await Sale.countDocuments();

    if (productCount === 0 && saleCount === 0) {
      console.log("No data found. Importing data...");
      await importData();
      console.log("Data import complete.");
    } else {
      console.log("Data already exists. Skipping data import.");
    }
    //Routes 
    app.use('/analytics', analyticsRoutes)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // getSale();
      
    } catch (err) {
      console.error("Error during data import:", err);
      process.exit(1); // Exit the process with failure status if data import fails
    }
  };
  
  // Call startServer function
  startServer();
