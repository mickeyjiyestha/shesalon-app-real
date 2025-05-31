<template>
  <div class="flex flex-col h-full bg-white shadow-md w-64">
    <div class="px-6 py-4">
      <h1 class="text-xl font-semibold">Admin Panel</h1>
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

      <!-- Logout Button -->
      <button
        @click="logout"
        class="flex items-center px-4 py-2 mt-4 text-red-600 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
        Logout
      </button>
    </nav>

    <!-- Logout Button at bottom of sidebar -->
    <!-- <div class="mt-auto pt-4 border-t border-gray-200">
      <button 
        @click="logout" 
        class="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-gray-100 transition-colors"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div> -->
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
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useRouter, useRoute } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
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
  { name: "Testimoni", path: "/admin/testimoni", icon: CubeIcon },
  { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
];

const route = useRoute();

const isCurrentPath = (path) => {
  return route.path === path;
};

// Logout function
const logout = () => {
  const token = useCookie("token");
  token.value = null;
  router.push("/login");
};

// Import the calendar icon that was missing in your original code
import { CalendarIcon } from "@heroicons/vue/24/outline";
</script>
