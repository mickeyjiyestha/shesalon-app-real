<template>
  <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Products</h2>
      <button
        @click="refreshProducts"
        class="text-pink-500 text-sm hover:text-pink-700"
      >
        Refresh
      </button>
    </div>

    <!-- Debug Info -->
    <div class="mb-4 p-2 bg-yellow-100 rounded text-xs">
      <p>DEBUG: Loading = {{ loading }}</p>
      <p>DEBUG: Products count = {{ products.length }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"
      ></div>
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-24 object-cover rounded mb-2"
        />
        <h3 class="font-medium text-sm mb-1">{{ product.name }}</h3>
        <p class="text-xs text-gray-500 mb-1">{{ product.brand }}</p>
        <p class="font-bold text-pink-600 mb-2">
          Rp {{ formatCurrency(product.price) }}
        </p>
        <button
          @click="addToCart(product)"
          class="w-full bg-pink-500 text-white py-1 px-2 rounded text-xs hover:bg-pink-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-8 text-gray-500">
      <p class="text-sm">No products available</p>
      <button
        @click="loadProducts"
        class="mt-2 text-pink-500 text-sm hover:text-pink-700"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["add-to-cart"]);

const loading = ref(true);
const products = ref([]);

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Makarizo Hair Mask",
    brand: "MAKARIZO",
    price: 45000,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "L'Oreal Shampoo",
    brand: "L'OREAL",
    price: 65000,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "CBD Hair Oil",
    brand: "CBD",
    price: 85000,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Makarizo Conditioner",
    brand: "MAKARIZO",
    price: 50000,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "L'Oreal Hair Serum",
    brand: "L'OREAL",
    price: 75000,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "CBD Face Cream",
    brand: "CBD",
    price: 95000,
    image: "/placeholder.svg?height=120&width=120",
  },
];

const loadProducts = async () => {
  console.log("Loading products..."); // Debug log
  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    products.value = sampleProducts;
    console.log("Products loaded:", products.value); // Debug log
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    loading.value = false;
  }
};

const refreshProducts = () => {
  loadProducts();
};

const addToCart = (product) => {
  console.log("Product clicked:", product); // Debug log
  emit("add-to-cart", product);
};

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("id-ID");
};

onMounted(() => {
  console.log("ProductGrid mounted"); // Debug log
  loadProducts();
});
</script>
