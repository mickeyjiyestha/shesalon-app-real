<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Mobile Sidebar Toggle -->
    <div class="md:hidden p-2 bg-white border-b border-gray-200">
      <button @click="toggleSidebar" class="p-2 text-gray-500">
        <Bars3Icon class="w-6 h-6" />
      </button>
    </div>

    <!-- Sidebar - hidden on mobile by default -->
    <AdminSidebar
      :class="{ 'hidden md:block': !sidebarOpen, block: sidebarOpen }"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="p-4 md:p-8 overflow-auto">
        <div
          class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
        >
          <div class="flex items-center gap-3">
            <h1 class="text-2xl md:text-[28px] font-bold text-gray-900">
              Bookings
            </h1>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-gray-600">
                <LinkIcon class="w-5 h-5" />
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <EyeIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm"
            >
              Share
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600">
              <Squares2X2Icon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-10">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="bg-red-50 p-4 rounded-lg text-red-600 mb-6"
        >
          {{ error }}
        </div>

        <template v-else>
          <!-- Filter Section -->
          <div class="bg-white rounded-2xl shadow-sm mb-6">
            <div
              class="flex flex-col md:flex-row items-start md:items-center p-4 gap-4"
            >
              <div class="flex items-center gap-2 min-w-[100px]">
                <FunnelIcon class="w-5 h-5 text-gray-400" />
                <span class="text-sm font-medium">Filter By</span>
              </div>
              <div class="flex flex-wrap items-center gap-3 flex-1 w-full">
                <select
                  v-model="filters.date"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Dates</option>
                  <option value="May">May 2025</option>
                  <option value="Jun">June 2025</option>
                  <option value="Jul">July 2024</option>
                  <option value="Aug">August 2025</option>
                </select>
                <select
                  v-model="filters.status"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                </select>
                <button
                  @click="resetFilters"
                  class="flex items-center gap-2 text-pink-500 font-medium text-sm"
                >
                  <ArrowPathIcon class="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Booking Table for Desktop -->
          <div
            class="bg-white rounded-2xl shadow-sm overflow-hidden hidden md:block"
          >
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-100">
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CUSTOMER
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    DATE
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    START TIME
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    END TIME
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SERVICES
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="booking in filteredBookings"
                  :key="booking.id"
                  class="hover:bg-gray-50"
                >
                  <td class="py-4 px-6 text-sm font-medium text-gray-900">
                    {{ booking.id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-900">
                    {{ booking.customer }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ booking.date }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ booking.start_time }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ booking.end_time }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ booking.services }}
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                      :class="{
                        'bg-green-100 text-green-600':
                          booking.status === 'confirmed',
                        'bg-yellow-100 text-yellow-600':
                          booking.status === 'pending',
                      }"
                    >
                      {{ booking.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Booking Cards for Mobile -->
          <div class="md:hidden space-y-4">
            <div
              v-for="booking in filteredBookings"
              :key="booking.id"
              class="bg-white rounded-2xl shadow-sm p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ booking.customer }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ booking.id }}</p>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                  :class="{
                    'bg-green-100 text-green-600':
                      booking.status === 'confirmed',
                    'bg-yellow-100 text-yellow-600':
                      booking.status === 'pending',
                  }"
                >
                  {{ booking.status }}
                </span>
              </div>
              <div class="flex flex-col gap-1 mb-3">
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Date:</span> {{ booking.date }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Time:</span>
                  {{ booking.start_time }} - {{ booking.end_time }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Services:</span>
                  {{ booking.services }}
                </p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-center">
            <nav class="flex items-center gap-2">
              <button
                v-for="page in pagination.totalPages"
                :key="page"
                @click="currentPage = page"
                class="px-3 py-1 rounded"
                :class="{
                  'bg-pink-500 text-white': currentPage === page,
                  'bg-gray-100 text-gray-600': currentPage !== page,
                }"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Cookies from "js-cookie";
import {
  Bars3Icon,
  LinkIcon,
  EyeIcon,
  Squares2X2Icon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";

// State variables
const bookings = ref([]);
const sidebarOpen = ref(false);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
});

const filters = ref({
  date: "",
  status: "",
});

// Toggle sidebar on mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Fetch bookings from API
const fetchBookings = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/bookings?page=${
        currentPage.value
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const data = await response.json();
    bookings.value = data.bookings;
    pagination.value = data.pagination;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error.value = err.message || "An error occurred while fetching bookings";
  } finally {
    loading.value = false;
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    date: "",
    status: "",
  };
};

// Computed property for filtered bookings
const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    // Filter by date (month)
    if (filters.value.date && !booking.date.includes(filters.value.date)) {
      return false;
    }

    // Filter by status
    if (filters.value.status && booking.status !== filters.value.status) {
      return false;
    }

    return true;
  });
});

// Watch for page changes
watch(currentPage, () => {
  fetchBookings();
});

// Fetch data when component mounts
onMounted(() => {
  fetchBookings();
});
</script>
