<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-6">
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm"
        @click="close"
      ></div>

      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10 z-10"
      >
        <h2 class="text-3xl font-bold mb-8 text-gray-800">
          Book Your Appointment
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Booking Form - Left Side -->
          <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2"
                >Pick a Date</label
              >
              <div class="calendar-wrapper bg-white rounded-xl">
                <ClientOnly>
                  <Calendar
                    v-model="selectedDate"
                    :min-date="new Date()"
                    :attributes="attributes"
                    class="custom-calendar"
                    is-expanded
                    borderless
                    @dayclick="onDateSelect"
                  />
                </ClientOnly>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Choose Time</label
                >
                <div class="relative">
                  <select
                    v-model="bookingTime"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select available time</option>
                    <option
                      v-for="time in availableTimes"
                      :key="time"
                      :value="time"
                    >
                      {{ time }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Service Selection -->
              <div v-if="isServicesLoaded">
                <div
                  v-for="(service, index) in selectedServices"
                  :key="index"
                  class="mb-4"
                >
                  <label class="block text-gray-700 text-sm font-medium mb-2">
                    Service {{ index + 1 }}
                  </label>
                  <div class="relative">
                    <select
                      v-model="selectedServices[index]"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                      @change="checkServiceCategory(index)"
                    >
                      <option value="">Pilih Service</option>
                      <option
                        v-for="service in getAvailableServices(index)"
                        :key="service.id"
                        :value="service.id"
                      >
                        {{ service.nama }}
                      </option>
                    </select>
                    <div
                      class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                    >
                      <svg
                        class="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Brand Selection Box -->
                  <div v-if="shouldShowProducts(index)" class="mt-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                      Pilih Brand untuk Service {{ index + 1 }}
                    </label>
                    <div class="relative">
                      <select
                        v-model="selectedBrands[index]"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                        @change="onBrandSelect(index)"
                      >
                        <option value="">Pilih Brand</option>
                        <option
                          v-for="brand in getUniqueBrands(index)"
                          :key="brand.id"
                          :value="brand.id"
                        >
                          {{ brand.nama }}
                        </option>
                      </select>
                      <div
                        class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                      >
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Product Selection Box -->
                  <div v-if="selectedBrands[index]" class="mt-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                      Pilih Produk untuk Service {{ index + 1 }}
                    </label>
                    <div class="relative">
                      <select
                        v-model="selectedProducts[index]"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                        @change="onProductSelect(index)"
                      >
                        <option value="">Pilih Produk</option>
                        <option
                          v-for="product in getProductsByBrand(index)"
                          :key="product.product_id"
                          :value="product.product_id"
                        >
                          {{ product.product.nama }} -
                          {{ product.product.jenis }}
                        </option>
                      </select>
                      <div
                        class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                      >
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Color Selection Box -->
                  <div
                    v-if="
                      selectedProducts[index] &&
                      availableColors[index]?.length > 0
                    "
                    class="mt-4"
                  >
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                      Pilih Warna untuk Service {{ index + 1 }}
                    </label>
                    <div class="relative">
                      <select
                        v-model="selectedColors[index]"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Pilih Warna</option>
                        <option
                          v-for="color in availableColors[index]"
                          :key="color.color_id"
                          :value="color.color_id"
                        >
                          {{ color.nama }} - Level {{ color.level }} ({{
                            color.kategori
                          }})
                        </option>
                      </select>
                      <div
                        class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                      >
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addService"
                  class="mt-2 px-4 py-2 bg-[#F97474] text-white rounded-xl hover:bg-[#e65c5c] transition"
                  v-if="selectedServices.length < services.length"
                >
                  + Tambah Service
                </button>
              </div>

              <div class="mt-6">
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Special Request</label
                >
                <textarea
                  v-model="specialRequest"
                  rows="3"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  placeholder="Leave a message for the salon"
                ></textarea>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Payment Method</label
                >
                <div class="relative">
                  <select
                    v-model="paymentMethod"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select payment option</option>
                    <option
                      v-for="method in paymentMethods"
                      :key="method.id"
                      :value="method.id"
                    >
                      {{ method.nama }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Payment Type Radio Buttons - Only show for Cashless -->
                <div v-if="isCashlessSelected" class="mt-4">
                  <label class="block text-gray-700 text-sm font-medium mb-2"
                    >Payment Type</label
                  >
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentType"
                        value="dp"
                        class="form-radio text-[#F97474] focus:ring-[#F97474]"
                      />
                      <span class="ml-2">DP</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentType"
                        value="lunas"
                        class="form-radio text-[#F97474] focus:ring-[#F97474]"
                      />
                      <span class="ml-2">Lunas</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-1">
            <div class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Payment Summary
              </h3>

              <div class="mb-4">
                <p class="text-gray-600">Selected Date:</p>
                <p class="font-medium">{{ formattedSelectedDate }}</p>
              </div>

              <div class="mb-4">
                <p class="text-gray-600">Selected Time:</p>
                <p class="font-medium">{{ bookingTime || "---" }}</p>
              </div>

              <div v-if="selectedServices.length > 0" class="space-y-4">
                <div
                  v-for="(serviceId, index) in selectedServices"
                  :key="serviceId"
                  class="flex flex-col gap-2"
                  v-if="serviceId && getServiceById(serviceId)"
                >
                  <!-- Base Service -->
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium text-gray-800">
                        {{ getServiceById(serviceId)?.nama }}
                        <span class="block text-sm text-gray-500"
                          >Base Price</span
                        >
                      </p>
                    </div>
                    <p class="font-medium text-gray-800">
                      Rp{{
                        Number(
                          getServiceById(serviceId)?.harga
                        ).toLocaleString()
                      }}
                    </p>
                  </div>

                  <!-- Selected Product and Color (if applicable) -->
                  <div
                    v-if="getSelectedColor(index)"
                    class="flex justify-between items-start pl-4 border-l-2 border-gray-200"
                  >
                    <div>
                      <p class="text-sm text-gray-600">
                        {{ getSelectedProduct(index)?.product?.nama }} -
                        {{ getSelectedColor(index)?.nama }}
                      </p>
                    </div>
                    <p class="text-sm font-medium text-gray-800">
                      + Rp{{
                        getAdditionalPrice(serviceId, index).toLocaleString()
                      }}
                    </p>
                  </div>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="font-semibold text-gray-800">Total</p>
                    <p class="font-semibold text-gray-800">
                      Rp{{ totalPrice.toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <p class="text-gray-500">Select a service to see the summary</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-8">
          <button
            @click="close"
            class="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="submitBooking"
            class="px-6 py-3 bg-[#F97474] text-white rounded-xl font-medium hover:bg-[#ff5757] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
            :disabled="!isFormValid"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showMidtransModal && isCashlessSelected"
    class="fixed inset-0 z-[60] flex items-center justify-center"
  >
    <div class="fixed inset-0 bg-black/60" @click="closeMidtransModal"></div>
    <div class="relative z-[70] w-full max-w-md">
      <iframe
        ref="midtransFrame"
        :src="midtransUrl"
        class="w-full h-[600px] rounded-lg"
        frameborder="0"
        allow="accelerometer; autoplay; camera; encrypted-media; geolocation; gyroscope; payment; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
import Cookies from "js-cookie";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const selectedDate = ref(new Date());
const bookingTime = ref("");
const selectedServices = ref([""]);
const isServicesLoaded = ref(false);
const paymentMethod = ref("");
const paymentType = ref("");
const services = ref([]);
const paymentMethods = ref([]);
const selectedBrands = ref([]);
const selectedProducts = ref([]);
const selectedColors = ref([]);
const products = ref([]);
const availableColors = ref([]);
const specialRequest = ref("");

const showMidtransModal = ref(false);
const midtransUrl = ref("");
const currentTransactionId = ref(null);
const midtransFrame = ref(null);

const shouldShowProducts = (index) => {
  const serviceId = selectedServices.value[index];
  if (!serviceId) return false;

  const service = services.value.find((s) => s.id === serviceId);
  return service && [2, 3, 4].includes(service.kategori_id);
};

const isCategorySelected = (categoryId) => {
  return selectedServices.value.some((serviceId, currentIndex) => {
    const service = services.value.find((s) => s.id === serviceId);
    return service && service.kategori_id === categoryId;
  });
};

const getUniqueBrands = (index) => {
  if (!products.value[index]) return [];
  const uniqueBrands = [];
  const brandIds = new Set();

  products.value[index].forEach((product) => {
    if (!brandIds.has(product.brand.id)) {
      brandIds.add(product.brand.id);
      uniqueBrands.push(product.brand);
    }
  });

  return uniqueBrands;
};

const getSelectedProduct = (index) => {
  if (!selectedProducts.value[index] || !products.value[index]) return null;
  return products.value[index].find(
    (product) => product.product_id === selectedProducts.value[index]
  );
};

const getSelectedColor = (index) => {
  if (!selectedColors.value[index] || !availableColors.value[index])
    return null;
  return availableColors.value[index].find(
    (color) => color.color_id === selectedColors.value[index]
  );
};

const getAdditionalPrice = (serviceId, index) => {
  const service = getServiceById(serviceId);
  if (!service || ![2, 3, 4].includes(service.kategori_id)) return 0;

  const selectedColor = getSelectedColor(index);
  if (!selectedColor) return 0;

  // Calculate additional price (total price minus base price)
  return selectedColor.harga_total - Number(service.harga);
};

const getServicePrice = (serviceId, index) => {
  const service = getServiceById(serviceId);
  if (!service) return 0;

  const basePrice = Number(service.harga);

  // For hair coloring services (categories 2, 3, 4)
  if ([2, 3, 4].includes(service.kategori_id)) {
    const selectedColor = getSelectedColor(index);
    if (selectedColor) {
      // Return the sum of base service price and product's total price
      return basePrice + selectedColor.harga_total;
    }
  }

  return basePrice;
};

const getProductsByBrand = (index) => {
  if (!products.value[index] || !selectedBrands.value[index]) return [];
  return products.value[index].filter(
    (product) => product.brand.id === selectedBrands.value[index]
  );
};

const onBrandSelect = (index) => {
  // Reset product and color selection when brand changes
  selectedProducts.value[index] = "";
  selectedColors.value[index] = "";
  availableColors.value[index] = [];
};

const onProductSelect = (index) => {
  // Reset color selection when product changes
  selectedColors.value[index] = "";

  if (selectedProducts.value[index]) {
    const selectedProduct = products.value[index].find(
      (product) => product.product_id === selectedProducts.value[index]
    );

    if (selectedProduct && Array.isArray(selectedProduct.available_colors)) {
      availableColors.value[index] = selectedProduct.available_colors;
    } else {
      availableColors.value[index] = [];
    }
  } else {
    availableColors.value[index] = [];
  }
};

const checkServiceCategory = async (index) => {
  const serviceId = selectedServices.value[index];
  if (!serviceId) {
    products.value[index] = [];
    selectedBrands.value[index] = "";
    selectedProducts.value[index] = "";
    selectedColors.value[index] = "";
    return;
  }

  const service = services.value.find((s) => s.id === serviceId);

  const isAlreadySelected = selectedServices.value.some(
    (otherServiceId, otherIndex) => {
      if (index === otherIndex) return false;
      const otherService = services.value.find((s) => s.id === otherServiceId);
      return otherService && otherService.kategori_id === service.kategori_id;
    }
  );

  if (isAlreadySelected) {
    alert("Service dengan kategori yang sama sudah dipilih");
    selectedServices.value[index] = "";
    return;
  }

  if (service && [2, 3, 4].includes(service.kategori_id)) {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${API_BASE_URL}/api/products/hair/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      products.value[index] = result.data;

      selectedBrands.value[index] = "";
      selectedProducts.value[index] = "";
      selectedColors.value[index] = "";
    } catch (error) {
      console.error("Error fetching products:", error);
      products.value[index] = [];
    }
  } else {
    products.value[index] = [];
    selectedBrands.value[index] = "";
    selectedProducts.value[index] = "";
    selectedColors.value[index] = "";
  }
};

const navigateToHome = () => {
  try {
    window.top.location.href = "/";
  } catch (e) {
    try {
      window.location.replace("/");
    } catch (e2) {
      window.location.href = "/";
    }
  }
};

const setupMidtransCallback = () => {
  window.addEventListener("message", handleMidtransCallback);
};

const handleMidtransCallback = async (event) => {
  if (event.origin !== "https://app.sandbox.midtrans.com") return;

  const data = event.data;

  if (data?.transaction_status) {
    console.log("Midtrans transaction callback:", data);
    showMidtransModal.value = false;
    selectedServices.value = [""];
    paymentMethod.value = "";
    paymentType.value = "";
    bookingTime.value = "";
    selectedDate.value = new Date();

    alert(
      `Pembayaran ${
        data.transaction_status === "settlement" ? "berhasil" : "dalam proses"
      }`
    );

    emit("submit", {
      status: data.transaction_status,
      order_id: data.order_id,
      gross_amount: data.gross_amount,
    });

    navigateToHome();
  }
};

const cleanupMidtransCallback = () => {
  window.removeEventListener("message", handleMidtransCallback);
};

const isCashlessSelected = computed(() => {
  if (!Array.isArray(paymentMethods.value)) return false;
  const selectedMethod = paymentMethods.value.find(
    (method) => method.id === paymentMethod.value
  );
  return selectedMethod?.nama === "Cashless";
});

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return "---";
  return new Date(selectedDate.value).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const totalPrice = computed(() => {
  return selectedServices.value.reduce((sum, serviceId, index) => {
    if (!serviceId) return sum;
    return sum + getServicePrice(serviceId, index);
  }, 0);
});

const isFormValid = computed(() => {
  return (
    selectedDate.value &&
    bookingTime.value &&
    selectedServices.value.every((service) => service !== "") &&
    paymentMethod.value &&
    (!isCashlessSelected.value || paymentType.value)
  );
});

const attributes = [
  {
    key: "selected",
    dot: true,
    dates: new Date(),
    customData: "selected",
  },
];

const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const createMidtransTransaction = async (bookingId) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_BASE_URL}/api/transaksi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        booking_id: bookingId,
        kategori_transaksi_id: isCashlessSelected.value ? 2 : 1,
        ...(isCashlessSelected.value && { is_dp: paymentType.value === "dp" }),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to create transaction");
    }

    currentTransactionId.value = result.transaction_id;
    return result;
  } catch (error) {
    console.error("Error creating Midtrans transaction:", error);
    throw error;
  }
};

const closeMidtransModal = () => {
  showMidtransModal.value = false;
  midtransUrl.value = "";
  currentTransactionId.value = null;
  cleanupMidtransCallback();
  close();
  navigateToHome();
};

const close = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  selectedDate.value = new Date();
  bookingTime.value = "";
  selectedServices.value = [""];
  selectedBrands.value = [];
  selectedProducts.value = [];
  selectedColors.value = [];
  paymentMethod.value = "";
  paymentType.value = "";
};

const onDateSelect = (date) => {
  selectedDate.value = date.date;
};

const getServiceById = (id) => {
  if (!services.value) return null;
  return services.value.find((s) => s.id === id);
};

const addService = () => {
  selectedServices.value.push("");
  selectedProducts.value.push("");
  selectedBrands.value.push("");
  selectedColors.value.push("");
};

const formatDateForAPI = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getAvailableServices = (currentIndex) => {
  // Create a set of already selected service IDs (excluding the current index)
  const selectedIds = new Set();
  selectedServices.value.forEach((serviceId, index) => {
    if (index !== currentIndex && serviceId) {
      selectedIds.add(serviceId);
    }
  });

  // Return services that haven't been selected yet
  return services.value.filter((service) => !selectedIds.has(service.id));
};

const formatTimeForAPI = (time) => {
  return `${time}:00`;
};

const submitBooking = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    if (
      !selectedDate.value ||
      !bookingTime.value ||
      selectedServices.value.includes("")
    ) {
      alert("Lengkapi semua data booking.");
      return;
    }

    const hasIncompleteHairColorService = selectedServices.value.some(
      (serviceId, index) => {
        const service = getServiceById(serviceId);
        return (
          service &&
          [2, 3, 4].includes(service.kategori_id) &&
          (!selectedBrands.value[index] || !selectedColors.value[index])
        );
      }
    );

    if (hasIncompleteHairColorService) {
      alert("Untuk layanan pewarnaan rambut, harap pilih brand dan warna.");
      return;
    }

    const bookingPayload = {
      layanan_id: selectedServices.value.filter((id) => id !== ""),
      tanggal: formatDateForAPI(selectedDate.value),
      jam_mulai: formatTimeForAPI(bookingTime.value),
      special_request: specialRequest.value,
    };

    const colorServiceIndex = selectedServices.value.findIndex((serviceId) => {
      const service = getServiceById(serviceId);
      return service && [2, 3, 4].includes(service.kategori_id);
    });

    if (colorServiceIndex !== -1) {
      bookingPayload.hair_color = {
        color_id: selectedColors.value[colorServiceIndex],
        brand_id: selectedBrands.value[colorServiceIndex],
      };
    }

    // Create booking
    const response = await fetch(`${API_BASE_URL}/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(bookingPayload),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Gagal melakukan booking.");
    }

    // Create transaction
    try {
      const transactionResult = await createMidtransTransaction(
        result.booking_id
      );

      // For cash payments, show success message and close modal
      if (!isCashlessSelected.value) {
        alert(`✅ Booking berhasil dibuat (#${result.booking_number})`);
        close();
        navigateToHome();
        return;
      }

      // For cashless payments, show Midtrans modal
      midtransUrl.value = transactionResult.snap_url;
      showMidtransModal.value = true;
      setupMidtransCallback();
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Gagal membuat transaksi pembayaran. Silakan coba lagi.");
      navigateToHome();
    }
  } catch (error) {
    console.error("Error saat booking:", error);
    alert(error.message || "Terjadi kesalahan saat booking.");
  }
};

onMounted(async () => {
  try {
    const token = Cookies.get("token");

    const servicesResponse = await fetch(`${API_BASE_URL}/api/layanan`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    const servicesResult = await servicesResponse.json();
    services.value = servicesResult;
    isServicesLoaded.value = true;

    const paymentMethodsResponse = await fetch(
      `${API_BASE_URL}/api/transaksikategori`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const paymentMethodsResult = await paymentMethodsResponse.json();
    paymentMethods.value = paymentMethodsResult;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
});

onUnmounted(() => {
  window.removeEventListener("message", handleMidtransCallback);
});

watch(paymentMethod, () => {
  paymentType.value = "";
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      setupMidtransCallback();
    } else {
      window.removeEventListener("message", handleMidtransCallback);
    }
  }
);

watch(
  () => selectedProducts.value,
  (newSelectedProducts) => {
    newSelectedProducts.forEach((productId, index) => {
      ensureIndexExists(products, index);
      ensureIndexExists(availableColors, index);

      if (productId) {
        const selectedProduct = products.value[index].find(
          (product) => product.product_id === productId
        );
        if (
          selectedProduct &&
          Array.isArray(selectedProduct.available_colors)
        ) {
          availableColors.value[index] = selectedProduct.available_colors;
        } else {
          availableColors.value[index] = [];
        }
      } else {
        availableColors.value[index] = [];
      }
    });
  },
  { deep: true }
);

function ensureIndexExists(array, index) {
  if (!array.value[index]) {
    array.value[index] = [];
  }
}
</script>

<style>
.calendar-wrapper {
  position: relative;
  min-height: 400px;
  padding: 1rem;
  margin-left: -30px;
  border: 1px solid #e5e7eb;
  overflow: visible !important;
}

.custom-calendar {
  width: 100%;
  height: 100%;
}

.vc-container {
  --vc-color-white: #ffffff;
  --vc-font-family: inherit;
  --vc-rounded-lg: 1rem;
  --vc-header-padding: 20px 16px;
  --vc-header-title-color: #1f2937;
  --vc-color-gray-900: #1f2937;
  --vc-color-gray-700: #374151;
  --vc-color-gray-600: #4b5563;
  --vc-color-gray-400: #9ca3af;
  --vc-color-gray-300: #d1d5db;
  --vc-color-gray-100: #f3f4f6;
  border: none !important;
  border-radius: 1rem;
  overflow: visible !important;
}

.vc-pane-container {
  overflow: visible !important;
}

.vc-popover-content-wrapper {
  z-index: 50 !important;
  overflow: visible !important;
}

.vc-highlight {
  background-color: #f97474 !important;
}

.vc-day:hover {
  background-color: rgba(249, 116, 116, 0.1) !important;
}

.vc-day.is-today {
  background-color: rgba(249, 116, 116, 0.1) !important;
  font-weight: bold;
}

.vc-day.is-selected {
  background-color: #f97474 !important;
  color: white !important;
  font-weight: bold;
}

.vc-header {
  padding: 20px 16px !important;
  background-color: transparent !important;
  z-index: 10 !important;
}

.vc-title {
  color: var(--vc-header-title-color) !important;
  font-weight: 600 !important;
  position: relative !important;
  z-index: 10 !important;
}

.vc-weeks {
  padding: 12px !important;
}

.vc-day {
  height: 40px !important;
  border-radius: 0.75rem !important;
  transition: all 0.2s ease;
}
</style>
