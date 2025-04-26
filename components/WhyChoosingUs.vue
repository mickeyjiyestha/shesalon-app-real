<template>
  <div
    class="flex items-center justify-center mb-6 md:mb-10 slide-in from-bottom px-4 md:px-0"
  >
    <p class="text-3xl md:text-4xl font-semibold">
      Why is
      <span
        class="text-[#f6339a] hover:text-[#f6339a] transition-colors duration-300"
      >
        Choosing Us
      </span>
    </p>
  </div>

  <div
    class="flex justify-center mb-20 md:mb-30 items-center text-center fade-in px-4 md:px-0"
  >
    <p class="text-lg md:text-xl font-regular max-w-2xl text-[#696984]">
      At She Salon, we prioritize quality, expertise, and comfort to give you
      the best beauty experience
    </p>
  </div>

  <div
    class="flex flex-col md:flex-row items-center justify-center mb-40 md:mb-60 relative px-4 md:px-0 space-y-8 md:space-y-0 md:space-x-4"
  >
    <ServiceCard
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :description="card.description"
      :icon="card.icon"
      :delay="card.delay"
    />
  </div>
</template>

<script setup>
import ServiceCard from "./ServiceCard.vue";

const cards = [
  {
    title: "Professional & Experienced Stylists",
    description:
      "Our team consists of highly skilled and trained professionals dedicated to bringing out your best look.",
    icon: "https://storage.googleapis.com/shesalon-assets/Logo/Barbershop.png",
    delay: "",
  },
  {
    title: "Premium Products & Personalized Care",
    description:
      "We use only high-quality, salon grade products to ensure you get the best results for your hair, skin, beauty and wellness.",
    icon: "https://storage.googleapis.com/shesalon-assets/Logo/Barbershop.png",
    delay: "delay-200",
  },
  {
    title: "Relaxing & Luxurious Atmosphere",
    description:
      "Our team consists of highly skilled and trained professionals dedicated to bringing out your best look, style, and confidence.",
    icon: "https://storage.googleapis.com/shesalon-assets/Logo/Barbershop.png",
    delay: "delay-400",
  },
];
</script>
