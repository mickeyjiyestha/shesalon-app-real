<template>
  <div
    class="shadow-lg hover:shadow-xl p-5 py-15 rounded-3xl text-center relative bg-white z-10 w-full md:w-auto hover:translate-y-[-10px] transition-all duration-500 ease-out scale-in group"
    :class="delay"
  >
    <div
      class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#f6339a] rounded-full z-20 p-3 group-hover:bg-[#e02d8a] transition-colors duration-300 shadow-md"
    >
      <img
        :src="icon"
        alt=""
        class="transform group-hover:rotate-12 transition-transform duration-300"
      />
    </div>
    <div class="text-xl max-w-60 mx-auto mb-5 mt-10 font-semibold">
      <p>{{ title }}</p>
    </div>
    <div class="max-w-80 mx-auto">
      <p class="text-md text-[#696984]">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  delay: String,
});
</script>
