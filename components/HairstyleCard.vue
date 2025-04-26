<template>
  <div class="transform transition-all duration-300 hover:scale-105">
    <div
      class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden backdrop-blur-sm"
    >
      <div class="relative">
        <img
          :src="imageUrl"
          :alt="title"
          class="w-full h-72 object-cover object-top"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"
        ></div>
      </div>
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2 break-normal">{{ title }}</h3>
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
