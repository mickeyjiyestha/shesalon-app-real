<template>
  <ProfileLayout>
    <div class="overflow-x-hidden">
      <h1
        class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-3"
      >
        <span
          class="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
          >My Bookings</span
        >
        <div
          class="h-px flex-1 bg-gradient-to-r from-pink-100 to-transparent"
        ></div>
      </h1>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-0 flex items-center justify-center text-pink-500 font-medium"
          >
            <span class="animate-pulse">Loading</span>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8 animate-fade-in"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>

      <div v-else>
        <!-- Booking filters -->
        <div class="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
          <button
            v-for="status in [
              'All',
              'pending',
              'confirmed',
              'completed',
              'cancelled',
            ]"
            :key="status"
            @click="activeFilter = status"
            class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            :class="
              activeFilter === status
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-if="filteredBookings.length === 0"
          class="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 text-center"
        >
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 sm:h-10 sm:w-10 text-pink-500"
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
            {{ activeFilter !== "All" ? activeFilter.toLowerCase() : "" }}
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
            <div class="p-4 sm:p-6">
              <div
                class="flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0"
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
                    <div>
                      <h3
                        class="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight"
                      >
                        {{ booking.layanan_names }}
                      </h3>
                      <p class="text-xs sm:text-sm text-gray-500">
                        #{{ booking.booking_number }}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-1 ml-0 sm:ml-13 mt-3">
                    <p
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
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
                      <span>{{ formatDate(booking.tanggal) }}</span>
                    </p>
                    <p
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
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
                      <span
                        >{{ formatTime(booking.jam_mulai) }} -
                        {{ formatTime(booking.jam_selesai) }}</span
                      >
                    </p>
                    <p
                      v-if="booking.special_request"
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
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
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      <span>{{ booking.special_request }}</span>
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
                    {{
                      booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)
                    }}
                  </span>
                  <p class="text-gray-900 font-bold">
                    Rp {{ formatPrice(booking.total_harga) }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Booked on {{ formatDateShort(booking.created_at) }}
                  </p>
                </div>
              </div>

              <div
                class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 flex flex-wrap gap-2 sm:gap-3"
              >
                <button
                  v-if="
                    booking.status === 'pending' ||
                    booking.status === 'confirmed'
                  "
                  @click="rescheduleBooking(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-pink-200 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors duration-300 text-xs sm:text-sm font-medium"
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
                  v-if="
                    booking.status === 'pending' ||
                    booking.status === 'confirmed'
                  "
                  @click="cancelBooking(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-xs sm:text-sm font-medium"
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
                  v-if="booking.status === 'completed'"
                  @click="leaveReview(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-yellow-200 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors duration-300 text-xs sm:text-sm font-medium"
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
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-xs sm:text-sm font-medium ml-auto"
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
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const bookings = ref([]);
const loading = ref(true);
const error = ref(null);
const activeFilter = ref("All");

// Fetch bookings from API
const fetchBookings = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${config.public.apiBaseUrl}/api/booking`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch booking data");
    }

    const data = await response.json();
    bookings.value = data.bookings || [];
    console.log("Booking data loaded:", bookings.value);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error.value = err.message || "Failed to load booking data";
  } finally {
    loading.value = false;
  }
};

// Filter bookings based on selected status
const filteredBookings = computed(() => {
  if (activeFilter.value === "All") {
    return bookings.value;
  }
  return bookings.value.filter(
    (booking) =>
      booking.status.toLowerCase() === activeFilter.value.toLowerCase()
  );
});

// Format date to Indonesian locale
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

// Format date to short format
const formatDateShort = (dateStr) => {
  if (!dateStr) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

// Format time (HH:MM:SS to HH:MM)
const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    return `${parts[0]}:${parts[1]}`;
  }
  return timeStr;
};

// Format price with thousand separator
const formatPrice = (price) => {
  if (!price) return "0";
  return new Intl.NumberFormat("id-ID").format(parseFloat(price));
};

// Get CSS class for status badge
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Reschedule booking
const rescheduleBooking = async (id) => {
  // This would typically open a modal or navigate to a reschedule page
  alert(
    `Reschedule functionality for booking #${id} would be implemented here`
  );
};

// Cancel booking
const cancelBooking = async (id) => {
  if (!confirm("Are you sure you want to cancel this booking?")) {
    return;
  }

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/booking/${id}/cancel`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to cancel booking");
    }

    // Refresh booking data
    await fetchBookings();
    alert("Booking cancelled successfully");
  } catch (err) {
    console.error("Error cancelling booking:", err);
    alert(err.message || "Failed to cancel booking");
  }
};

// Leave review
const leaveReview = (id) => {
  // This would typically open a review form modal
  alert(`Review form for booking #${id} would be implemented here`);
};

// View booking details
const viewDetails = (id) => {
  // This would typically navigate to a booking details page
  alert(`Details page for booking #${id} would be implemented here`);
};

// Fetch bookings when component is mounted
onMounted(() => {
  fetchBookings();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
