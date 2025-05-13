<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-pink-50">
    <!-- Header with decorative elements -->
    <div class="relative overflow-hidden">
      <div
        class="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-br from-pink-200/30 to-pink-300/20 rounded-bl-full transform -translate-y-1/4 translate-x-1/4 blur-3xl"
      ></div>
      <div
        class="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-pink-300/20 to-pink-400/10 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Back to home link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors duration-300 mb-8 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span class="font-medium">Back to Home</span>
      </NuxtLink>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <div class="w-full md:w-64 shrink-0">
          <div
            class="bg-white rounded-2xl shadow-lg shadow-pink-100/50 overflow-hidden"
          >
            <div class="p-6 bg-gradient-to-br from-pink-500 to-pink-600">
              <h2 class="text-xl font-bold text-white">Account Settings</h2>
            </div>
            <nav class="p-4">
              <NuxtLink
                to="/profile"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 mb-2"
                :class="{
                  'bg-pink-50 text-pink-600 font-medium':
                    $route.path === '/profile',
                }"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </NuxtLink>
              <NuxtLink
                to="/profile/change-password"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 mb-2"
                :class="{
                  'bg-pink-50 text-pink-600 font-medium':
                    $route.path === '/profile/change-password',
                }"
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
                <span>Change Password</span>
              </NuxtLink>
              <NuxtLink
                to="/profile/my-bookings"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300"
                :class="{
                  'bg-pink-50 text-pink-600 font-medium':
                    $route.path === '/profile/my-bookings',
                }"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>My Bookings</span>
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <div class="bg-white rounded-2xl shadow-lg shadow-pink-100/50 p-8">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
