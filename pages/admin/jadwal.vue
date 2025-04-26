<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-6">Jadwal Booking</h1>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <button class="text-gray-600">Today</button>
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

        <!-- Calendar Grid -->
        <div class="calendar-grid">
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
              }"
            >
              <div class="text-right mb-1">
                <span
                  class="text-sm"
                  :class="{
                    'text-gray-400': date.isOtherMonth,
                    'text-gray-800': !date.isOtherMonth,
                  }"
                >
                  {{ date.day }}
                </span>
              </div>

              <!-- Appointment Indicators -->
              <div
                v-if="date.appointments && date.appointments.length > 0"
                class="mt-1"
              >
                <div
                  v-for="(appt, apptIndex) in date.appointments"
                  :key="apptIndex"
                  class="text-xs p-1 rounded mb-1 truncate"
                  :class="getAppointmentClass(appt.type)"
                >
                  {{ appt.title }}
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
import { ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

// Current date state
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const viewMode = ref("month");

// Days of week
const daysOfWeek = ["MON", "TUE", "WED", "THE", "FRI", "SAT", "SUN"];

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

// Sample appointment data
const appointments = [
  { date: new Date(2025, 9, 3), title: "Puwur Appointment", type: "purple" },
  { date: new Date(2025, 9, 16), title: "Zahra Appointment", type: "pink" },
  { date: new Date(2025, 9, 23), title: "Erika appointment", type: "blue" },
  { date: new Date(2025, 9, 27), title: "Luna appointment", type: "orange" },
];

// Get appointments for a specific date
const getAppointmentsForDate = (date) => {
  return appointments.filter(
    (appt) =>
      appt.date.getDate() === date.getDate() &&
      appt.date.getMonth() === date.getMonth() &&
      appt.date.getFullYear() === date.getFullYear()
  );
};

// Get CSS class for appointment based on type
const getAppointmentClass = (type) => {
  switch (type) {
    case "purple":
      return "bg-purple-100 text-purple-800 border-l-4 border-purple-500";
    case "pink":
      return "bg-pink-100 text-pink-800 border-l-4 border-pink-500";
    case "blue":
      return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
    case "orange":
      return "bg-orange-100 text-orange-800 border-l-4 border-orange-500";
    default:
      return "bg-gray-100 text-gray-800";
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

// Set current month to October 2025 on mount
onMounted(() => {
  currentMonth.value = 9; // October (0-indexed)
  currentYear.value = 2025;
});
</script>

<style scoped>
.calendar-grid {
  width: 100%;
}
</style>
