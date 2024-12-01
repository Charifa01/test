import { Request, Response,NextFunction } from "express";
import Sale from "../models/Sale";

export const TotalSales = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  try{
         const periodSelectioned = Number(req.params.days);
         const currentDate = new Date();
         const selectionedDate = new Date();
 
         selectionedDate.setDate(currentDate.getDate() - periodSelectioned )
         
         const totalSales = await Sale.aggregate([
           {
             $match: {
               Date: { $gte:selectionedDate  , $lte:currentDate },
             },
           },
           {
             $lookup: {
               from: "products",
               localField: "ProductID",
               foreignField: "ProductID",
               as: "Products",
             },
          },
          {
           $unwind: "$Products",
          },
           {
             $group: {
               _id: null, 
               totalSales: { 
                 $sum: {
                   $multiply: ['$Quantity', '$Products.Price']
               } }
           }
           },{
             $project: {
                 _id: 0,
                 totalSales: 1,
               },
           }
         ])
         console.log(totalSales)
           res.status(200).json(totalSales)
        
  }catch(err){
     next(err);
  }
 }
export const topProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try {
        const topProducts = await Sale.aggregate([
            {
              $group: {
                _id: "$ProductID",
                totalQuantity: { $sum: "$Quantity" },
                totalSales: { $sum: "$TotalAmount" },
              },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "ProductID",
                as: "productDetails",
              },
            },
            {
              $project: {
                _id: 0,
                ProductName: { $arrayElemAt: ["$productDetails.ProductName", 0] },
                totalQuantity: "$totalQuantity",
                TotalAmount: { $round: ["$totalSales", 2] },
              },
            },
          ]);
          res.status(200).json(topProducts)
        
    }catch(err){
        next(err)
    }
}
export const salesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  try{
    
    const salesByCategory = await Sale.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "ProductID",
          foreignField: "ProductID",
          as: "Products",
         },
     },
     {
      $unwind: "$Products",
     },
     {
      $group: {
        _id: "$Products.Category", 
        totalSales: { $sum: "$TotalAmount"},
        count: { $sum: 1 }
      },
     },
     {
        $group: {
          _id: null, // Regrouper tous les résultats pour calculer le total
          categories: { $push: { category: "$_id", totalSales: "$totalSales", count: "$count" } },
          totalSales: { $sum: "$totalSales" }, // Total des ventes
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          _id: 0,
          category: "$categories.category",
          totalSales: "$categories.totalSales",
          count: "$categories.count",
          percentage: {
            $multiply: [
              { $divide: ["$categories.totalSales", "$totalSales"] }, // Calculer le pourcentage
              100,
            ],
          },
        },
      },
    ])

    console.log(salesByCategory )
    res.status(200).json(salesByCategory )

  }catch(err){
    next(err)
  }
}
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  try{
  const products = await Sale.aggregate([
      {
          $group: {
            _id: "$ProductID",
            totalSales: { $sum: 1 },
          },
       },
       {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "ProductID",
            as: "Products",
          },
        },
        {
          $project: {
              _id: 0,
              Products: { $arrayElemAt: ["$Products", 0] },
              totalSales: 1,
            },
        }
  ])
  res.status(200).json(products)
  
  }catch(err){
      next(err);
  }
  }