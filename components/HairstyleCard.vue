<template>
  <div class="transform transition-all duration-500 hover:scale-105 group">
    <div
      class="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden backdrop-blur-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
    >
      <div class="relative overflow-hidden">
        <img
          :src="imageUrl"
          :alt="title"
          class="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:opacity-80 transition-opacity duration-300"
        ></div>
      </div>
      <div class="p-6">
        <h3
          class="text-lg font-semibold mb-2 break-normal group-hover:text-[#f6339a] transition-colors duration-300"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600 break-words">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});
</script>
