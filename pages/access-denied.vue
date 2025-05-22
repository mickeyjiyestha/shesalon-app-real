<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push("/");
};

const goLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <img
          src="~/assets/images/shesalon-logo.png"
          alt="She Salon Logo"
          class="h-16 mx-auto mb-4"
        />
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <div class="w-16 h-1 bg-pink-500 mx-auto mb-6"></div>
        <p class="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page. Please log in
          with the appropriate account or return to the homepage.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="goBack"
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
          <button
            @click="goHome"
            class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Home Page
          </button>
          <button
            @click="goLogin"
            class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
