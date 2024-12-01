import { createRouter, createWebHistory } from 'vue-router';

import totalSales from '../views/totalSales.vue';
import TopProducts from '../views/TopProducts.vue';
import salesByCategory from '../views/salesByCategory.vue';
import getProducts from '../views/getProducts.vue';
import dashboardLayout from '../views/dashboardLayout.vue';




const routes = [
  {
    path: '/',
    redirect : '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: dashboardLayout,
      },
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
