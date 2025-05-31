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
              Testimoni
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
                  v-model="filters.status"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
                <select
                  v-model="filters.rating"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
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

          <!-- Testimoni Table for Desktop -->
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
                    USER ID
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    RATING
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    COMMENT
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    IMAGE
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STATUS
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    DATE
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="testimoni in filteredTestimoni"
                  :key="testimoni.id"
                  class="hover:bg-gray-50"
                >
                  <td class="py-4 px-6 text-sm font-medium text-gray-900">
                    {{ testimoni.id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-900">
                    {{ testimoni.user_id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    <div class="flex items-center gap-1">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="text-yellow-400"
                      >
                        <StarIcon
                          v-if="star <= testimoni.rating"
                          class="w-4 h-4 fill-current"
                        />
                        <StarIcon v-else class="w-4 h-4" />
                      </span>
                      <span class="ml-1 text-gray-600"
                        >({{ testimoni.rating }})</span
                      >
                    </div>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500 max-w-xs">
                    <div class="truncate" :title="testimoni.comment">
                      {{ testimoni.comment }}
                    </div>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    <img
                      v-if="testimoni.image_url"
                      :src="testimoni.image_url"
                      alt="Testimoni Image"
                      class="w-12 h-12 object-cover rounded-lg cursor-pointer"
                      @click="showImageModal(testimoni.image_url)"
                    />
                    <span v-else class="text-gray-400">No Image</span>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                      :class="{
                        'bg-green-100 text-green-600':
                          testimoni.status === 'approved',
                        'bg-yellow-100 text-yellow-600':
                          testimoni.status === 'pending',
                      }"
                    >
                      {{ testimoni.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ formatDate(testimoni.created_at) }}
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <button
                        v-if="testimoni.status === 'pending'"
                        @click="updateStatus(testimoni.id, 'approved')"
                        class="p-1.5 bg-green-50 text-green-500 rounded-md hover:bg-green-100"
                        title="Approve"
                      >
                        <CheckIcon class="w-4 h-4" />
                      </button>
                      <button
                        v-if="testimoni.status === 'approved'"
                        @click="updateStatus(testimoni.id, 'pending')"
                        class="p-1.5 bg-yellow-50 text-yellow-500 rounded-md hover:bg-yellow-100"
                        title="Set to Pending"
                      >
                        <ClockIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(testimoni)"
                        class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                        title="Delete"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Testimoni Cards for Mobile -->
          <div class="md:hidden space-y-4">
            <div
              v-for="testimoni in filteredTestimoni"
              :key="testimoni.id"
              class="bg-white rounded-2xl shadow-sm p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">
                    User ID: {{ testimoni.user_id }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ testimoni.id }}</p>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                  :class="{
                    'bg-green-100 text-green-600':
                      testimoni.status === 'approved',
                    'bg-yellow-100 text-yellow-600':
                      testimoni.status === 'pending',
                  }"
                >
                  {{ testimoni.status }}
                </span>
              </div>
              <div class="flex flex-col gap-2 mb-3">
                <div class="flex items-center gap-1">
                  <span class="text-sm font-medium text-gray-700">Rating:</span>
                  <div class="flex items-center gap-1">
                    <span v-for="star in 5" :key="star" class="text-yellow-400">
                      <StarIcon
                        v-if="star <= testimoni.rating"
                        class="w-4 h-4 fill-current"
                      />
                      <StarIcon v-else class="w-4 h-4" />
                    </span>
                    <span class="ml-1 text-gray-600"
                      >({{ testimoni.rating }})</span
                    >
                  </div>
                </div>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Comment:</span>
                  {{ testimoni.comment }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Date:</span>
                  {{ formatDate(testimoni.created_at) }}
                </p>
                <div v-if="testimoni.image_url" class="mt-2">
                  <img
                    :src="testimoni.image_url"
                    alt="Testimoni Image"
                    class="w-20 h-20 object-cover rounded-lg cursor-pointer"
                    @click="showImageModal(testimoni.image_url)"
                  />
                </div>
              </div>
              <div
                class="flex items-center gap-2 pt-2 border-t border-gray-100"
              >
                <button
                  v-if="testimoni.status === 'pending'"
                  @click="updateStatus(testimoni.id, 'approved')"
                  class="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 text-sm"
                >
                  <CheckIcon class="w-4 h-4" />
                  Approve
                </button>
                <button
                  v-if="testimoni.status === 'approved'"
                  @click="updateStatus(testimoni.id, 'pending')"
                  class="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-md hover:bg-yellow-100 text-sm"
                >
                  <ClockIcon class="w-4 h-4" />
                  Pending
                </button>
                <button
                  @click="confirmDelete(testimoni)"
                  class="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-sm"
                >
                  <TrashIcon class="w-4 h-4" />
                  Delete
                </button>
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

    <!-- Image Modal -->
    <div
      v-if="showImageModalState"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <button
          @click="closeImageModal"
          class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <XMarkIcon class="w-8 h-8" />
        </button>
        <img
          :src="selectedImage"
          alt="Testimoni Image"
          class="max-w-full max-h-full object-contain rounded-lg"
          @click.stop
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        @click.stop
      >
        <button
          @click="showDeleteModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        <div class="flex items-center gap-4 mb-4">
          <div class="bg-red-100 p-2 rounded-full">
            <ExclamationTriangleIcon class="w-6 h-6 text-red-500" />
          </div>
          <h2 class="text-xl font-bold text-gray-900">Hapus Testimoni</h2>
        </div>

        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus testimoni ini? Tindakan ini tidak
          dapat dibatalkan.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="deleteTestimoniConfirm"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <span class="inline-block animate-spin mr-2">⟳</span>
              Processing...
            </span>
            <span v-else>Hapus</span>
          </button>
        </div>
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
  TrashIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/vue/24/outline";
import { useRuntimeConfig } from "#app";

// State variables
const testimoniList = ref([]);
const config = useRuntimeConfig();
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

// Modal states
const showDeleteModal = ref(false);
const showImageModalState = ref(false);
const selectedImage = ref("");
const isSubmitting = ref(false);

// Delete confirmation
const deleteTestimoni = ref(null);

// Filters
const filters = ref({
  status: "",
  rating: "",
});

// Toggle sidebar on mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Show image modal
const showImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showImageModalState.value = true;
};

// Close image modal
const closeImageModal = () => {
  showImageModalState.value = false;
  selectedImage.value = "";
};

// Fetch testimoni from API
const fetchTestimoni = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/testimonis?page=${currentPage.value}`,
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
      throw new Error(errorData.message || "Failed to fetch testimoni");
    }

    const data = await response.json();

    // If the API returns an array directly (like in your example)
    if (Array.isArray(data)) {
      testimoniList.value = data;
      // Create mock pagination if not provided
      pagination.value = {
        total: data.length,
        page: currentPage.value,
        limit: 10,
        totalPages: Math.ceil(data.length / 10),
      };
    } else {
      // If the API returns an object with testimoni and pagination
      testimoniList.value = data.testimoni || data;
      pagination.value = data.pagination || pagination.value;
    }
  } catch (err) {
    console.error("Error fetching testimoni:", err);
    error.value = err.message || "An error occurred while fetching testimoni";
  } finally {
    loading.value = false;
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    status: "",
    rating: "",
  };
};

// Computed property for filtered testimoni
const filteredTestimoni = computed(() => {
  return testimoniList.value.filter((testimoni) => {
    // Filter by status
    if (filters.value.status && testimoni.status !== filters.value.status) {
      return false;
    }

    // Filter by rating
    if (
      filters.value.rating &&
      testimoni.rating.toString() !== filters.value.rating
    ) {
      return false;
    }

    return true;
  });
});

// Update testimoni status
const updateStatus = async (id, newStatus) => {
  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/testimonis/${id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update status");
    }

    // Update the local data
    const testimoniIndex = testimoniList.value.findIndex((t) => t.id === id);
    if (testimoniIndex !== -1) {
      testimoniList.value[testimoniIndex].status = newStatus;
    }

    // Show success message
    alert(`Status berhasil diubah menjadi ${newStatus}`);
  } catch (err) {
    console.error("Error updating status:", err);
    alert(err.message || "An error occurred while updating status");
  } finally {
    isSubmitting.value = false;
  }
};

// Confirm delete
const confirmDelete = (testimoni) => {
  deleteTestimoni.value = testimoni;
  showDeleteModal.value = true;
};

// Delete testimoni
const deleteTestimoniConfirm = async () => {
  if (!deleteTestimoni.value) return;

  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/admin/testimonis/${deleteTestimoni.value.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete testimoni");
    }

    // Remove from local data
    testimoniList.value = testimoniList.value.filter(
      (t) => t.id !== deleteTestimoni.value.id
    );

    // Close modal
    showDeleteModal.value = false;
    deleteTestimoni.value = null;

    // Show success message
    alert("Testimoni berhasil dihapus");
  } catch (err) {
    console.error("Error deleting testimoni:", err);
    alert(err.message || "An error occurred while deleting testimoni");
  } finally {
    isSubmitting.value = false;
  }
};

// Watch for page changes
watch(currentPage, () => {
  fetchTestimoni();
});

// Fetch data when component mounts
onMounted(() => {
  fetchTestimoni();
});
</script>
