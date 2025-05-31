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

// State untuk modal
const showErrorModal = ref(false);
const showSuccessModal = ref(false);

const closeErrorModal = () => {
  showErrorModal.value = false;
  errorMessage.value = "";
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  successMessage.value = "";
  router.push("/login");
};

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
    showErrorModal.value = true;
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password dan konfirmasi password tidak cocok!";
    showErrorModal.value = true;
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
      errorMessage.value = data.message || "Registrasi gagal";
      showErrorModal.value = true;
      return;
    }

    successMessage.value = "Registrasi berhasil! Silakan login.";
    showSuccessModal.value = true;

    // Reset form fields
    fullname.value = "";
    username.value = "";
    email.value = "";
    phone_number.value = "";
    address.value = "";
    password.value = "";
    confirmPassword.value = "";
  } catch (error) {
    console.error("Registration error:", error);
    errorMessage.value =
      error.message || "Terjadi kesalahan saat registrasi. Silakan coba lagi.";
    showErrorModal.value = true;
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
        @click="closeErrorModal"
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
                      Registrasi Gagal
                    </h3>
                    <p class="text-white/80 text-sm">Terjadi kesalahan</p>
                  </div>
                </div>
                <button
                  @click="closeErrorModal"
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
                    @click="closeErrorModal"
                    class="flex-1 px-4 py-2 bg-gradient-to-r from-[#f6339a] to-[#ff5757] text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Coba Lagi
                  </button>
                  <button
                    @click="closeErrorModal"
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

  <!-- Success Modal -->
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
        v-if="showSuccessModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeSuccessModal"
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
            v-if="showSuccessModal"
            class="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            @click.stop
          >
            <!-- Header dengan gradient -->
            <div
              class="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4"
            >
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">
                      Registrasi Berhasil
                    </h3>
                    <p class="text-white/80 text-sm">Selamat!</p>
                  </div>
                </div>
                <button
                  @click="closeSuccessModal"
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
                  class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 text-base leading-relaxed mb-6">
                  {{ successMessage }}
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="closeSuccessModal"
                    class="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Lanjut ke Login
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

<script>
definePageMeta({
  middleware: "guest", // Apply guest middleware to register page
});
</script>

<style scoped>
/* Additional custom styles if needed */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
