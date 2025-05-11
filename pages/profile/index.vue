<template>
  <div class="min-h-screen bg-white flex">
    <!-- Sidebar -->
    <div class="w-48 bg-gray-50 border-r border-gray-200 p-4">
      <NuxtLink
        to="/"
        class="block px-3 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600 mb-6"
      >
        ← Back to Home
      </NuxtLink>

      <h2 class="text-lg font-medium text-gray-900 mb-4 px-3">
        Account Settings
      </h2>
      <nav class="space-y-1">
        <NuxtLink
          to="/profile"
          class="block px-3 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{ 'bg-pink-50 text-pink-600': $route.path === '/profile' }"
        >
          Profile
        </NuxtLink>
        <NuxtLink
          to="/profile/change-password"
          class="block px-3 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{
            'bg-pink-50 text-pink-600':
              $route.path === '/profile/change-password',
          }"
        >
          Change Password
        </NuxtLink>
        <NuxtLink
          to="/profile/my-bookings"
          class="block px-3 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{
            'bg-pink-50 text-pink-600': $route.path === '/profile/my-bookings',
          }"
        >
          My Bookings
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <div class="max-w-7xl mx-auto px-2 py-12">
        <h1 class="text-3xl font-medium text-gray-900 mb-8">Profile</h1>

        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"
          ></div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="error"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8"
        >
          {{ error }}
        </div>

        <!-- Profile content -->
        <div v-else class="mb-8">
          <div class="flex items-center gap-6 mb-12">
            <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://via.placeholder.com/96"
                alt="Profile picture"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-xl font-medium text-gray-900">
                {{ profile.fullname }}
              </h2>
              <p class="text-gray-500">{{ profile.role }}</p>
            </div>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Full Name</label
                >
                <input
                  v-model="profile.fullname"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Username</label
                >
                <input
                  v-model="profile.username"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone Number</label
                >
                <input
                  v-model="profile.phone_number"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Address</label
                >
                <input
                  v-model="profile.address"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button
                type="submit"
                class="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCookie } from "nuxt/app";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const profile = ref({
  id: null,
  fullname: "",
  username: "",
  email: "",
  phone_number: "",
  address: "",
  role: "",
});

const loading = ref(true);
const error = ref(null);

// Fungsi untuk mengambil data profil dari API
const fetchProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Mendapatkan token dari cookie
    const token = useCookie("token").value;

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const data = await response.json();
    // Update profile data dengan response dari API
    profile.value = data;
    console.log("Profile data loaded:", data);
  } catch (err) {
    console.error("Error fetching profile:", err);
    error.value = err.message || "Failed to load profile data";
  } finally {
    loading.value = false;
  }
};

// Fungsi untuk menyimpan perubahan pada profil
const saveProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = useCookie("token").value;

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/profile/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: profile.value.fullname,
        username: profile.value.username,
        email: profile.value.email,
        phone_number: profile.value.phone_number,
        address: profile.value.address,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    // Menampilkan pesan sukses
    alert("Profile updated successfully");
  } catch (err) {
    console.error("Error updating profile:", err);
    error.value = err.message || "Failed to update profile";
  } finally {
    loading.value = false;
  }
};

// Ambil data profil saat komponen dimuat
onMounted(() => {
  fetchProfile();
});
</script>
