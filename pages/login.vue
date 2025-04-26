<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import js-cookie
const username = ref("");
const password = ref("");
const router = useRouter();
const login = async () => {
  try {
    console.log("Login Data:", {
      username: username.value,
      password: password.value,
    });
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }
    );
    const result = await response.json();
    console.log("Response API:", result);
    if (!response.ok) {
      throw new Error(result.message || "Login failed!");
    }
    Cookies.set("token", result.token, { expires: 1 });
    alert("Login successful!");
    router.push("/");
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
          class="text-3xl md:text-5xl font-semibold text-[#f6339a] mb-8 md:mb-16 text-center md:text-left"
        >
          Login
        </p>
        <InputBox
          label="Username"
          v-model="username"
          :type="'text'"
          :placeholder="'Enter your username'"
          class="mb-4"
        ></InputBox>
        <InputBox
          label="Password"
          v-model="password"
          :type="'password'"
          :placeholder="'Enter your password'"
          class="mb-6"
        ></InputBox>
        <Button class="cursor-pointer w-full" buttonText="Login" @click="login">
        </Button>
        <p class="mt-5 text-center">
          Don't have an account?
          <NuxtLink to="/register">
            <span class="text-[#f6339a] font-medium">Sign Up</span>
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
          <p class="text-3xl md:text-6xl font-bold text-white">Welcome Back!</p>
          <p class="text-base md:text-xl text-white mt-2 md:mt-5">
            Enter your credentials to access your account
          </p>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
