<template>
  <div
    class="bg-white border-r border-gray-200 w-64 md:w-64 h-screen fixed md:static z-30 overflow-y-auto"
  >
    <div class="flex items-center justify-between px-4 py-4 md:mb-8">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center"
        >
          <span class="text-pink-500">👩</span>
        </div>
        <span class="text-lg font-semibold">Admin</span>
      </div>
      <!-- Close button for mobile -->
      <button @click="$emit('close')" class="md:hidden text-gray-500">
        <XMarkIcon class="w-6 h-6" />
      </button>
    </div>
    <nav class="space-y-1 px-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        :class="{ 'bg-gray-100': isCurrentPath(item.path) }"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.name }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import {
  Squares2X2Icon,
  UserGroupIcon,
  ScissorsIcon,
  CubeIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: Squares2X2Icon },
  { name: "Jadwal", path: "/admin/jadwal", icon: CalendarIcon },
  { name: "Transaksi", path: "/admin/transaksi", icon: BanknotesIcon },
  {
    name: "Booking",
    path: "/admin/booking",
    icon: ClipboardDocumentCheckIcon,
  },
  { name: "User", path: "/admin/user", icon: UserGroupIcon },
  { name: "Layanan", path: "/admin/layanan", icon: ScissorsIcon },
  { name: "Stok", path: "/admin/stock", icon: CubeIcon },
  { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
];

const route = useRoute();

const isCurrentPath = (path) => {
  return route.path === path;
};

// Import the calendar icon that was missing in your original code
import { CalendarIcon } from "@heroicons/vue/24/outline";
</script>
