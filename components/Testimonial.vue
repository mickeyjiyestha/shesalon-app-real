<template>
  <div class="container mx-auto px-4 md:px-50 mb-30">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
      <!-- Left Section -->
      <div
        class="relative px-4 md:px-0"
        v-motion-visible
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <p
          class="text-[#696984] tracking-widest uppercase text-sm mb-2"
          v-motion-visible
          :initial="{ opacity: 0, x: -100 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { duration: 800, delay: 200 },
          }"
        >
          Testimonial
        </p>
        <h2
          class="text-[28px] md:text-[40px] font-medium text-[#f6339a] mb-4"
          v-motion-visible
          :initial="{ opacity: 0, x: -100 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { duration: 800, delay: 300 },
          }"
        >
          What They Say?
        </h2>
        <p
          class="text-[#696984] font-normal mb-3 max-w-110 text-lg md:text-xl"
          v-motion-visible
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 400 },
          }"
        >
          She Salon has received countless positive reviews from our valued
          clients.
        </p>
        <p
          class="text-[#696984] font-normal mb-3 max-w-100 text-lg md:text-xl"
          v-motion-visible
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 500 },
          }"
        >
          Many have experienced exceptional service, professional care, and
          stunning results.
        </p>
        <p
          class="text-[#696984] font-normal mb-6 max-w-80 text-lg md:text-xl"
          v-motion-visible
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 600 },
          }"
        >
          Have you visited us? Share your experience with us today!
        </p>
        <button
          @click="openModal"
          class="border border-pink-400 text-[#f6339a] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-pink-50 transition-all duration-300"
          v-motion-visible
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 800, delay: 700 },
          }"
        >
          Write your experience
          <span
            class="bg-[#f6339a] text-white w-7 h-7 flex items-center justify-center rounded-full"
            >→</span
          >
        </button>
      </div>

      <!-- Right Section - Testimonial Slider -->
      <div
        class="relative flex justify-center pb-10 px-4 md:px-0"
        v-motion-visible
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
      >
        <div class="relative w-full md:w-auto">
          <!-- Image -->
          <Transition name="fade" mode="out-in">
            <img
              :key="currentIndex"
              :src="testimonials[currentIndex].image"
              :alt="testimonials[currentIndex].name"
              class="w-full md:w-[400px] h-[300px] md:h-[500px] object-cover rounded-2xl shadow-lg bg-blue-300"
            />
          </Transition>

          <!-- Testimonial Card -->
          <Transition name="slide-fade">
            <div
              :key="currentIndex"
              class="absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-xl p-4 md:p-5 w-[90%] md:w-[350px] z-10"
              :class="{ 'md:-bottom-15 -bottom-10': true }"
            >
              <p class="text-gray-700 text-sm italic">
                "{{ testimonials[currentIndex].text }}"
              </p>
              <p class="text-gray-900 font-bold mt-2">
                {{ testimonials[currentIndex].name }}
              </p>
              <div class="flex text-[#f6339a] mt-1">
                <TransitionGroup name="star">
                  <span
                    v-for="star in testimonials[currentIndex].rating"
                    :key="star"
                    >★</span
                  >
                </TransitionGroup>
              </div>
            </div>
          </Transition>

          <!-- Navigation Arrow -->
          <button
            @click="nextTestimonial"
            class="absolute right-0 md:right-[-40px] top-1/2 transform -translate-y-1/2 bg-[#f6339a] text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#e56363] transition-colors duration-300 z-20"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </div>
  <ExperienceModal :isOpen="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import testimoniImage from "@/assets/images/testimoni.jpg";
import testimoniImage2 from "@/assets/images/testimoni2.jpg";
import testimoniImage3 from "@/assets/images/testimoni3.jpg";
import ExperienceModal from "@/components/ExperienceModal.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const testimonials = ref([
  {
    image: testimoniImage,
    text: "I'm truly grateful for the amazing service. It's just what I needed, and the results exceeded my expectations. The experience was effortless and enjoyable.",
    name: "Caca",
    rating: 5,
  },
  {
    image: testimoniImage2,
    text: "This salon provides the best service I've ever had. The staff are professional and very friendly. Highly recommended!",
    name: "Lisa",
    rating: 4,
  },
  {
    image: testimoniImage3,
    text: "The atmosphere is so relaxing, and the results are always perfect. Will definitely come back!",
    name: "Rina",
    rating: 5,
  },
]);

const currentIndex = ref(0);

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};

// Auto-advance testimonials
onMounted(() => {
  setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.star-enter-active,
.star-leave-active {
  transition: all 0.3s ease;
}

.star-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.star-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>
