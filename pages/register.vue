<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#app";

// Initialize router outside of any conditional blocks
const router = useRouter();
const config = useRuntimeConfig();

// State untuk input
const fullname = ref("");
const username = ref("");
const email = ref("");
const phone_number = ref("");
const address = ref("");
const password = ref("");
const confirmPassword = ref("");

// State untuk feedback
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const registerUser = async () => {
  // Reset messages
  errorMessage.value = "";
  successMessage.value = "";

  // Validasi sederhana
  if (
    !fullname.value ||
    !username.value ||
    !email.value ||
    !phone_number.value ||
    !address.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = "Semua field harus diisi!";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password dan konfirmasi password tidak cocok!";
    return;
  }

  isLoading.value = true;

  try {
    console.log(
      "Sending registration request to:",
      `${config.public.apiBaseUrl}/api/auth/register`
    );

    // Create the request body with the correct field name: confirmation_password instead of confirmPassword
    const requestBody = {
      fullname: fullname.value,
      email: email.value,
      phone_number: phone_number.value,
      username: username.value,
      password: password.value,
      confirmation_password: confirmPassword.value, // Changed from confirmPassword to confirmation_password
      address: address.value,
    };

    console.log("Request body:", JSON.stringify(requestBody));

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    console.log("Registration response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal");
    }

    successMessage.value = "Registrasi berhasil! Silakan login.";

    // Reset form fields
    fullname.value = "";
    username.value = "";
    email.value = "";
    phone_number.value = "";
    address.value = "";
    password.value = "";
    confirmPassword.value = "";

    // Redirect ke login setelah 2 detik
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    console.error("Registration error:", error);
    errorMessage.value =
      error.message || "Terjadi kesalahan saat registrasi. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthLayout>
    <template #form>
      <div class="w-full px-4 md:px-8 max-w-xl mx-auto py-6 md:py-0">
        <p
          class="text-3xl md:text-5xl font-semibold text-[#f6339a] mb-6 md:mb-10 text-center md:text-left"
        >
          Register
        </p>

        <!-- Feedback messages -->
        <div class="mb-4">
          <p
            v-if="errorMessage"
            class="text-red-500 text-sm md:text-base bg-red-50 p-3 rounded-lg"
          >
            {{ errorMessage }}
          </p>
          <p
            v-if="successMessage"
            class="text-green-500 text-sm md:text-base bg-green-50 p-3 rounded-lg"
          >
            {{ successMessage }}
          </p>
        </div>

        <input-box
          label="Full Name"
          v-model="fullname"
          type="text"
          placeholder="Enter your full name"
          class="w-full mb-3"
        ></input-box>

        <div
          class="flex flex-col md:flex-row w-full gap-y-3 md:gap-y-0 md:gap-x-4 mb-3"
        >
          <input-box
            label="Username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full md:w-1/2"
          ></input-box>
          <input-box
            label="Email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full md:w-1/2"
          ></input-box>
        </div>

        <input-box
          label="Phone Number"
          v-model="phone_number"
          type="text"
          placeholder="Enter your phone number"
          class="w-full mb-3"
        ></input-box>
        <input-box
          label="Address"
          v-model="address"
          type="text"
          placeholder="Enter your address"
          class="w-full mb-3"
        ></input-box>

        <input-box
          label="Password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full mb-3"
        ></input-box>
        <input-box
          label="Confirm Password"
          v-model="confirmPassword"
          type="password"
          placeholder="Enter your password confirmation"
          class="w-full mb-4"
        ></input-box>

        <button
          @click="registerUser"
          class="w-full bg-[#f6339a] text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base hover:bg-red-600 transition flex items-center justify-center"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isLoading ? "Processing..." : "Register" }}
        </button>

        <p class="mt-5 text-sm md:text-base text-center">
          Already have an account?
          <NuxtLink to="/login">
            <span class="text-[#f6339a] font-medium">Login</span>
          </NuxtLink>
        </p>
      </div>
    </template>

    <template #background-content>
      <div
        class="w-full h-full flex flex-col justify-start items-center relative"
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
          <p class="text-3xl md:text-6xl font-bold text-white">
            Hello, Welcome
          </p>
          <p class="text-base md:text-xl text-white mt-2 md:mt-5">
            Enter your Personal information to create your account
          </p>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>

<script>
definePageMeta({
  middleware: "guest", // Apply guest middleware to register page
});
</script>
