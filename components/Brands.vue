<script setup>
const brands = [
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/CERAVE-LOGO.webp",
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/COSRX-LOGO.webp",
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/LANCOME-LOGO.webp",
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/MAKARIZO-LOGO.webp",
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/MATRIX-LOGO.webp",
  "https://storage.googleapis.com/shesalon-assets/Brand's%20Logo/MSGLOW-LOGO.webp",
];
</script>

<template>
  <div class="max-w-5xl mx-auto overflow-hidden relative">
    <div class="flex animate-scroll-fast space-x-8 py-8">
      <template v-for="i in 2" :key="i">
        <img
          v-for="(logo, index) in brands"
          :key="`${i}-${index}`"
          class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
          :src="logo"
          alt=""
          loading="lazy"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.animate-scroll-fast {
  animation: scroll 5s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-fast:hover {
  animation-play-state: paused;
}
</style>
