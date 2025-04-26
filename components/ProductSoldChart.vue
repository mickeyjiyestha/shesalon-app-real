<template>
  <div class="flex flex-col items-center">
    <div class="relative w-64 h-64">
      <!-- SVG Donut Chart with segments -->
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <!-- Background Circle -->
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#f1f1f1"
          stroke-width="1"
        />

        <!-- Yellow Segments (CBD) -->
        <path
          v-for="(_, i) in 30"
          :key="`cbd-${i}`"
          :d="getSegmentPath(50, 50, 32, 40, i * 4.5, (i + 1) * 4.5 - 0.5)"
          fill="#fcdc45"
        />

        <!-- Red Segments (L'OREAL) -->
        <path
          v-for="(_, i) in 20"
          :key="`loreal-${i}`"
          :d="
            getSegmentPath(
              50,
              50,
              32,
              40,
              135 + i * 4.5,
              135 + (i + 1) * 4.5 - 0.5
            )
          "
          fill="#ff7357"
        />

        <!-- Purple Segments (MAKARIZO) -->
        <path
          v-for="(_, i) in 10"
          :key="`makarizo-${i}`"
          :d="
            getSegmentPath(
              50,
              50,
              32,
              40,
              225 + i * 4.5,
              225 + (i + 1) * 4.5 - 0.5
            )
          "
          fill="#6366f1"
        />

        <!-- Highlighted Segment (for showing count) -->
        <path
          :d="getSegmentPath(50, 50, 28, 40, 45, 54)"
          fill="#ffde61"
          class="cursor-pointer"
          @mouseover="showHighlight('cbd', 38)"
          @mouseout="hideHighlight"
        />

        <!-- Inner Circle (White Background) -->
        <circle cx="50" cy="50" r="28" fill="white" />
      </svg>

      <!-- Highlight Badge (Appears on Hover) -->
      <div
        v-if="highlight.show"
        class="absolute top-1 left-24 bg-white shadow-md rounded-full px-2 py-1 text-sm font-medium flex items-center justify-center"
      >
        {{ highlight.count }}
      </div>

      <!-- Center Text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-4xl font-bold text-gray-800">768</span>
        <span class="text-xs text-gray-500 uppercase tracking-wide"
          >PRODUCTS</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Highlight state
const highlight = ref({
  show: false,
  brand: "",
  count: 0,
});

// Show highlight badge with count
const showHighlight = (brand, count) => {
  highlight.value = {
    show: true,
    brand,
    count,
  };
};

// Hide highlight badge
const hideHighlight = () => {
  highlight.value.show = false;
};

// Generate SVG path for a donut segment
const getSegmentPath = (
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle
) => {
  // Convert angles from degrees to radians
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  // Calculate points
  const innerStartX = cx + innerRadius * Math.cos(startRad);
  const innerStartY = cy + innerRadius * Math.sin(startRad);
  const innerEndX = cx + innerRadius * Math.cos(endRad);
  const innerEndY = cy + innerRadius * Math.sin(endRad);

  const outerStartX = cx + outerRadius * Math.cos(startRad);
  const outerStartY = cy + outerRadius * Math.sin(startRad);
  const outerEndX = cx + outerRadius * Math.cos(endRad);
  const outerEndY = cy + outerRadius * Math.sin(endRad);

  // Generate path string
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `
      M ${innerStartX} ${innerStartY}
      L ${outerStartX} ${outerStartY}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
      L ${innerEndX} ${innerEndY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
    `;
};

// Product data by brand
const productData = ref({
  total: 768,
  brands: [
    { name: "CBD", count: 485, color: "#fcdc45" },
    { name: "L'OREAL", count: 195, color: "#ff7357" },
    { name: "MAKARIZO", count: 88, color: "#6366f1" },
  ],
});
</script>
