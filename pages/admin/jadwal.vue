<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-6">Jadwal Booking</h1>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <button
            class="text-gray-600"
            @click="
              currentMonth = today.getMonth();
              currentYear = today.getFullYear();
            "
          >
            Today
          </button>
          <div class="flex items-center gap-4">
            <button class="text-gray-600" @click="navigateMonth(-1)">
              <ChevronLeftIcon class="w-5 h-5" />
            </button>
            <h2 class="text-lg font-medium">{{ monthYear }}</h2>
            <button class="text-gray-600" @click="navigateMonth(1)">
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </div>
          <div class="flex bg-gray-100 rounded-lg">
            <button
              class="px-3 py-1 text-sm"
              :class="{
                'bg-pink-500 text-white rounded-lg': viewMode === 'day',
              }"
              @click="viewMode = 'day'"
            >
              Day
            </button>
            <button
              class="px-3 py-1 text-sm"
              :class="{
                'bg-pink-500 text-white rounded-lg': viewMode === 'week',
              }"
              @click="viewMode = 'week'"
            >
              Week
            </button>
            <button
              class="px-3 py-1 text-sm"
              :class="{
                'bg-pink-500 text-white rounded-lg': viewMode === 'month',
              }"
              @click="viewMode = 'month'"
            >
              Month
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="bg-red-50 text-red-600 p-4 rounded-lg text-center"
        >
          <p>{{ error }}</p>
          <button
            @click="fetchBookings"
            class="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>

        <!-- Calendar Grid -->
        <div v-else class="calendar-grid">
          <!-- Days of Week -->
          <div class="grid grid-cols-7 border-b border-gray-100">
            <div
              v-for="day in daysOfWeek"
              :key="day"
              class="text-center py-2 text-sm font-medium text-gray-700"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Dates -->
          <div class="grid grid-cols-7">
            <div
              v-for="(date, index) in calendarDates"
              :key="index"
              class="aspect-square border-b border-r border-gray-100 p-1 relative"
              :class="{
                'bg-gray-50': date.isOtherMonth,
                'bg-white': !date.isOtherMonth,
                'bg-pink-50': date.isToday,
              }"
            >
              <div class="text-right mb-1">
                <span
                  class="text-sm"
                  :class="{
                    'text-gray-400': date.isOtherMonth,
                    'text-gray-800': !date.isOtherMonth,
                    'font-bold': date.isToday,
                  }"
                >
                  {{ date.day }}
                </span>
              </div>

              <!-- Appointment Indicators -->
              <div
                v-if="date.appointments && date.appointments.length > 0"
                class="mt-1 space-y-1 overflow-y-auto max-h-[80%]"
              >
                <div
                  v-for="(appt, apptIndex) in date.appointments"
                  :key="apptIndex"
                  class="text-xs p-1 rounded truncate"
                  :class="getAppointmentClass(appt.type)"
                >
                  <div class="font-medium">{{ appt.title }}</div>
                  <div class="text-[10px] opacity-80">{{ appt.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Cookies from "js-cookie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

// Current date state
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const viewMode = ref("month");
const config = useRuntimeConfig();
const currentPage = ref(1);
const token = Cookies.get("token");
// API data states
const bookings = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Days of week
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Formatted month and year
const monthYear = computed(() => {
  const options = { month: "long", year: "numeric" };
  return new Date(currentYear.value, currentMonth.value).toLocaleDateString(
    "en-US",
    options
  );
});

// Navigate through months
const navigateMonth = (direction) => {
  let newMonth = currentMonth.value + direction;

  if (newMonth < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else if (newMonth > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value = newMonth;
  }
};

// Get days in month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year, month) => {
  let day = new Date(year, month, 1).getDay();
  // Convert from Sunday-based (0) to Monday-based (0)
  return day === 0 ? 6 : day - 1;
};

// Fetch bookings from API
const fetchBookings = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/bookings?page=${currentPage.value}`,
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
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    bookings.value = data.bookings;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Parse date string from API (format: "31 May 2025")
const parseBookingDate = (dateStr) => {
  const [day, month, year] = dateStr.split(" ");
  const monthIndex = new Date(Date.parse(`${month} 1, 2000`)).getMonth();
  return new Date(parseInt(year), monthIndex, parseInt(day));
};

// Get appointments for a specific date
const getAppointmentsForDate = (date) => {
  if (!bookings.value || bookings.value.length === 0) return [];

  return bookings.value
    .filter((booking) => {
      const bookingDate = parseBookingDate(booking.date);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    })
    .map((booking) => ({
      id: booking.id,
      title: `${booking.customer} - ${booking.services}`,
      time: `${booking.start_time}-${booking.end_time}`,
      type: getBookingTypeByStatus(booking.status),
      status: booking.status,
    }));
};

// Get CSS class for appointment based on status
const getAppointmentClass = (type) => {
  switch (type) {
    case "confirmed":
      return "bg-green-100 text-green-800 border-l-4 border-green-500";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
    case "cancelled":
      return "bg-red-100 text-red-800 border-l-4 border-red-500";
    case "completed":
      return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
    default:
      return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
  }
};

// Map booking status to type for styling
const getBookingTypeByStatus = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "confirmed";
    case "pending":
      return "pending";
    case "cancelled":
      return "cancelled";
    case "completed":
      return "completed";
    default:
      return "pending";
  }
};

// Generate calendar dates
const calendarDates = computed(() => {
  const dates = [];
  const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value);
  const firstDayOfMonth = getFirstDayOfMonth(
    currentYear.value,
    currentMonth.value
  );

  // Previous month days
  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear =
    currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = daysInPrevMonth - firstDayOfMonth + i + 1;
    const date = new Date(prevYear, prevMonth, day);
    dates.push({
      day,
      date,
      isOtherMonth: true,
      appointments: getAppointmentsForDate(date),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    dates.push({
      day: i,
      date,
      isOtherMonth: false,
      isToday:
        i === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear(),
      appointments: getAppointmentsForDate(date),
    });
  }

  // Next month days
  const remainingDays = 42 - dates.length; // 6 rows * 7 days = 42
  const nextMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
  const nextYear =
    currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(nextYear, nextMonth, i);
    dates.push({
      day: i,
      date,
      isOtherMonth: true,
      appointments: getAppointmentsForDate(date),
    });
  }

  return dates;
});

// Watch for month/year changes to update the view
watch([currentMonth, currentYear], () => {
  // If we wanted to fetch only the current month's data, we could do it here
  // For simplicity, we're using the same data for all months
});

// Set current month and fetch data on mount
onMounted(() => {
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  fetchBookings();
});
</script>

<style scoped>
.calendar-grid {
  width: 100%;
}
</style>
