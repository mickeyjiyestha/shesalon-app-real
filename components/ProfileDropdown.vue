<template>
  <div class="relative flex items-center">
    <img
      @click="toggleDropdown"
      src="~/assets/images/Danny.jpeg"
      alt="Profile"
      class="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-[#F97474] transition duration-300 z-10"
    />

    <!-- Arrow with rotation animation -->
    <svg
      @click="toggleDropdown"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-5 h-5 ml-2 mb-2 cursor-pointer text-white z-10 transition-transform duration-300"
      :style="{
        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transformOrigin: 'center',
      }"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 15l-7 7-7-7"
      />
    </svg>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-35 w-40 bg-white rounded-lg shadow-lg z-50 text-gray-800"
    >
      <a href="/profile" class="block px-4 py-2 hover:bg-gray-100 transition">
        My Profile
      </a>
      <a
        href="#"
        @click.prevent="handleLogout"
        class="block px-4 py-2 hover:bg-gray-100 transition"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  user: Object,
});

const emit = defineEmits(["logout"]);
const isDropdownOpen = ref(false);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown if clicked outside
const closeDropdown = (event) => {
  const dropdownElement = event.target.closest(".relative");
  if (!dropdownElement) {
    isDropdownOpen.value = false;
  }
};

// Handle logout
const handleLogout = () => {
  emit("logout");
  isDropdownOpen.value = false;
};

// Add event listener on mount and remove it on unmount
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
/* Optional: Add any other necessary styles */
</style>
