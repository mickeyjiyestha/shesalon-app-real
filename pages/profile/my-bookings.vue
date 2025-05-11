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
      <div class="max-w-3xl mx-auto px-4 py-12">
        <h1 class="text-3xl font-medium text-gray-900 mb-8">My Bookings</h1>

        <div class="space-y-6">
          <div
            v-for="booking in bookings"
            :key="booking.id"
            class="bg-gray-50 rounded-2xl p-6"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-medium text-gray-900">
                  {{ booking.service }}
                </h3>
                <div class="mt-2 space-y-1">
                  <p class="text-gray-600">
                    {{ formatDate(booking.date) }} at {{ booking.time }}
                  </p>
                  <p class="text-gray-600">Stylist: {{ booking.stylist }}</p>
                  <p class="text-gray-600 font-medium">
                    Rp {{ formatPrice(booking.total) }}
                  </p>
                </div>
              </div>
              <div>
                <span
                  :class="[
                    'px-4 py-1 rounded-full text-sm font-medium',
                    getStatusClass(booking.status),
                  ]"
                >
                  {{ booking.status }}
                </span>
              </div>
            </div>

            <div class="mt-4 flex gap-4">
              <button
                v-if="booking.status === 'Pending'"
                @click="rescheduleBooking(booking.id)"
                class="text-pink-500 hover:text-pink-600 text-sm font-medium"
              >
                Reschedule
              </button>
              <button
                v-if="booking.status === 'Pending'"
                @click="cancelBooking(booking.id)"
                class="text-gray-500 hover:text-gray-600 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bookings = ref([
  {
    id: 1,
    service: "Haircut & Styling",
    date: "2024-04-15",
    time: "10:00",
    stylist: "Sarah Smith",
    status: "Completed",
    total: 250000,
  },
  {
    id: 2,
    service: "Hair Coloring",
    date: "2024-04-10",
    time: "14:30",
    stylist: "Mike Johnson",
    status: "Cancelled",
    total: 500000,
  },
  {
    id: 3,
    service: "Hair Treatment",
    date: "2024-04-20",
    time: "13:00",
    stylist: "Emma Davis",
    status: "Pending",
    total: 350000,
  },
]);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const rescheduleBooking = (id) => {
  // Implement reschedule logic here
  console.log("Rescheduling booking:", id);
};

const cancelBooking = (id) => {
  // Implement cancel logic here
  console.log("Cancelling booking:", id);
};
</script>
