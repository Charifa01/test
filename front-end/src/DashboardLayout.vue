<script setup>

import SideBar from './components/SideBar.vue';
import NavBar from './components/NavBar.vue';


</script>

<template>
     <div class="w-full flex min-h-screen font-sans " style="background:#f5f6fa">
        <div class="w-1/5 flex">
            <SideBar/> 
        </div>
        <main class="w-4/5 flex overflow-auto min-h-screen flex-col " >
              <NavBar/>
              <router-view />
        </main>
      
    </div>

</template>
<style></style>