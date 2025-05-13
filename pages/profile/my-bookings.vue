<template>
  <ProfileLayout>
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <span
          class="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
          >My Bookings</span
        >
        <div
          class="h-px flex-1 bg-gradient-to-r from-pink-100 to-transparent"
        ></div>
      </h1>

      <!-- Booking filters -->
      <div class="mb-8 flex flex-wrap gap-3">
        <button
          v-for="status in ['All', 'Pending', 'Completed', 'Cancelled']"
          :key="status"
          @click="activeFilter = status"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :class="
            activeFilter === status
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          {{ status }}
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredBookings.length === 0"
        class="bg-gray-50 rounded-2xl p-12 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-pink-500"
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
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">
          No bookings found
        </h3>
        <p class="text-gray-500 mb-6">
          You don't have any
          {{
            activeFilter !== "All" ? activeFilter.toLowerCase() : ""
          }}
          bookings yet.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-md"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Book a Service</span>
        </NuxtLink>
      </div>

      <!-- Bookings list -->
      <div v-else class="space-y-6">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          <div class="p-6">
            <div
              class="flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <div
                    class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">
                    {{ booking.service }}
                  </h3>
                </div>
                <div class="space-y-1 ml-13">
                  <p class="text-gray-600 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                    <span>{{ formatDate(booking.date) }}</span>
                  </p>
                  <p class="text-gray-600 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{ booking.time }}</span>
                  </p>
                  <p class="text-gray-600 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                    <span>Stylist: {{ booking.stylist }}</span>
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-3">
                <span
                  :class="[
                    'px-4 py-1 rounded-full text-sm font-medium',
                    getStatusClass(booking.status),
                  ]"
                >
                  {{ booking.status }}
                </span>
                <p class="text-gray-900 font-bold">
                  Rp {{ formatPrice(booking.total) }}
                </p>
              </div>
            </div>

            <div
              class="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3"
            >
              <button
                v-if="booking.status === 'Pending'"
                @click="rescheduleBooking(booking.id)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-pink-200 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors duration-300 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
                Reschedule
              </button>
              <button
                v-if="booking.status === 'Pending'"
                @click="cancelBooking(booking.id)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
              <button
                v-if="booking.status === 'Completed'"
                @click="leaveReview(booking.id)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-yellow-200 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors duration-300 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Leave Review
              </button>
              <button
                @click="viewDetails(booking.id)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm font-medium ml-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, computed } from "vue";

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

const activeFilter = ref("All");

const filteredBookings = computed(() => {
  if (activeFilter.value === "All") {
    return bookings.value;
  }
  return bookings.value.filter(
    (booking) => booking.status === activeFilter.value
  );
});

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

const leaveReview = (id) => {
  // Implement review logic here
  console.log("Leaving review for booking:", id);
};

const viewDetails = (id) => {
  // Implement view details logic here
  console.log("Viewing details for booking:", id);
};
</script>
