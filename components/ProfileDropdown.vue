<template>
  <div class="relative flex items-center">
    <div
      @click="toggleDropdown"
      class="flex items-center gap-2 cursor-pointer group"
    >
      <img
        src="~/assets/images/Danny.jpeg"
        alt="Profile"
        class="w-10 h-10 rounded-full cursor-pointer border-2 border-white group-hover:border-[#F97474] transition duration-300 z-10 object-cover"
      />

      <!-- Arrow with rotation animation -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5 text-white z-10 transition-transform duration-300"
        :style="{
          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center',
        }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 text-gray-800 overflow-hidden animate-fadeIn"
    >
      <div class="py-2 px-4 border-b border-gray-100">
        <p class="text-sm font-medium">{{ user?.username || "Guest" }}</p>
        <p class="text-xs text-gray-500">
          {{ user?.email || "Not logged in" }}
        </p>
      </div>
      <a
        href="/profile"
        class="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
        My Profile
      </a>
      <a
        href="#"
        @click.prevent="handleLogout"
        class="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition text-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 12.586V8z"
            clip-rule="evenodd"
          />
        </svg>
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
.animate-fadeIn {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
