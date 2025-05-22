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
              Layanan
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
              @click="showAddModal = true"
              class="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg border border-pink-500 text-sm hover:bg-pink-600 transition-colors"
            >
              <PlusIcon class="w-4 h-4" />
              Tambah Layanan
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
                  v-model="filters.kategori"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">Semua Kategori</option>
                  <option value="1">Potong Rambut</option>
                  <option value="2">Pewarnaan</option>
                  <option value="3">Smoothing</option>
                </select>
                <select
                  v-model="filters.harga"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">Semua Harga</option>
                  <option value="low">< Rp100.000</option>
                  <option value="medium">Rp100.000 - Rp200.000</option>
                  <option value="high">> Rp200.000</option>
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

          <!-- Layanan Table for Desktop -->
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
                    NAMA
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    KATEGORI
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    HARGA
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ESTIMASI WAKTU
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="layanan in filteredLayanan"
                  :key="layanan.id"
                  class="hover:bg-gray-50"
                >
                  <td class="py-4 px-6 text-sm font-medium text-gray-900">
                    {{ layanan.id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-900">
                    {{ layanan.nama }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ getKategoriName(layanan.kategori_id) }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ formatRupiah(layanan.harga) }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ layanan.estimasi_waktu }} menit
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <button
                        @click="editLayanan(layanan)"
                        class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                      >
                        <PencilIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(layanan)"
                        class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Layanan Cards for Mobile -->
          <div class="md:hidden space-y-4">
            <div
              v-for="layanan in filteredLayanan"
              :key="layanan.id"
              class="bg-white rounded-2xl shadow-sm p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ layanan.nama }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ layanan.id }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="editLayanan(layanan)"
                    class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(layanan)"
                    class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-1 mb-3">
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Kategori:</span>
                  {{ getKategoriName(layanan.kategori_id) }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Harga:</span>
                  {{ formatRupiah(layanan.harga) }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Estimasi Waktu:</span>
                  {{ layanan.estimasi_waktu }} menit
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Add/Edit Layanan Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        @click.stop
      >
        <button
          @click="closeModals"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ showEditModal ? "Edit Layanan" : "Tambah Layanan Baru" }}
        </h2>

        <form @submit.prevent="submitLayanan">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nama Layanan</label
              >
              <input
                v-model="formData.nama"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Kategori</label
              >
              <select
                v-model="formData.kategori_id"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              >
                <option value="1">Potong Rambut</option>
                <option value="2">Pewarnaan</option>
                <option value="3">Smoothing</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Harga (Rp)</label
              >
              <input
                v-model="formData.harga"
                type="number"
                min="0"
                step="1000"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Estimasi Waktu (menit)</label
              >
              <input
                v-model="formData.estimasi_waktu"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <span class="inline-block animate-spin mr-2">⟳</span>
                Processing...
              </span>
              <span v-else>
                {{ showEditModal ? "Update" : "Simpan" }}
              </span>
            </button>
          </div>
        </form>
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
          <h2 class="text-xl font-bold text-gray-900">Hapus Layanan</h2>
        </div>

        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus layanan "{{ deleteLayanan?.nama }}"?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="deleteLayananConfirm"
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
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
const config = useRuntimeConfig();

// State variables
const layananList = ref([]);
const sidebarOpen = ref(false);
const loading = ref(true);
const error = ref(null);
const isDev = ref(process.env.NODE_ENV === "development");

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const isSubmitting = ref(false);

// Form data
const formData = ref({
  nama: "",
  kategori_id: "1",
  harga: "",
  estimasi_waktu: "",
});

// Delete confirmation
const deleteLayanan = ref(null);

// Filters
const filters = ref({
  kategori: "",
  harga: "",
});

// Toggle sidebar on mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Format price to Rupiah
const formatRupiah = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Get category name from ID
const getKategoriName = (kategoriId) => {
  const categories = {
    1: "Potong Rambut",
    2: "Pewarnaan",
    3: "Smoothing",
  };
  return categories[kategoriId] || "Kategori Lain";
};

// Fetch layanan from API
const fetchLayanan = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${config.public.apiBaseUrl}/api/layanan`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch layanan");
    }

    const data = await response.json();
    layananList.value = data;
  } catch (err) {
    console.error("Error fetching layanan:", err);
    error.value = err.message || "An error occurred while fetching layanan";
  } finally {
    loading.value = false;
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    kategori: "",
    harga: "",
  };
};

// Computed property for filtered layanan
const filteredLayanan = computed(() => {
  return layananList.value.filter((layanan) => {
    // Filter by kategori
    if (
      filters.value.kategori &&
      layanan.kategori_id.toString() !== filters.value.kategori
    ) {
      return false;
    }

    // Filter by price range
    if (filters.value.harga) {
      const price = parseFloat(layanan.harga);
      if (filters.value.harga === "low" && price >= 100000) {
        return false;
      }
      if (
        filters.value.harga === "medium" &&
        (price < 100000 || price > 200000)
      ) {
        return false;
      }
      if (filters.value.harga === "high" && price <= 200000) {
        return false;
      }
    }

    return true;
  });
});

// Open edit modal and populate form
const editLayanan = (layanan) => {
  formData.value = {
    id: layanan.id,
    nama: layanan.nama,
    kategori_id: layanan.kategori_id.toString(),
    harga: layanan.harga,
    estimasi_waktu: layanan.estimasi_waktu,
  };
  showEditModal.value = true;
};

// Confirm delete
const confirmDelete = (layanan) => {
  deleteLayanan.value = layanan;
  showDeleteModal.value = true;
};

// Submit form (create or update)
const submitLayanan = async () => {
  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const url = showEditModal.value
      ? `${config.public.apiBaseUrl}/api/layanan/${formData.value.id}`
      : `${config.public.apiBaseUrl}/api/layanan`;

    const method = showEditModal.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        nama: formData.value.nama,
        kategori_id: parseInt(formData.value.kategori_id),
        harga: formData.value.harga,
        estimasi_waktu: parseInt(formData.value.estimasi_waktu),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to ${showEditModal.value ? "update" : "create"} layanan`
      );
    }

    // Refresh the list
    await fetchLayanan();

    // Close modal and reset form
    closeModals();

    // Show success message
    alert(
      `Layanan berhasil ${showEditModal.value ? "diperbarui" : "ditambahkan"}`
    );
  } catch (err) {
    console.error(
      `Error ${showEditModal.value ? "updating" : "creating"} layanan:`,
      err
    );
    alert(
      err.message ||
        `An error occurred while ${
          showEditModal.value ? "updating" : "creating"
        } layanan`
    );
  } finally {
    isSubmitting.value = false;
  }
};

// Delete layanan
const deleteLayananConfirm = async () => {
  if (!deleteLayanan.value) return;

  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/layanan/${deleteLayanan.value.id}`,
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
      throw new Error(errorData.message || "Failed to delete layanan");
    }

    // Refresh the list
    await fetchLayanan();

    // Close modal
    showDeleteModal.value = false;
    deleteLayanan.value = null;

    // Show success message
    alert("Layanan berhasil dihapus");
  } catch (err) {
    console.error("Error deleting layanan:", err);
    alert(err.message || "An error occurred while deleting layanan");
  } finally {
    isSubmitting.value = false;
  }
};

// Close all modals and reset form
const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  formData.value = {
    nama: "",
    kategori_id: "1",
    harga: "",
    estimasi_waktu: "",
  };
};

// Fetch data when component mounts
onMounted(() => {
  fetchLayanan();
});
</script>
