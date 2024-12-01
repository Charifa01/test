<script setup>
import { trendingProducts } from '../utils/apiRoutes';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref([]);

const fetchData = async ()=>{
    try {
        const response = await axios.get(trendingProducts);
        data.value = response.data;
        console.log(data.value )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
onMounted(fetchData);

</script>
<template>
    <div class="bg-white w-10/12 rounded h-5/6 mx-auto my-4 py-8 px-12">
       
        <div class="">
            <h1 class="text-2xl font-bold mb-4 text-black">Top 5 des produits les plus vendus :</h1>
        </div>
        <div class="mt-7 overflow-x-auto">
                <table class="w-full whitespace-nowrap">
                    <thead>
                        <tr class="focus:outline-none h-16 border border-gray-200 rounded">
                        <th class="text-base font-medium leading-none text-gray-900 mr-2">Nom</th>
                        <th class="text-base font-medium leading-none text-gray-900  mr-2">Quantité Vendue</th>
                        <th class="text-base font-medium leading-none text-gray-900  mr-2">Montant Total des Ventes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data" class="focus:outline-none h-16 border border-gray-200 rounded">
                            <td class="">
                                <div class="flex items-center pl-5">
                                    <p class="text-base font-medium leading-none text-gray-700 m-auto ">{{ item.ProductName }}</p>
                                    
                                </div>
                            </td>
                            <td >
                                <div class="flex items-center">
                                    <p class="text-sm leading-none text-gray-600 m-auto ">{{ item.totalQuantity}}</p>
                                </div>
                            </td>
                            <td >
                                <div class="flex items-center">
                                    <p class="text-sm leading-none text-gray-600 m-auto "> {{ item.TotalAmount }} </p>
                                </div>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
    </div>

</template>
<style>

</style>