<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const isRegisterPage = ref(false);
const route = useRoute();

onMounted(() => {
  isRegisterPage.value = route.path === "/register";
});

watch(
  () => route.path,
  (newPath) => {
    isRegisterPage.value = newPath === "/register";
  }
);

// Mendeteksi apakah dalam tampilan mobile
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

const getBackgroundClass = () => {
  if (isMobile.value) {
    return [
      "w-full h-56 bg-[url('~/assets/images/loginregister-bg.png')] bg-cover relative flex flex-col justify-start items-center transition-all duration-700 ease-in-out",
      "order-1",
    ];
  } else {
    return [
      "w-2/5 h-screen bg-[url('~/assets/images/loginregister-bg.png')] bg-cover relative flex flex-col justify-center items-center transition-all duration-700 ease-in-out",
      isRegisterPage.value
        ? "order-2 rounded-l-[270px]"
        : "order-1 rounded-r-[270px]",
    ];
  }
};

const getContentClass = () => {
  if (isMobile.value) {
    return [
      "w-full flex-1 flex flex-col justify-start items-center py-8 px-4 transition-all duration-700 ease-in-out",
      "order-2",
    ];
  } else {
    return [
      "w-3/5 flex flex-col justify-center items-center space-y-4 transition-all duration-700 ease-in-out",
      isRegisterPage.value ? "order-1" : "order-2",
    ];
  }
};
</script>

<template>
  <div
    :class="
      isMobile
        ? 'flex flex-col h-screen overflow-auto'
        : 'flex h-screen overflow-hidden'
    "
  >
    <div :class="getBackgroundClass()">
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"
      ></div>
      <slot name="background-content"></slot>
    </div>

    <div :class="getContentClass()">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Animasi hanya untuk desktop */
@media (min-width: 768px) {
  .order-1 {
    animation: slideFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .order-2 {
    animation: slideFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
