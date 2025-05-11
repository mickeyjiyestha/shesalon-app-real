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
              Transaksi
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
                  <option value="Feb">February 2024</option>
                  <option value="Apr">April 2025</option>
                  <option value="May">May 2025</option>
                  <option value="Jun">June 2025</option>
                  <option value="Aug">August 2025</option>
                </select>
                <select
                  v-model="filters.type"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Types</option>
                  <option value="Cash">Cash</option>
                  <option value="Cashless">Cashless</option>
                </select>
                <select
                  v-model="filters.status"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
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

          <!-- Transaction Table for Desktop -->
          <div
            v-if="filteredTransactions.length > 0"
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
                    NAME
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Keterangan
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    DATE & TIME
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TYPE
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
                  v-for="transaction in filteredTransactions"
                  :key="transaction.id"
                  class="hover:bg-gray-50"
                >
                  <td class="py-4 px-6 text-sm font-medium text-gray-900">
                    {{ transaction.id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-900">
                    {{ transaction.name }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ transaction.keterangan }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ transaction.date_time }}
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                      :class="{
                        'bg-blue-100 text-blue-600':
                          transaction.type === 'Cashless',
                        'bg-green-100 text-green-600':
                          transaction.type === 'Cash',
                      }"
                    >
                      {{ transaction.type }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                      :class="{
                        'bg-green-100 text-green-600':
                          transaction.status === 'Completed',
                        'bg-yellow-100 text-yellow-600':
                          transaction.status === 'Pending',
                      }"
                    >
                      {{ transaction.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="!loading"
            class="bg-white rounded-2xl shadow-sm p-8 text-center"
          >
            <p class="text-gray-500">No transactions found</p>
          </div>

          <!-- Transaction Cards for Mobile -->
          <div
            v-if="filteredTransactions.length > 0"
            class="md:hidden space-y-4"
          >
            <div
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="bg-white rounded-2xl shadow-sm p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ transaction.name }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ transaction.id }}</p>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                  :class="{
                    'bg-green-100 text-green-600':
                      transaction.status === 'Completed',
                    'bg-yellow-100 text-yellow-600':
                      transaction.status === 'Pending',
                  }"
                >
                  {{ transaction.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-2">
                {{ transaction.keterangan }}
              </p>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">{{ transaction.date_time }}</span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                  :class="{
                    'bg-blue-100 text-blue-600':
                      transaction.type === 'Cashless',
                    'bg-green-100 text-green-600': transaction.type === 'Cash',
                  }"
                >
                  {{ transaction.type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.totalPages > 1"
            class="mt-6 flex justify-center"
          >
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
import { ref, onMounted, computed, watch } from "vue";
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
const transactions = ref([]);
const sidebarOpen = ref(false);
const config = useRuntimeConfig();
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
  type: "",
  status: "",
});

// Toggle sidebar on mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Fetch transactions from API
const fetchTransactions = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/transaksi?page=${currentPage.value}`,
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
      throw new Error(errorData.message || "Failed to fetch transactions");
    }

    const data = await response.json();
    transactions.value = data.transactions || [];
    pagination.value = data.pagination || {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  } catch (err) {
    console.error("Error fetching transactions:", err);
    error.value =
      err.message || "An error occurred while fetching transactions";
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    date: "",
    type: "",
    status: "",
  };
};

// Computed property for filtered transactions
const filteredTransactions = computed(() => {
  if (!transactions.value) return [];

  return transactions.value.filter((transaction) => {
    // Filter by date (month)
    if (
      filters.value.date &&
      !transaction.date_time.includes(filters.value.date)
    ) {
      return false;
    }

    // Filter by type
    if (filters.value.type && transaction.type !== filters.value.type) {
      return false;
    }

    // Filter by status
    if (filters.value.status && transaction.status !== filters.value.status) {
      return false;
    }

    return true;
  });
});

// Watch for page changes
watch(currentPage, () => {
  fetchTransactions();
});

// Fetch data when component mounts
onMounted(() => {
  fetchTransactions();
});
</script>
