<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";
import { definePageMeta } from "#imports";

const username = ref("");
const password = ref("");
const showErrorModal = ref(false);
const errorMessage = ref("");
const config = useRuntimeConfig();
const router = useRouter();

const closeModal = () => {
  showErrorModal.value = false;
  errorMessage.value = "";
};

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
      errorMessage.value = result.message || "Username atau password salah!";
      showErrorModal.value = true;
      return;
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
    errorMessage.value =
      error.message || "Terjadi kesalahan saat login. Silakan coba lagi.";
    showErrorModal.value = true;
  }
};

definePageMeta({
  middleware: "guest",
});
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
              @keyup.enter="login"
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

  <!-- Error Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showErrorModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="showErrorModal"
            class="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            @click.stop
          >
            <!-- Header dengan gradient -->
            <div class="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">
                      Login Gagal
                    </h3>
                    <p class="text-white/80 text-sm">Terjadi kesalahan</p>
                  </div>
                </div>
                <button
                  @click="closeModal"
                  class="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="px-6 py-6">
              <div class="text-center">
                <div
                  class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 text-base leading-relaxed mb-6">
                  {{ errorMessage }}
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="closeModal"
                    class="flex-1 px-4 py-2 bg-gradient-to-r from-[#f6339a] to-[#ff5757] text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Coba Lagi
                  </button>
                  <button
                    @click="closeModal"
                    class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div
              class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"
            ></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Additional custom styles if needed */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
