<template>
  <div class="profile-dropdown-container">
    <!-- Debug info -->
    <div style="display: none">
      <p>Is dropdown open: {{ isOpen }}</p>
      <p>User: {{ JSON.stringify(user) }}</p>
    </div>

    <!-- Clickable button with very large hit area -->
    <button @click="toggleDropdown" class="profile-toggle-btn" type="button">
      <!-- Avatar icon -->
      <div class="avatar-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="avatar-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>

      <!-- Arrow icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="arrow-icon"
        :class="{ 'arrow-down': !isOpen, 'arrow-up': isOpen }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div v-show="isOpen" class="dropdown-menu">
      <div class="user-info">
        <p class="username">{{ user?.username || "Guest" }}</p>
        <p class="email">{{ user?.email || "Not logged in" }}</p>
      </div>

      <a href="/profile" class="menu-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="menu-icon"
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

      <a href="#" @click.prevent="logout" class="menu-item logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="menu-icon"
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
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["logout"]);
const isOpen = ref(false);

const toggleDropdown = (event) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
  console.log("Dropdown toggled, now:", isOpen.value);
};

const handleOutsideClick = (event) => {
  if (!event.target.closest(".profile-dropdown-container") && isOpen.value) {
    isOpen.value = false;
    console.log("Dropdown closed by outside click");
  }
};

const logout = () => {
  console.log("Logout clicked");
  emit("logout");
  isOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
/* Container styling */
.profile-dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 100;
}

/* Button styling - large hit area */
.profile-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 8px;
  outline: none;
}

/* Avatar styling */
.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  color: white;
  border: 2px solid white;
  transition: border-color 0.3s;
}

.profile-toggle-btn:hover .avatar-circle {
  border-color: #ff1493;
}

.avatar-icon {
  width: 24px;
  height: 24px;
}

/* Arrow styling */
.arrow-icon {
  width: 20px;
  height: 20px;
  color: #333;
  transition: transform 0.3s;
}

.arrow-up {
  transform: rotate(180deg);
}

/* Dropdown menu styling */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 999;
  animation: fadeIn 0.2s ease;
}

/* User info section */
.user-info {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.email {
  font-size: 12px;
  color: #777;
  margin: 4px 0 0 0;
}

/* Menu items */
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-icon {
  width: 18px;
  height: 18px;
  color: #777;
}

.logout {
  color: #e53e3e;
}

.logout .menu-icon {
  color: #e53e3e;
}

/* Animation */
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
