<script setup>
import { ref, computed, onMounted } from 'vue';
import { salesByCategory } from '../utils/apiRoutes';
import { getProducts } from '../utils/apiRoutes';
import histogramme from '../components/histogramme.vue';
import axios from 'axios';
import * as ChartJs from 'chart.js';
const { Chart, registerables } = ChartJs;
 import { BarChart } from 'vue-chart-3';
 import { PieChart } from 'vue-chart-3';
 

 Chart.register(...registerables);


const data = ref([]);
const isLoading = ref(true);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
const fetchData = async ()=>{
    try {
        const response = await axios.get(salesByCategory);
        data.value = response.data;
        console.log(data.value )
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
       isLoading.value = false; 
      }
}

onMounted(() => { 
  fetchData();
});
const chartData = computed(() => ({
  labels: data.value.map((item) => item.category),
  datasets: [
    {
      label: 'Pourcentage des ventes dans chaque catégorie',
      data: data.value.map((item) => item.percentage),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
}));

</script>

<template>
    <div class="w-10/12 rounded min-h-5/6 mx-auto my-4 py-8 px-12">
      <histogramme />
        <div class="bg-white mt-10" >
            <div >
                <h1 class="pt-12 mt-4 pl-4 text-3xl font-bold mb-4 text-black">
                    Pourcentage des ventes dans chaque catégorie:
                </h1>
                    <div class="p-4 flex justify-center items-center shadow-xl shadow-blue-gray-900/5 " style="width:975px; height:410px"  v-if="isLoading" >
                        <div class="w-6/12 flex flex-row justify-center  gap-2">
                        <div class="w-5 h-5  rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                        <div class="w-5 h-5  rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                        <div class="w-5 h-5  rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                    </div>
                    </div>
                   <div v-else class="pt-5 p-4 shadow-xl shadow-blue-gray-900/5 " style="width:975px">
                    <PieChart :chart-data="chartData" :chart-options="chartOptions" />
                   </div>
           </div>
           
        </div>
    </div>
  </template>