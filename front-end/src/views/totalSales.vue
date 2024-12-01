<script setup>
import { ref } from 'vue';
import { totalSales } from '../utils/apiRoutes';
import axios from 'axios';

const selectedValue = ref(0)
const total = ref(0)
const message = ref();

const fetchData = async (params)=>{
    try {
        const response = await axios.get(`${totalSales}/${params}`);
        if (response.data.length === 0) {
            message.value = "Il n'y a pas de ventes dans cette période !!"
        }else{
            message.value = '';
            total.value = response.data[0].totalSales;
           
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

const handleChange = () => {
  if (selectedValue.value === '365') {
       message.value = "Cela prendra quelques secondes .."
  }
    fetchData(selectedValue.value)
    
};


</script>
<template>
    <div class="flex flex-col items-center rounded-xl bg-white w-10/12  min-h-5/6 mx-auto mt-10 mb-4 p-12 ">
        <div class="w-full max-w-sm mx-auto my-6">
    <label for="date-range" class="block text-md font-medium text-gray-700 mb-2">
      Sélectionnez une période
    </label>
    <select
    placeholder="Sélectionnez une période"
      v-model="selectedValue"
      id="date-range"
       @change="handleChange"
      class="block pl-4 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 outline-none text-gray-700 sm:text-md py-3 px-3"
    >
      <option value="0" disabled selected> --- Sélectionnez --- </option>
      <option value="7">7 derniers jours</option>
      <option value="30">30 derniers jours</option>
      <option value="365">12 derniers mois</option>
    </select>
  </div>
        <div class="">
            <h1 class="text-2xl font-bold mb-4 text-black"> le montant total des ventes:</h1>
             
        </div>
        <div 
        class="border border-gray-200 rounded-xl text-gray-900 shadow-xl shadow-blue-gray-900/5 text-4xl flex justify-center items-center my-8" 
        style="width: 50%;height: 250px;color:#636bff">
        {{ total }} DH
       </div>
       <p class="text-red-400 text-lg" v-if="!message == '' "> {{ message }}</p>
    </div>
</template>
