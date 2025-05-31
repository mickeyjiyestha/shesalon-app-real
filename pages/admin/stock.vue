<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Mobile Sidebar Toggle -->
    <div class="md:hidden p-2 bg-white border-b border-gray-200">
      <button @click="toggleSidebar" class="p-2 text-gray-500">
        <Menu class="w-6 h-6" />
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
                <Link class="w-5 h-5" />
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <Eye class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="showAddModal = true"
              class="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg border border-pink-500 text-sm hover:bg-pink-600 transition-colors"
            >
              <Plus class="w-4 h-4" />
              Tambah Produk
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600">
              <Grid3X3 class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Product Type Selector -->
        <div class="bg-white rounded-2xl shadow-sm mb-6 p-4">
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700"
              >Tipe Produk:</label
            >
            <select
              v-model="currentProductType"
              @change="onProductTypeChange"
              class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[180px]"
            >
              <option value="hair">Hair Colors</option>
              <option value="smoothing">Smoothing Products</option>
              <option value="keratin">Keratin Products</option>
            </select>
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
                <Filter class="w-5 h-5 text-gray-400" />
                <span class="text-sm font-medium">Filter By</span>
              </div>
              <div class="flex flex-wrap items-center gap-3 flex-1 w-full">
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

                <!-- Hair-specific filters -->
                <template v-if="currentProductType === 'hair'">
                  <select
                    v-model="filters.kategori"
                    class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                  >
                    <option value="">Semua Kategori</option>
                    <option
                      v-for="kategori in uniqueKategori"
                      :key="kategori"
                      :value="kategori"
                    >
                      {{ kategori }}
                    </option>
                  </select>
                  <select
                    v-model="filters.level"
                    class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                  >
                    <option value="">Semua Level</option>
                    <option
                      v-for="level in uniqueLevels"
                      :key="level"
                      :value="level"
                    >
                      Level {{ level }}
                    </option>
                  </select>
                </template>

                <!-- Smoothing/Keratin-specific filters -->
                <template v-else>
                  <select
                    v-model="filters.jenis"
                    class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
                  >
                    <option value="">Semua Jenis</option>
                    <option
                      v-for="jenis in uniqueJenis"
                      :key="jenis"
                      :value="jenis"
                    >
                      {{ jenis }}
                    </option>
                  </select>
                </template>

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
                  <RotateCcw class="w-4 h-4" />
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
                  <!-- Hair Colors Headers -->
                  <template v-if="currentProductType === 'hair'">
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product ID
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama Produk
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Warna
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kategori
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Level
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Harga Dasar
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tambahan
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stok
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </template>

                  <!-- Smoothing/Keratin Headers -->
                  <template v-else>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product ID
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama Produk
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jenis
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Harga
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stok
                    </th>
                    <th
                      class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <!-- Hair Colors Rows -->
                <template v-if="currentProductType === 'hair'">
                  <tr
                    v-for="product in filteredProducts"
                    :key="`hair-${product.product_id}-${
                      product.color_id || 'no-color'
                    }`"
                    class="hover:bg-gray-50"
                  >
                    <td class="py-4 px-6 text-sm font-medium text-gray-900">
                      {{ product.product_id }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-900">
                      {{ product.brand_nama }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-900">
                      {{ product.product_nama }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-900">
                      {{ product.warna || "Tidak ada warna" }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      <span
                        v-if="product.kategori"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ product.kategori }}
                      </span>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      {{ product.level || "-" }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      {{ formatRupiah(product.harga_dasar) }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      {{ formatRupiah(product.tambahan_harga || 0) }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900">
                      {{
                        formatRupiah(product.harga_total || product.harga_dasar)
                      }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          product.stok > 5
                            ? 'bg-green-100 text-green-800'
                            : product.stok > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800',
                        ]"
                      >
                        {{ product.stok || 0 }}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-2">
                        <button
                          @click="editProduct(product)"
                          class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                        >
                          <Pencil class="w-4 h-4" />
                        </button>
                        <button
                          @click="confirmDelete(product)"
                          class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>

                <!-- Smoothing/Keratin Rows -->
                <template v-else>
                  <tr
                    v-for="product in filteredProducts"
                    :key="`${currentProductType}-${product.product_id}`"
                    class="hover:bg-gray-50"
                  >
                    <td class="py-4 px-6 text-sm font-medium text-gray-900">
                      {{ product.product_id }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-900">
                      {{ product.brand.nama }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-900">
                      {{ product.product.nama }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      {{ product.product.jenis }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      {{ formatRupiah(product.product.harga) }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500">
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          product.stok > 5
                            ? 'bg-green-100 text-green-800'
                            : product.stok > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800',
                        ]"
                      >
                        {{ product.stok }}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-2">
                        <button
                          @click="editProduct(product)"
                          class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                        >
                          <Pencil class="w-4 h-4" />
                        </button>
                        <button
                          @click="confirmDelete(product)"
                          class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <!-- Products Cards for Mobile -->
          <div class="md:hidden space-y-4">
            <!-- Hair Colors Cards -->
            <template v-if="currentProductType === 'hair'">
              <div
                v-for="product in filteredProducts"
                :key="`hair-${product.product_id}-${
                  product.color_id || 'no-color'
                }`"
                class="bg-white rounded-2xl shadow-sm p-4"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ product.product_nama }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      ID: {{ product.product_id }}
                    </p>
                    <p class="text-sm text-pink-600 font-medium">
                      {{ product.warna || "Tidak ada warna" }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      @click="editProduct(product)"
                      class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      @click="confirmDelete(product)"
                      class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Brand:</span>
                    {{ product.brand_nama }}
                  </p>
                  <p class="text-sm text-gray-500" v-if="product.kategori">
                    <span class="font-medium">Kategori:</span>
                    {{ product.kategori }}
                  </p>
                  <p class="text-sm text-gray-500" v-if="product.level">
                    <span class="font-medium">Level:</span> {{ product.level }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Total Harga:</span>
                    {{
                      formatRupiah(product.harga_total || product.harga_dasar)
                    }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Stok:</span>
                    {{ product.stok || 0 }}
                  </p>
                </div>
              </div>
            </template>

            <!-- Smoothing/Keratin Cards -->
            <template v-else>
              <div
                v-for="product in filteredProducts"
                :key="`${currentProductType}-${product.product_id}`"
                class="bg-white rounded-2xl shadow-sm p-4"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ product.product.nama }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      ID: {{ product.product_id }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      @click="editProduct(product)"
                      class="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      @click="confirmDelete(product)"
                      class="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Brand:</span>
                    {{ product.brand.nama }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Jenis:</span>
                    {{ product.product.jenis }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Harga:</span>
                    {{ formatRupiah(product.product.harga) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-medium">Stok:</span> {{ product.stok }}
                  </p>
                </div>
              </div>
            </template>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <Package class="w-16 h-16 mx-auto" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              Tidak ada produk
            </h3>
            <p class="text-gray-500">
              Tidak ada produk yang sesuai dengan filter yang dipilih.
            </p>
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
          <X class="w-5 h-5" />
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
          <X class="w-5 h-5" />
        </button>
        <div class="flex items-center gap-4 mb-4">
          <div class="bg-red-100 p-2 rounded-full">
            <AlertTriangle class="w-6 h-6 text-red-500" />
          </div>
          <h2 class="text-xl font-bold text-gray-900">Hapus Produk</h2>
        </div>

        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat
          dibatalkan.
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
const config = useRuntimeConfig();
import {
  Menu,
  Link,
  Eye,
  Grid3X3,
  Filter,
  RotateCcw,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Package,
} from "lucide-vue-next";
import AdminSidebar from "../components/AdminSidebar.vue";
import AdminHeader from "../components/AdminHeader.vue";

// State variables
const productsList = ref([]);
const sidebarOpen = ref(false);
const loading = ref(true);
const error = ref(null);
const currentProductType = ref("hair"); // Default to hair colors

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
  brand: "",
  kategori: "",
  level: "",
  jenis: "",
  harga: "",
});

// Toggle sidebar on mobile
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Format price to Rupiah
const formatRupiah = (price) => {
  if (!price) return "Rp 0";
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numPrice);
};

// Transform hair colors data to flatten color variants
const transformHairColorsData = (data) => {
  const transformedData = [];

  data.forEach((product) => {
    if (product.available_colors && product.available_colors.length > 0) {
      // Check if colors have valid data
      const validColors = product.available_colors.filter(
        (color) => color.nama !== null && color.stok !== null
      );

      if (validColors.length > 0) {
        validColors.forEach((color) => {
          transformedData.push({
            product_id: product.product_id,
            brand_nama: product.brand.nama,
            product_nama: product.product.nama,
            product_jenis: product.product.jenis,
            product_deskripsi: product.product.deskripsi,
            harga_dasar: product.product.harga_dasar,
            color_id: color.color_id,
            warna: color.nama,
            stok: color.stok,
            level: color.level,
            kategori: color.kategori,
            tambahan_harga: color.tambahan_harga || 0,
            harga_total:
              color.harga_total ||
              product.product.harga_dasar + (color.tambahan_harga || 0),
          });
        });
      } else {
        // Product without valid colors
        transformedData.push({
          product_id: product.product_id,
          brand_nama: product.brand.nama,
          product_nama: product.product.nama,
          product_jenis: product.product.jenis,
          product_deskripsi: product.product.deskripsi,
          harga_dasar: product.product.harga_dasar,
          color_id: null,
          warna: null,
          stok: 0,
          level: null,
          kategori: null,
          tambahan_harga: 0,
          harga_total: product.product.harga_dasar,
        });
      }
    } else {
      // Product without colors array
      transformedData.push({
        product_id: product.product_id,
        brand_nama: product.brand.nama,
        product_nama: product.product.nama,
        product_jenis: product.product.jenis,
        product_deskripsi: product.product.deskripsi,
        harga_dasar: product.product.harga_dasar,
        color_id: null,
        warna: null,
        stok: 0,
        level: null,
        kategori: null,
        tambahan_harga: 0,
        harga_total: product.product.harga_dasar,
      });
    }
  });

  return transformedData;
};

// Get unique values for filters
const uniqueBrands = computed(() => {
  const brands = new Set();
  productsList.value.forEach((product) => {
    if (currentProductType.value === "hair") {
      brands.add(product.brand_nama);
    } else {
      brands.add(product.brand?.nama);
    }
  });
  return Array.from(brands).filter(Boolean).sort();
});

const uniqueKategori = computed(() => {
  if (currentProductType.value !== "hair") return [];
  const kategori = new Set();
  productsList.value.forEach((product) => {
    if (product.kategori) kategori.add(product.kategori);
  });
  return Array.from(kategori).sort();
});

const uniqueLevels = computed(() => {
  if (currentProductType.value !== "hair") return [];
  const levels = new Set();
  productsList.value.forEach((product) => {
    if (product.level) levels.add(product.level);
  });
  return Array.from(levels).sort();
});

const uniqueJenis = computed(() => {
  if (currentProductType.value === "hair") return [];
  const jenis = new Set();
  productsList.value.forEach((product) => {
    if (product.product?.jenis) jenis.add(product.product.jenis);
  });
  return Array.from(jenis).sort();
});

// Fetch products based on current type
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Get token from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authentication token not found");
    }

    let url = "";
    if (currentProductType.value === "hair") {
      url = `${config.public.apiBaseUrl}/api/products/hair/products`;
    } else if (currentProductType.value === "smoothing") {
      url = `${config.public.apiBaseUrl}/api/admin/products/smoothing`;
    } else if (currentProductType.value === "keratin") {
      url = `${config.public.apiBaseUrl}/api/admin/products/keratin`;
    }

    const response = await fetch(url, {
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

    // Handle different response structures
    if (currentProductType.value === "hair") {
      // Hair colors API returns { success: true, data: [...] }
      const rawData = data.data || [];
      productsList.value = transformHairColorsData(rawData);
    } else {
      // Smoothing/Keratin APIs return { success: true, data: [...] }
      productsList.value = data.data || [];
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    error.value = err.message || "An error occurred while fetching products";
  } finally {
    loading.value = false;
  }
};

// Handle product type change
const onProductTypeChange = () => {
  resetFilters();
  fetchProducts();
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    brand: "",
    kategori: "",
    level: "",
    jenis: "",
    harga: "",
  };
};

// Computed property for filtered products
const filteredProducts = computed(() => {
  return productsList.value.filter((product) => {
    // Filter by brand
    if (filters.value.brand) {
      const brandName =
        currentProductType.value === "hair"
          ? product.brand_nama
          : product.brand?.nama;
      if (brandName !== filters.value.brand) return false;
    }

    // Hair-specific filters
    if (currentProductType.value === "hair") {
      if (
        filters.value.kategori &&
        product.kategori !== filters.value.kategori
      ) {
        return false;
      }
      if (filters.value.level && product.level !== filters.value.level) {
        return false;
      }
    } else {
      // Smoothing/Keratin-specific filters
      if (
        filters.value.jenis &&
        product.product?.jenis !== filters.value.jenis
      ) {
        return false;
      }
    }

    // Filter by price range
    if (filters.value.harga) {
      const price =
        currentProductType.value === "hair"
          ? product.harga_total || product.harga_dasar
          : product.product?.harga;

      if (filters.value.harga === "low" && price >= 300000) return false;
      if (
        filters.value.harga === "medium" &&
        (price < 300000 || price > 600000)
      )
        return false;
      if (filters.value.harga === "high" && price <= 600000) return false;
    }

    return true;
  });
});

// Open edit modal and populate form
const editProduct = (product) => {
  formData.value = { ...product };
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
    // Implementation for create/update
    console.log("Submitting product:", formData.value);
    // Add your API call here
  } catch (err) {
    console.error("Error submitting product:", err);
  } finally {
    isSubmitting.value = false;
    closeModals();
  }
};

// Delete product
const deleteProductConfirm = async () => {
  if (!deleteProduct.value) return;
  isSubmitting.value = true;
  try {
    // Implementation for delete
    console.log("Deleting product:", deleteProduct.value);
    // Add your API call here
  } catch (err) {
    console.error("Error deleting product:", err);
  } finally {
    isSubmitting.value = false;
    showDeleteModal.value = false;
    deleteProduct.value = null;
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
