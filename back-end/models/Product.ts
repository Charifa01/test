import mongoose from "mongoose";
import { Schema } from "mongoose";

interface Product{
    ProductID :number,
    ProductName: string,
    Category: string,
    Price: number,
    DateAdded : Date
}
const ProductSchema = new Schema<Product>({
    ProductID:{type:Number, required: true},
    ProductName:{ type: String, required: true },
    Category: { type: String, required: true },
    Price: { type: Number, required: true },
    DateAdded :{ type: Date, default: Date.now }
})
ProductSchema.index({ ProductID: 1 });
ProductSchema.index({ Category: 1 });
export default mongoose.model<Product>('products',ProductSchema)