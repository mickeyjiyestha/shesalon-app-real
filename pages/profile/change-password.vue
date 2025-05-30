<template>
  <ProfileLayout>
    <div>
      <h1
        class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-3"
      >
        <span
          class="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
          >Change Password</span
        >
        <div
          class="h-px flex-1 bg-gradient-to-r from-pink-100 to-transparent"
        ></div>
      </h1>

      <div class="max-w-full sm:max-w-xl mx-auto px-4 sm:px-0">
        <div
          class="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-pink-100"
        >
          <div
            class="mb-4 sm:mb-6 flex items-start sm:items-center gap-3 text-pink-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-xs sm:text-sm">
              For security reasons, please use a strong password that you don't
              use elsewhere.
            </p>
          </div>

          <form @submit.prevent="changePassword" class="space-y-4 sm:space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Current Password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your current password"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >New Password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your new password"
                />
              </div>
              <div class="mt-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="passwordStrengthClass"
                    :style="{ width: `${passwordStrength}%` }"
                  ></div>
                </div>
                <p class="text-xs mt-1" :class="passwordStrengthTextClass">
                  {{ passwordStrengthText }}
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Confirm New Password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  class="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Confirm your new password"
                />
              </div>
              <p
                v-if="passwordsMatch === false"
                class="text-red-500 text-xs mt-1"
              >
                Passwords do not match
              </p>
            </div>

            <div class="flex justify-end pt-4">
              <button
                type="submit"
                class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                :disabled="!isFormValid || loading"
              >
                <svg
                  v-if="loading"
                  class="animate-spin h-5 w-5 text-white"
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
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ loading ? "Updating..." : "Update Password" }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const loading = ref(false);
const passwordsMatch = ref(null);

// Watch for password match
watch(
  () => [passwordForm.value.newPassword, passwordForm.value.confirmPassword],
  ([newPw, confirmPw]) => {
    if (confirmPw === "") {
      passwordsMatch.value = null;
      return;
    }

    passwordsMatch.value = newPw === confirmPw;
  },
  { immediate: true }
);

// Password strength calculation
const passwordStrength = computed(() => {
  const password = passwordForm.value.newPassword;
  if (!password) return 0;

  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 25;

  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 25;

  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 25;

  // Contains number or special char
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

  return strength;
});

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return "bg-red-500";
  if (strength < 50) return "bg-orange-500";
  if (strength < 75) return "bg-yellow-500";
  return "bg-green-500";
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength === 0) return "";
  if (strength < 25) return "Very Weak";
  if (strength < 50) return "Weak";
  if (strength < 75) return "Medium";
  if (strength < 100) return "Strong";
  return "Very Strong";
});

const passwordStrengthTextClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return "text-red-500";
  if (strength < 50) return "text-orange-500";
  if (strength < 75) return "text-yellow-500";
  return "text-green-500";
});

const isFormValid = computed(() => {
  return (
    passwordForm.value.currentPassword.length > 0 &&
    passwordForm.value.newPassword.length >= 8 &&
    passwordsMatch.value === true
  );
});

const changePassword = async () => {
  // Implement password change logic here
  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Changing password:", passwordForm.value);

    // Show success message
    alert("Password changed successfully!");

    // Reset form
    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  } catch (error) {
    console.error("Error changing password:", error);
  } finally {
    loading.value = false;
  }
};
</script>
