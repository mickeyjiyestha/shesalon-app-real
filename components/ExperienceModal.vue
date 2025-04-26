<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="bg-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6 relative animate-fadeIn"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
      >
        &times;
      </button>

      <h3 class="text-2xl font-semibold text-[#f6339a] mb-4 text-center">
        Share Your Experience
      </h3>

      <form @submit.prevent="submitTestimonial">
        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-xl border px-4 py-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#f6339a] focus:outline-none"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1"
            >Services</label
          >
          <select
            v-model="form.rating"
            required
            class="w-full rounded-xl border px-4 py-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#f6339a] focus:outline-none"
          >
            <option disabled value="">Select Service</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1"
            >Testimonial</label
          >
          <textarea
            v-model="form.text"
            required
            rows="4"
            class="w-full rounded-xl border px-4 py-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#f6339a] focus:outline-none"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1"
            >Rating</label
          >
          <select
            v-model="form.rating"
            required
            class="w-full rounded-xl border px-4 py-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#f6339a] focus:outline-none"
          >
            <option disabled value="">Select Rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
          </select>
        </div>

        <div class="text-center mt-6">
          <button
            type="submit"
            class="bg-[#f6339a] text-white px-6 py-2 rounded-full shadow-md hover:scale-105 hover:bg-pink-600 transition-all duration-300"
          >
            ✨ Submit Testimonial
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["close"]);

const form = reactive({
  name: "",
  text: "",
  rating: "",
});

const submitTestimonial = () => {
  // Simpan data testimonial di sini, bisa kirim ke API atau update list
  console.log("Testimonial submitted:", form);

  // Reset form
  form.name = "";
  form.text = "";
  form.rating = "";

  // Tutup modal
  emit("close");
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
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
