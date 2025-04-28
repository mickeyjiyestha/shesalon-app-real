<template>
  <div
    class="flex flex-col md:flex-row h-screen bg-gray-50"
    style="font-family: 'Inter', sans-serif"
  >
    <!-- Mobile Sidebar Toggle -->
    <div class="md:hidden p-2 bg-white border-b border-gray-200">
      <button @click="toggleSidebar" class="p-2 text-gray-500">
        <Bars3Icon class="w-6 h-6" />
      </button>
    </div>

    <!-- Sidebar - hidden on mobile by default -->
    <AdminSidebar
      :class="{ 'hidden md:block': !sidebarOpen, block: sidebarOpen }"
      @close="sidebarOpen = false"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="p-4 md:p-6 overflow-auto">
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
          <div
            class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
          >
            <div class="flex items-center gap-2">
              <h1 class="text-xl md:text-2xl font-bold">
                {{ dashboardData.title }}
              </h1>
              <div class="flex gap-2">
                <button class="text-gray-400">
                  <LinkIcon class="w-5 h-5" />
                </button>
                <button class="text-gray-400">
                  <EyeIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 md:gap-3">
              <button
                class="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm"
              >
                <FunnelIcon class="w-4 h-4 md:w-5 md:h-5" />
                Filter
              </button>
              <button
                class="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm"
              >
                <CalendarIcon class="w-4 h-4 md:w-5 md:h-5" />
                Today
              </button>
              <button
                class="px-3 md:px-4 py-2 bg-pink-500 text-white rounded-lg text-sm"
              >
                Share
              </button>
              <button class="p-2 text-gray-400">
                <Squares2X2Icon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Dashboard content -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            <!-- Dashboard Summary Cards -->
            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Total Revenue</h2>
                <span class="text-green-500 text-sm font-medium">
                  +{{ dashboardData.stats.revenue.percentage }}%
                </span>
              </div>
              <div class="flex items-end gap-2">
                <span class="text-2xl md:text-3xl font-bold">
                  Rp {{ formatCurrency(dashboardData.stats.revenue.total) }}
                </span>
                <span class="text-gray-500 text-sm mb-1">
                  {{ dashboardData.stats.revenue.period }}
                </span>
              </div>
            </div>

            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Completed Orders</h2>
                <span class="text-green-500 text-sm font-medium">
                  +{{ dashboardData.stats.completedOrders.percentage }}%
                </span>
              </div>
              <div class="flex items-end gap-2">
                <span class="text-2xl md:text-3xl font-bold">
                  {{ dashboardData.stats.completedOrders.total }}
                </span>
                <span class="text-gray-500 text-sm mb-1">
                  {{ dashboardData.stats.completedOrders.period }}
                </span>
              </div>
            </div>

            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Active Customers</h2>
                <span class="text-green-500 text-sm font-medium">
                  +{{ dashboardData.stats.activeCustomers.percentage }}%
                </span>
              </div>
              <div class="flex items-end gap-2">
                <span class="text-2xl md:text-3xl font-bold">
                  {{ dashboardData.stats.activeCustomers.total }}
                </span>
                <span class="text-gray-500 text-sm mb-1">
                  {{ dashboardData.stats.activeCustomers.period }}
                </span>
              </div>
            </div>
          </div>

          <!-- Product & Revenue Charts (grid layout) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <!-- Product Sold Chart -->
            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold">Sold Items</h2>
                <div class="flex items-center gap-2">
                  <select
                    class="px-2 py-1 border border-gray-200 rounded text-sm"
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center pt-2">
                <ProductSoldChart />
                <div class="flex gap-2 mt-4">
                  <span
                    class="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs"
                    >MAKARIZO</span
                  >
                  <span
                    class="px-3 py-1 bg-red-400 text-white rounded-full text-xs"
                    >L'OREAL</span
                  >
                  <span
                    class="px-3 py-1 bg-yellow-300 text-gray-700 rounded-full text-xs"
                    >CBD</span
                  >
                </div>
              </div>
            </div>

            <!-- Monthly Revenue Chart -->
            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold">Monthly Revenue</h2>
                <div class="flex items-center gap-2">
                  <select
                    class="px-2 py-1 border border-gray-200 rounded text-sm"
                  >
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>
              <MonthlyRevenueChart />
            </div>
          </div>

          <!-- Recent Transactions -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold">Recent Transactions</h2>
              <NuxtLink
                to="/admin/transaksi"
                class="text-pink-500 text-sm font-medium"
              >
                View All
              </NuxtLink>
            </div>

            <!-- Desktop Table -->
            <div
              class="bg-white rounded-xl shadow-sm overflow-hidden hidden md:block"
            >
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th
                      class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      ID
                    </th>
                    <th
                      class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Date
                    </th>
                    <th
                      class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="tx in dashboardData.recentTransactions"
                    :key="tx.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="py-3 px-4 text-sm font-medium text-gray-900">
                      {{ tx.id }}
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-900">
                      {{ tx.name }}
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-500">
                      {{ tx.date }}
                    </td>
                    <td class="py-3 px-4">
                      <span
                        class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        :class="{
                          'bg-green-100 text-green-600':
                            tx.status === 'Completed',
                          'bg-yellow-100 text-yellow-600':
                            tx.status === 'Pending',
                        }"
                      >
                        {{ tx.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Cards -->
            <div class="md:hidden space-y-3">
              <div
                v-for="tx in dashboardData.recentTransactions"
                :key="tx.id"
                class="bg-white rounded-xl shadow-sm p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ tx.name }}</h3>
                    <p class="text-xs text-gray-500">ID: {{ tx.id }}</p>
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                    :class="{
                      'bg-green-100 text-green-600': tx.status === 'Completed',
                      'bg-yellow-100 text-yellow-600': tx.status === 'Pending',
                    }"
                  >
                    {{ tx.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-500">{{ tx.date }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  LinkIcon,
  EyeIcon,
  FunnelIcon,
  CalendarIcon,
  Squares2X2Icon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";

definePageMeta({
  layout: false,
});

const sidebarOpen = ref(false);
const loading = ref(true);
const error = ref(null);
const dashboardData = ref({
  title: "",
  stats: {
    revenue: { total: "0", percentage: 0, period: "" },
    completedOrders: { total: 0, percentage: 0, period: "" },
    activeCustomers: { total: 0, percentage: 0, period: "" },
  },
  recentTransactions: [],
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("id-ID");
};

const fetchDashboardData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`,
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
      throw new Error(errorData.message || "Failed to fetch dashboard data");
    }

    const data = await response.json();
    dashboardData.value = data;
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    error.value =
      err.message || "An error occurred while fetching dashboard data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>
