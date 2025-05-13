<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-[90%] max-w-lg p-8 relative animate-fadeIn"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors duration-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <h3
        class="text-2xl font-bold bg-gradient-to-r from-[#f6339a] to-[#ff5757] bg-clip-text text-transparent mb-6 text-center"
      >
        Share Your Experience
      </h3>

      <form @submit.prevent="submitTestimonial" class="space-y-6">
        <div>
          <label class="block text-gray-600 text-sm font-medium mb-2"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-xl border px-4 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-[#f6339a] focus:border-transparent focus:outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label class="block text-gray-600 text-sm font-medium mb-2"
            >Services</label
          >
          <select
            v-model="form.service"
            required
            class="w-full rounded-xl border px-4 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-[#f6339a] focus:border-transparent focus:outline-none transition-all duration-200"
          >
            <option disabled value="">Select Service</option>
            <option value="Haircut">Haircut</option>
            <option value="Hair Coloring">Hair Coloring</option>
            <option value="Hair Treatment">Hair Treatment</option>
            <option value="Makeup">Makeup</option>
            <option value="Facial">Facial</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-600 text-sm font-medium mb-2"
            >Testimonial</label
          >
          <textarea
            v-model="form.text"
            required
            rows="4"
            class="w-full rounded-xl border px-4 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-[#f6339a] focus:border-transparent focus:outline-none transition-all duration-200"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-600 text-sm font-medium mb-2"
            >Rating</label
          >
          <div class="flex gap-2">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              @click="form.rating = n"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              :class="
                form.rating >= n
                  ? 'bg-[#f6339a] text-white'
                  : 'bg-gray-100 text-gray-400'
              "
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="text-center mt-8">
          <button
            type="submit"
            class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-[#f6339a] text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span
              class="absolute w-0 h-full bg-[#e02d8a] top-0 left-0 transition-all duration-300 group-hover:w-full"
            ></span>
            <span class="relative flex items-center gap-2">
              ✨ Submit Testimonial
            </span>
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
  rating: 0,
  service: "",
});

const submitTestimonial = () => {
  // Simpan data testimonial di sini, bisa kirim ke API atau update list
  console.log("Testimonial submitted:", form);

  // Reset form
  form.name = "";
  form.text = "";
  form.rating = 0;
  form.service = "";

  // Tutup modal
  emit("close");
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
