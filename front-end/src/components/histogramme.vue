<script setup>
import { ref, computed, onMounted } from 'vue';
import { getProducts } from '../utils/apiRoutes';
import axios from 'axios';
import * as ChartJs from 'chart.js';
const { Chart, registerables } = ChartJs;
 import { BarChart } from 'vue-chart-3';

 

 Chart.register(...registerables);
 const salesData= ref([])
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const fetchSalesData = async ()=>{
    try {
        const response = await axios.get(getProducts);
        salesData.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
onMounted(() => { 
  fetchSalesData();
});

const VentesParProduit= computed(() => ({
  labels: salesData.value.map((item) => item.Products.ProductName),
  datasets: [
    {
      label: 'Les ventes par produit ',
      data: salesData.value.map((item) => item.totalSales),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
}));
</script>

<template>
    <div class="bg-white" >
           <div>
                <h1 class="pt-10 pl-4 text-3xl font-bold mb-4 text-black">
                    Les ventes par produit:
                </h1>
                <div class="pt-5 p-4 shadow-xl shadow-blue-gray-900/5 " style="width:975px">
                    <BarChart :chart-data="VentesParProduit" :chart-options="chartOptions" />
                </div>
                
        </div>
    </div>
  </template>