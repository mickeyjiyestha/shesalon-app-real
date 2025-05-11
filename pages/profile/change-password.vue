<template>
  <div class="min-h-screen bg-white flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <NuxtLink
        to="/"
        class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600 mb-8"
      >
        ← Back to Home
      </NuxtLink>

      <h2 class="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
      <nav class="space-y-2">
        <NuxtLink
          to="/profile"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{ 'bg-pink-50 text-pink-600': $route.path === '/profile' }"
        >
          Profile
        </NuxtLink>
        <NuxtLink
          to="/profile/change-password"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{
            'bg-pink-50 text-pink-600':
              $route.path === '/profile/change-password',
          }"
        >
          Change Password
        </NuxtLink>
        <NuxtLink
          to="/profile/my-bookings"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
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
      <div class="max-w-md mx-auto px-4 py-12">
        <h1 class="text-3xl font-medium text-gray-900 mb-8">Change Password</h1>

        <div class="bg-gray-50 rounded-2xl p-8">
          <form @submit.prevent="changePassword" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Current Password</label
              >
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >New Password</label
              >
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Confirm New Password</label
              >
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const changePassword = () => {
  // Implement password change logic here
  console.log("Changing password:", passwordForm.value);
};
</script>
