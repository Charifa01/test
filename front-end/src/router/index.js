import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import totalSales from '../views/totalSales.vue';
import TopProducts from '../views/TopProducts.vue';
import salesByCategory from '../views/salesByCategory.vue';
import getProducts from '../views/getProducts.vue';
import DashboardLayout from '../DashboardLayout.vue';




const routes = [
  {
    path: '/',
    children: [
      {
        path: '/total_sales',
        component: totalSales,
      },
      {
        path: '/trending_products',
        component: TopProducts,
      },
      {
        path: '/category_sales',
        component: salesByCategory,
      },
      {
        path: '/products',
        component: getProducts,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
