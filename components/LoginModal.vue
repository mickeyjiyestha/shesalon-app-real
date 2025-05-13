<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Backdrop with blur effect -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modal-in"
      >
        <div class="text-center">
          <iframe
            style="margin: 0 auto; width: 200px; height: 200px"
            src="https://lottie.host/embed/5bedc9cc-3901-411e-b977-556ea6ba506f/noqJevWX65.lottie"
          ></iframe>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Login Required</h3>
          <p class="mb-8 text-gray-600">
            Please login first to make a booking.
          </p>
          <button
            @click="$emit('close')"
            class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-xl bg-[#F97474] text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span
              class="absolute w-0 h-full bg-[#e56666] top-0 left-0 transition-all duration-300 group-hover:w-full"
            ></span>
            <span class="relative">OK</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import lockGif from "~/assets/images/gif.webm";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.animate-modal-in {
  animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
