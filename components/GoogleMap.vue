<template>
  <div
    ref="mapContainer"
    class="w-full h-[300px] rounded-lg overflow-hidden shadow-lg"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const mapContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const waitForGoogleMaps = setInterval(() => {
    if ((window as any).google && (window as any).google.maps) {
      clearInterval(waitForGoogleMaps); // Stop checking

      const map = new (window as any).google.maps.Map(
        mapContainer.value as HTMLDivElement,
        {
          center: { lat: -8.7976307, lng: 115.1943645 },
          zoom: 15,
        }
      );

      new (window as any).google.maps.Marker({
        position: { lat: -8.7976307, lng: 115.1943645 },
        map,
        title: "She Salon",
      });
    }
  }, 500); // Cek setiap 500ms sampai Google Maps siap
});
</script>
