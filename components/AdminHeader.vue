<template>
  <div class="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-4 w-full md:w-auto">
        <button class="text-gray-400 md:block hidden">
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <div class="relative flex-1 md:flex-none">
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search for anything..."
            class="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full md:w-96 focus:outline-none"
          />
        </div>
      </div>
      <div class="flex items-center justify-end gap-4">
        <button class="text-gray-600">
          <CalendarIcon class="w-6 h-6" />
        </button>
        <button class="text-gray-600">
          <BellIcon class="w-6 h-6" />
        </button>

        <!-- Admin Profile Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 focus:outline-none"
          >
            <span class="text-sm font-medium hidden md:inline">Admin</span>
            <div
              class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center"
            >
              <UserIcon class="w-4 h-4" />
            </div>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
          >
            <div class="px-4 py-2 border-b border-gray-100">
              <p class="text-sm font-medium">Admin Account</p>
            </div>
            <button
              @click="logout"
              class="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
            >
              <ArrowRightOnRectangleIcon class="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <!-- Admin Profile Section -->
        <!-- <div class="flex items-center gap-2" @click="logout" style="cursor: pointer;">
          <span class="text-sm font-medium hidden md:inline">Admin 1</span>
          <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { ref, onMounted, onUnmounted } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const isDropdownOpen = ref(false);
const token = useCookie("token"); // Move useCookie to the top

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event) => {
  if (isDropdownOpen.value && !event.target.closest(".relative")) {
    isDropdownOpen.value = false;
  }
};

const logout = () => {
  // Clear authentication token
  // Cookies.remove('token');

  token.value = null;

  // Redirect to login page
  router.push("/login");
};
</script>
