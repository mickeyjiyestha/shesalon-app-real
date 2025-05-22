<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-6">Manajemen User</h1>

      <!-- Search and filter section -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div class="relative w-full md:w-64">
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full focus:outline-none border border-gray-200"
            @input="handleSearch"
          />
        </div>
        <div class="flex items-center gap-2 w-full md:w-auto">
          <select
            v-model="roleFilter"
            class="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none"
            @change="handleRoleFilter"
          >
            <option value="">All Roles</option>
            <option value="pelanggan">Pelanggan</option>
            <option value="admin">Admin</option>
          </select>
          <button
            @click="fetchUsers"
            class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
        ></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex items-start">
          <ExclamationCircleIcon class="w-5 h-5 text-red-500 mt-0.5 mr-2" />
          <div>
            <p class="text-red-700 font-medium">Error loading users</p>
            <p class="text-red-600">{{ error }}</p>
            <p class="text-gray-600 mt-2">
              Showing mock data for demonstration purposes.
            </p>
            <button
              @click="fetchUsers"
              class="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Users table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  :class="{ 'hidden md:table-cell': header.responsive }"
                >
                  {{ header.label }}
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <UserIcon class="h-5 w-5 text-gray-500" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.fullname }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ user.username }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-sm text-gray-900">
                    {{ user.phone_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    "
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="viewUserDetails(user)"
                    class="text-pink-600 hover:text-pink-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    @click="editUser(user)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <!-- Empty state -->
              <tr v-if="users.length === 0 && !isLoading">
                <td
                  :colspan="tableHeaders.length + 1"
                  class="px-6 py-10 text-center text-gray-500"
                >
                  No users found. Try adjusting your search or filters.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  pagination.page === 1
                    ? 1
                    : (pagination.page - 1) * pagination.limit + 1
                }}</span>
                to
                <span class="font-medium">
                  {{
                    Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )
                  }}
                </span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="changePage(pagination.prevPage)"
                  :disabled="!pagination.hasPrevPage"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"
                  :class="
                    pagination.hasPrevPage
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                  "
                >
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  v-for="page in paginationPages"
                  :key="page"
                  @click="changePage(page)"
                  :disabled="page === pagination.page"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                  :class="
                    page === pagination.page
                      ? 'z-10 bg-pink-50 border-pink-500 text-pink-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  "
                >
                  {{ page }}
                </button>
                <button
                  @click="changePage(pagination.nextPage)"
                  :disabled="!pagination.hasNextPage"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"
                  :class="
                    pagination.hasNextPage
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                  "
                >
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          <div class="flex items-center justify-between w-full sm:hidden">
            <button
              @click="changePage(pagination.prevPage)"
              :disabled="!pagination.hasPrevPage"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md"
              :class="
                pagination.hasPrevPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              "
            >
              Previous
            </button>
            <p class="text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </p>
            <button
              @click="changePage(pagination.nextPage)"
              :disabled="!pagination.hasNextPage"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md"
              :class="
                pagination.hasNextPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- User details modal (placeholder) -->
      <div
        v-if="selectedUser"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold">User Details</h2>
            <button
              @click="selectedUser = null"
              class="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex justify-center mb-4">
              <div
                class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <UserIcon class="w-10 h-10 text-gray-500" />
              </div>
            </div>
            <div
              v-for="(value, key) in selectedUser"
              :key="key"
              class="grid grid-cols-3 gap-4 py-2 border-b border-gray-100"
            >
              <div class="text-gray-500 capitalize">{{ formatKey(key) }}</div>
              <div class="col-span-2 text-gray-900">{{ value }}</div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              @click="selectedUser = null"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mr-2"
            >
              Close
            </button>
            <button
              @click="editUser(selectedUser)"
              class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useRuntimeConfig } from "#app";
import { definePageMeta, useCookie } from "#imports";

definePageMeta({
  middleware: ["auth"],
});

// State
const config = useRuntimeConfig();
const token = useCookie("token");
const users = ref([]);
const isLoading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const searchQuery = ref("");
const roleFilter = ref("");
const selectedUser = ref(null);

// Pagination state
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
});

// Table headers
const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", responsive: true },
  { key: "phone", label: "Phone", responsive: true },
  { key: "role", label: "Role" },
];

// Computed properties
const paginationPages = computed(() => {
  const pages = [];
  const maxPages = 5;
  const totalPages = pagination.value.totalPages;

  if (totalPages <= maxPages) {
    // Show all pages if there are 5 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show a subset of pages with current page in the middle if possible
    const currentPage = pagination.value.page;
    const halfMax = Math.floor(maxPages / 2);

    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// Methods
const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage.value);

    if (searchQuery.value) {
      queryParams.append("search", searchQuery.value);
    }

    if (roleFilter.value) {
      queryParams.append("role", roleFilter.value);
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/users?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    users.value = data.users;
    pagination.value = data.pagination;
  } catch (err) {
    console.error("Error fetching users:", err);
    error.value = err.message;

    // Use mock data as fallback
    useMockData();
  } finally {
    isLoading.value = false;
  }
};

const useMockData = () => {
  // Mock user data based on the example response
  users.value = [
    {
      id: 23,
      fullname: "Komang Abdi Ariasa",
      email: "abdiariasa@gmail.com",
      phone_number: "087353825492",
      username: "kotil",
      address: "Singaraja",
      role: "pelanggan",
    },
    {
      id: 22,
      fullname: "Dwinata Wiguna",
      email: "mikiykiddy@gmail.com",
      phone_number: "9728373262",
      username: "dwinata",
      address: "Apas",
      role: "pelanggan",
    },
    {
      id: 21,
      fullname: "Mikihaha",
      email: "mikiyjw@gmail.com",
      phone_number: "081234567890",
      username: "mikiblok",
      address: "Jl. Mawar No. 10",
      role: "pelanggan",
    },
    {
      id: 20,
      fullname: "Caca Kocak",
      email: "caca@gmail.com",
      phone_number: "08973538362",
      username: "caca",
      address: "Bukit",
      role: "pelanggan",
    },
    {
      id: 19,
      fullname: "Jumping",
      email: "jumping@gmail.com",
      phone_number: "0897353832",
      username: "jumping",
      address: "Denpasar",
      role: "pelanggan",
    },
    {
      id: 18,
      fullname: "Yuki",
      email: "yuki@gmail.com",
      phone_number: "0893639362",
      username: "yuki",
      address: "Denpasar",
      role: "pelanggan",
    },
    {
      id: 14,
      fullname: "Henrycool",
      email: "henry@example.com",
      phone_number: "6281234567890",
      username: "yahaha",
      address: "Jl. Mawar No.10",
      role: "pelanggan",
    },
    {
      id: 10,
      fullname: "John Doe",
      email: "johndoe@example.com",
      phone_number: "6289675694072",
      username: "johndoe",
      address: "Jalan Raya No. 123",
      role: "pelanggan",
    },
    {
      id: 9,
      fullname: "Budi",
      email: "budi@gmail.com",
      phone_number: "0897723633",
      username: "duar",
      address: "Poltek",
      role: "pelanggan",
    },
    {
      id: 8,
      fullname: "Ayu Sri",
      email: "ayu123@gmail.com",
      phone_number: "08123445312",
      username: "ayu123",
      address: "Jl. Taman apa kaden",
      role: "pelanggan",
    },
  ];

  // Mock pagination data
  pagination.value = {
    total: 11,
    page: currentPage.value,
    limit: 10,
    totalPages: 2,
    hasNextPage: currentPage.value < 2,
    hasPrevPage: currentPage.value > 1,
    nextPage: currentPage.value < 2 ? currentPage.value + 1 : null,
    prevPage: currentPage.value > 1 ? currentPage.value - 1 : null,
  };
};

const changePage = (page) => {
  if (page && page !== currentPage.value) {
    currentPage.value = page;
    fetchUsers();
  }
};

const handleSearch = () => {
  // Debounce search to avoid too many API calls
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1; // Reset to first page when searching
    fetchUsers();
  }, 500);
};

const handleRoleFilter = () => {
  currentPage.value = 1; // Reset to first page when filtering
  fetchUsers();
};

const viewUserDetails = (user) => {
  selectedUser.value = { ...user };
};

const editUser = (user) => {
  // Placeholder for edit functionality
  alert(`Edit user: ${user.fullname}`);
  // In a real implementation, you would open an edit modal or navigate to an edit page
};

const formatKey = (key) => {
  return key.replace(/_/g, " ");
};

// Variables
let searchTimeout = null;

// Lifecycle hooks
onMounted(() => {
  fetchUsers();
});
</script>
