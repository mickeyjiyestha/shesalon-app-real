<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import js-cookie
const username = ref("");
const password = ref("");
const config = useRuntimeConfig();
console.log(config.public.apiBaseUrl);
const router = useRouter();
const login = async () => {
  try {
    console.log("Login Data:", {
      username: username.value,
      password: password.value,
    });
    const response = await fetch(`${config.public.apiBaseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const result = await response.json();
    console.log("Response API:", result);
    if (!response.ok) {
      throw new Error(result.message || "Login failed!");
    }

    // Simpan token dan data user ke cookies
    Cookies.set("token", result.token, { expires: 1 });
    Cookies.set("user", JSON.stringify(result.user), { expires: 1 });

    // Arahkan ke halaman yang sesuai berdasarkan role
    if (result.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Error login:", error);
    alert(error.message || "An error occurred while login");
  }
};
</script>
<template>
  <AuthLayout>
    <template #form>
      <div class="w-full max-w-md px-4 md:px-8">
        <p
          class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#f6339a] to-[#ff5757] bg-clip-text text-transparent mb-8 md:mb-12 text-center md:text-left"
        >
          Login
        </p>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Username</label
            >
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f6339a] focus:border-transparent focus:outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f6339a] focus:border-transparent focus:outline-none transition-all duration-200"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 text-[#f6339a] focus:ring-[#f6339a] border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700"
                >Remember me</label
              >
            </div>
            <a
              href="#"
              class="text-sm font-medium text-[#f6339a] hover:text-[#e02d8a]"
              >Forgot password?</a
            >
          </div>
        </div>

        <button
          @click="login"
          class="group relative inline-flex items-center justify-center w-full px-6 py-3 mt-8 overflow-hidden rounded-xl bg-[#f6339a] text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span
            class="absolute w-0 h-full bg-[#e02d8a] top-0 left-0 transition-all duration-300 group-hover:w-full"
          ></span>
          <span class="relative flex items-center justify-center gap-2">
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <p class="mt-6 text-center">
          Don't have an account?
          <NuxtLink to="/register">
            <span
              class="text-[#f6339a] font-medium hover:text-[#e02d8a] transition-colors duration-200"
              >Sign Up</span
            >
          </NuxtLink>
        </p>
      </div>
    </template>
    <template #background-content>
      <div
        class="w-full h-full flex flex-col justify-start items-center relative z-10"
      >
        <!-- Logo di pojok kiri atas -->
        <div class="absolute top-4 left-4 z-10">
          <img
            class="h-8 md:h-12"
            src="~/assets/images/shesalon-logo.png"
            alt="She Salon Logo"
          />
        </div>
        <!-- Welcome message di tengah -->
        <div
          class="text-center px-4 mt-20 md:mt-0 md:flex md:flex-col md:justify-center md:h-full"
        >
          <p class="text-3xl md:text-6xl font-bold text-white mb-4">
            Welcome Back!
          </p>
          <p class="text-base md:text-xl text-white/90">
            Enter your credentials to access your account
          </p>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
