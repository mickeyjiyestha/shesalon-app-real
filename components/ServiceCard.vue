<template>
  <div 
    class="card bg-white p-8 rounded-2xl transition-all duration-500 hover:shadow-xl"
    :class="delay"
  >
    <div class="relative mb-8">
      <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
        <img 
          :src="icon" 
          alt="" 
          class="w-12 h-12 transform transition-all duration-300 hover:rotate-12"
        />
      </div>
    </div>
    
    <h3 class="text-xl font-semibold mb-4 text-gray-800">{{ title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  delay: String
});
</script>