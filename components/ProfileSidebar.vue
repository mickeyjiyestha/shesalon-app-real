<template>
  <div
    class="lg:w-64 bg-gray-50 border-b lg:border-r border-gray-200 p-4 lg:p-6"
  >
    <NuxtLink
      to="/"
      class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600 mb-4 lg:mb-8"
    >
      ← Back to Home
    </NuxtLink>

    <h2 class="text-lg font-medium text-gray-900 mb-4 lg:mb-6 px-4">
      Account Settings
    </h2>
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
</template>
