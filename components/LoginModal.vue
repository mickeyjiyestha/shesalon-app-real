<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black opacity-50"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div class="text-center">
          <iframe
            style="margin-left: 45px"
            src="https://lottie.host/embed/5bedc9cc-3901-411e-b977-556ea6ba506f/noqJevWX65.lottie"
          ></iframe>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Login Required
          </h3>
          <p class="mb-6 text-gray-600">
            Please login first to make a booking.
          </p>
          <button
            @click="$emit('close')"
            class="bg-[#F97474] hover:bg-[#ff5757] text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            OK
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
