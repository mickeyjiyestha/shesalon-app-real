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
              Manajemen Stock
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
              Tambah Produk
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
                  v-model="filters.type"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">Semua Tipe</option>
                  <option value="hair">Hair Products</option>
                  <option value="smoothing">Smoothing Products</option>
                  <option value="keratin">Keratin Products</option>
                </select>
                <select
                  v-model="filters.brand"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">Semua Brand</option>
                  <option
                    v-for="brand in uniqueBrands"
                    :key="brand"
                    :value="brand"
                  >
                    {{ brand }}
                  </option>
                </select>
                <select
                  v-model="filters.harga"
                  class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                >
                  <option value="">Semua Harga</option>
                  <option value="low">< Rp300.000</option>
                  <option value="medium">Rp300.000 - Rp600.000</option>
                  <option value="high">> Rp600.000</option>
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

          <!-- Products Table for Desktop -->
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
                    NAMA PRODUK
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TIPE
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    JENIS
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    BRAND
                  </th>
                  <th
                    class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    HARGA
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
                  v-for="product in filteredProducts"
                  :key="`${product.type}-${product.id}`"
                  class="hover:bg-gray-50"
                >
                  <td class="py-4 px-6 text-sm font-medium text-gray-900">
                    {{ product.id }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-900">
                    {{ product.nama }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getTypeClass(product.type)"
                    >
                      {{ getTypeName(product.type) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ product.jenis }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ product.brand_nama }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-500">
                    {{ formatRupiah(product.harga) }}
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <button
                        @click="editProduct(product)"
                        class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                      >
                        <PencilIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(product)"
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

          <!-- Products Cards for Mobile -->
          <div class="md:hidden space-y-4">
            <div
              v-for="product in filteredProducts"
              :key="`${product.type}-${product.id}`"
              class="bg-white rounded-2xl shadow-sm p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ product.nama }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ product.id }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="editProduct(product)"
                    class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(product)"
                    class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-1 mb-3">
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Tipe:</span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2"
                    :class="getTypeClass(product.type)"
                  >
                    {{ getTypeName(product.type) }}
                  </span>
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Jenis:</span>
                  {{ product.jenis }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Brand:</span>
                  {{ product.brand_nama }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Harga:</span>
                  {{ formatRupiah(product.harga) }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
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
          {{ showEditModal ? "Edit Produk" : "Tambah Produk Baru" }}
        </h2>

        <form @submit.prevent="submitProduct">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nama Produk</label
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
                >Tipe Produk</label
              >
              <select
                v-model="formData.type"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              >
                <option value="hair">Hair Products</option>
                <option value="smoothing">Smoothing Products</option>
                <option value="keratin">Keratin Products</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Jenis</label
              >
              <input
                v-model="formData.jenis"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Brand</label
              >
              <input
                v-model="formData.brand_nama"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
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
          <h2 class="text-xl font-bold text-gray-900">Hapus Produk</h2>
        </div>

        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus produk "{{ deleteProduct?.nama }}"?
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
            @click="deleteProductConfirm"
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
import { ref, onMounted, computed } from "vue";
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
const productsList = ref([]);
const sidebarOpen = ref(false);
const loading = ref(true);
const error = ref(null);

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const isSubmitting = ref(false);

// Form data
const formData = ref({
  nama: "",
  type: "hair",
  jenis: "",
  brand_nama: "",
  harga: "",
});

// Delete confirmation
const deleteProduct = ref(null);

// Filters
const filters = ref({
  type: "",
  brand: "",
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

// Get type name display
const getTypeName = (type) => {
  const types = {
    hair: "Hair Products",
    smoothing: "Smoothing Products",
    keratin: "Keratin Products",
  };
  return types[type] || type;
};

// Get type class for styling
const getTypeClass = (type) => {
  const classes = {
    hair: "bg-blue-100 text-blue-800",
    smoothing: "bg-green-100 text-green-800",
    keratin: "bg-purple-100 text-purple-800",
  };
  return classes[type] || "bg-gray-100 text-gray-800";
};

// Get unique brands for filter
const uniqueBrands = computed(() => {
  const brands = new Set();
  productsList.value.forEach((product) => {
    brands.add(product.brand_nama);
  });
  return Array.from(brands).sort();
});

// Fetch products from API
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${config.public.apiBaseUrl}/api/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch products");
    }

    const data = await response.json();

    // Flatten the products from different categories
    const allProducts = [];
    if (data.data.hair_products) {
      allProducts.push(...data.data.hair_products);
    }
    if (data.data.smoothing_products) {
      allProducts.push(...data.data.smoothing_products);
    }
    if (data.data.keratin_products) {
      allProducts.push(...data.data.keratin_products);
    }

    productsList.value = allProducts;
  } catch (err) {
    console.error("Error fetching products:", err);
    error.value = err.message || "An error occurred while fetching products";
  } finally {
    loading.value = false;
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    type: "",
    brand: "",
    harga: "",
  };
};

// Computed property for filtered products
const filteredProducts = computed(() => {
  return productsList.value.filter((product) => {
    // Filter by type
    if (filters.value.type && product.type !== filters.value.type) {
      return false;
    }

    // Filter by brand
    if (filters.value.brand && product.brand_nama !== filters.value.brand) {
      return false;
    }

    // Filter by price range
    if (filters.value.harga) {
      const price = parseFloat(product.harga);
      if (filters.value.harga === "low" && price >= 300000) {
        return false;
      }
      if (
        filters.value.harga === "medium" &&
        (price < 300000 || price > 600000)
      ) {
        return false;
      }
      if (filters.value.harga === "high" && price <= 600000) {
        return false;
      }
    }

    return true;
  });
});

// Open edit modal and populate form
const editProduct = (product) => {
  formData.value = {
    id: product.id,
    nama: product.nama,
    type: product.type,
    jenis: product.jenis,
    brand_nama: product.brand_nama,
    harga: product.harga,
  };
  showEditModal.value = true;
};

// Confirm delete
const confirmDelete = (product) => {
  deleteProduct.value = product;
  showDeleteModal.value = true;
};

// Submit form (create or update)
const submitProduct = async () => {
  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const url = showEditModal.value
      ? `${config.public.apiBaseUrl}/api/products/${formData.value.id}`
      : `${config.public.apiBaseUrl}/api/products`;

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
        type: formData.value.type,
        jenis: formData.value.jenis,
        brand_nama: formData.value.brand_nama,
        harga: formData.value.harga,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to ${showEditModal.value ? "update" : "create"} product`
      );
    }

    // Refresh the list
    await fetchProducts();

    // Close modal and reset form
    closeModals();

    // Show success message
    alert(
      `Produk berhasil ${showEditModal.value ? "diperbarui" : "ditambahkan"}`
    );
  } catch (err) {
    console.error(
      `Error ${showEditModal.value ? "updating" : "creating"} product:`,
      err
    );
    alert(
      err.message ||
        `An error occurred while ${
          showEditModal.value ? "updating" : "creating"
        } product`
    );
  } finally {
    isSubmitting.value = false;
  }
};

// Delete product
const deleteProductConfirm = async () => {
  if (!deleteProduct.value) return;

  isSubmitting.value = true;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/products/${deleteProduct.value.id}`,
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
      throw new Error(errorData.message || "Failed to delete product");
    }

    // Refresh the list
    await fetchProducts();

    // Close modal
    showDeleteModal.value = false;
    deleteProduct.value = null;

    // Show success message
    alert("Produk berhasil dihapus");
  } catch (err) {
    console.error("Error deleting product:", err);
    alert(err.message || "An error occurred while deleting product");
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
    type: "hair",
    jenis: "",
    brand_nama: "",
    harga: "",
  };
};

// Fetch data when component mounts
onMounted(() => {
  fetchProducts();
});
</script>
