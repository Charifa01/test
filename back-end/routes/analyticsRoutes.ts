import { Router } from "express"
import { topProducts ,
        getProducts ,
        TotalSales ,
         salesByCategory }from "../controllers/analyticsController";


const router = Router();

router.get('/trending_products',topProducts )
router.get('/products',getProducts)
router.get('/category_sales',salesByCategory)
router.get('/total_sales/:days', TotalSales)

export default router;