import mongoose from "mongoose";
import { Schema } from "mongoose";

interface Sale {
    SaleID : number,
    ProductID: number,
    Quantity: number,
    Date : Date,
    TotalAmount : number
} 
const SaleSchema = new Schema<Sale>({
    SaleID : { type: Number , required: true},
    ProductID: { type: Number, ref: 'Product', required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date, required: true },
    TotalAmount: { type: Number ,required: true },
})
SaleSchema.index({ "Date": 1 });
SaleSchema.index({ "TotalAmount": 1 });
export default mongoose.model<Sale>('sales', SaleSchema); 