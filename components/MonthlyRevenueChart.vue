<template>
  <div>
    <div class="relative h-64">
      <!-- Y-Axis Labels -->
      <div
        class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2"
      >
        <div>400</div>
        <div>300</div>
        <div>200</div>
        <div>100</div>
        <div>0</div>
      </div>

      <!-- Chart Area -->
      <div class="ml-8 h-full">
        <div class="h-full flex items-end">
          <div
            v-for="(month, index) in monthlyData"
            :key="index"
            class="relative h-full flex-1 flex justify-center items-end px-1"
          >
            <!-- Background Grid Line -->
            <div class="absolute inset-0 border-r border-gray-100"></div>

            <!-- Bar -->
            <div
              class="w-6 rounded-t-md bg-gradient-to-t from-pink-400 to-pink-300"
              :style="{ height: `${month.value / 4}%` }"
            ></div>

            <!-- X-Axis Label -->
            <div
              class="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 transform translate-y-6"
            >
              {{ month.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- X-Axis Line -->
      <div
        class="absolute bottom-0 left-8 right-0 h-px bg-gray-200 transform translate-y-4"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Monthly revenue data
const monthlyData = ref([
  { name: "JAN", value: 100 },
  { name: "FEB", value: 130 },
  { name: "MAR", value: 140 },
  { name: "APR", value: 220 },
  { name: "MAY", value: 250 },
  { name: "JUN", value: 200 },
  { name: "JUL", value: 220 },
  { name: "AUG", value: 100 },
  { name: "SEP", value: 270 },
  { name: "OCT", value: 320 },
  { name: "NOV", value: 350 },
  { name: "DEC", value: 400 },
]);
</script>
