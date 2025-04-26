<script setup>
import { defineProps } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="flex justify-center items-center rounded-lg md:rounded-xl bg-[#f6339a] w-full px-4 py-2 md:py-3 mt-4 md:mt-7 text-sm md:text-base font-medium text-white transition-all hover:bg-[#e56666] active:bg-[#d85a5a]"
  >
    {{ buttonText }}
  </button>
</template>
