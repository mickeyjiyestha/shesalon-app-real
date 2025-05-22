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

const registerUser = async () => {
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

  try {
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          fullname: fullname.value,
          email: email.value,
          phone_number: phone_number.value,
          username: username.value,
          password: password.value,
          confirmation_password: confirmPassword.value,
          address: address.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal");
    }

    successMessage.value = "Registrasi berhasil! Silakan login.";
    errorMessage.value = "";

    // Redirect ke login setelah 2 detik
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message;
  }
};

definePageMeta({
  middleware: "guest", // Apply guest middleware to register page
});
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
          <p v-if="errorMessage" class="text-red-500 text-sm md:text-base">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-green-500 text-sm md:text-base">
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
          class="w-full bg-[#f6339a] text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base hover:bg-red-600 transition"
        >
          Register
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
