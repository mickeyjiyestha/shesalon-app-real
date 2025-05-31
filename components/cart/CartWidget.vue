<template>
  <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Shopping Cart</h2>
      <div class="flex items-center gap-2">
        <span class="bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
          {{ cartItemCount }} items
        </span>
        <button
          @click="clearCart"
          class="text-red-500 text-sm hover:text-red-700"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Debug Info -->
    <div class="mb-4 p-2 bg-blue-100 rounded text-xs">
      <p>DEBUG: Cart initialized = {{ !!cart }}</p>
      <p>DEBUG: Cart items = {{ cartItems.length }}</p>
    </div>

    <!-- Cart Items -->
    <div v-if="cartItems.length > 0" class="space-y-3 max-h-64 overflow-y-auto">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <img
            :src="item.image || '/placeholder.svg?height=40&width=40'"
            :alt="item.name"
            class="w-10 h-10 rounded object-cover"
          />
          <div>
            <h4 class="font-medium text-sm">{{ item.name }}</h4>
            <p class="text-xs text-gray-500">
              Rp {{ formatCurrency(item.price) }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs hover:bg-gray-300"
          >
            -
          </button>
          <span class="text-sm font-medium w-8 text-center">{{
            item.quantity
          }}</span>
          <button
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs hover:bg-gray-300"
          >
            +
          </button>
          <button
            @click="removeItem(item.id)"
            class="ml-2 text-red-500 hover:text-red-700 text-xs"
          >
            ×
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-8 text-gray-500">
      <p class="text-sm">Cart is empty</p>
    </div>

    <!-- Cart Summary -->
    <div v-if="cartItems.length > 0" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">Subtotal:</span>
        <span class="font-medium">Rp {{ formatCurrency(cartSubtotal) }}</span>
      </div>
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">Tax (10%):</span>
        <span class="font-medium">Rp {{ formatCurrency(cartTax) }}</span>
      </div>
      <div class="flex justify-between items-center mb-4 text-lg font-bold">
        <span>Total:</span>
        <span>Rp {{ formatCurrency(cartTotal) }}</span>
      </div>

      <button
        @click="checkout"
        class="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Cart state
const cartItems = ref([]);
let cart = null;

// Initialize cart without cart.js for now (to test basic functionality)
onMounted(async () => {
  console.log("CartWidget mounted"); // Debug log

  // Simple cart implementation without external library
  cart = {
    items: () => cartItems.value,
    add: (item) => {
      const existingItem = cartItems.value.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        cartItems.value.push({ ...item, quantity: item.quantity || 1 });
      }
      console.log("Item added to cart:", item);
    },
    update: (itemId, updates) => {
      const item = cartItems.value.find((i) => i.id === itemId);
      if (item) {
        Object.assign(item, updates);
      }
    },
    remove: (itemId) => {
      const index = cartItems.value.findIndex((i) => i.id === itemId);
      if (index > -1) {
        cartItems.value.splice(index, 1);
      }
    },
    clear: () => {
      cartItems.value = [];
    },
  };
});

// Computed properties
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const cartSubtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const cartTax = computed(() => {
  return cartSubtotal.value * 0.1;
});

const cartTotal = computed(() => {
  return cartSubtotal.value + cartTax.value;
});

// Methods
const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity <= 0) {
    removeItem(itemId);
    return;
  }

  if (cart) {
    cart.update(itemId, { quantity: newQuantity });
  }
};

const removeItem = (itemId) => {
  if (cart) {
    cart.remove(itemId);
  }
};

const clearCart = () => {
  if (cart) {
    cart.clear();
  }
};

const checkout = () => {
  console.log("Checkout clicked:", {
    items: cartItems.value,
    total: cartTotal.value,
  });
};

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("id-ID");
};

// Expose methods to parent component
defineExpose({
  addToCart: (product) => {
    console.log("addToCart called with:", product);
    if (cart) {
      cart.add(product);
    }
  },
});
</script>
