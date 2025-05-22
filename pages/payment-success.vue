<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white to-pink-50 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Status Header -->
      <div
        class="p-6 text-center"
        :class="{
          'bg-gradient-to-r from-green-500 to-green-600':
            paymentStatus === 'settlement',
          'bg-gradient-to-r from-yellow-500 to-yellow-600':
            paymentStatus === 'pending',
          'bg-gradient-to-r from-red-500 to-red-600':
            paymentStatus === 'failed',
          'bg-gradient-to-r from-pink-500 to-pink-600': !paymentStatus,
        }"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center"
        >
          <svg
            v-if="paymentStatus === 'settlement'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else-if="paymentStatus === 'pending'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else-if="paymentStatus === 'failed'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">
          {{ statusTitle }}
        </h2>
        <p class="text-white/90">
          {{ statusMessage }}
        </p>
      </div>

      <!-- Payment Details -->
      <div class="p-6">
        <div v-if="loading" class="flex justify-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"
          ></div>
        </div>

        <div v-else>
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Payment Details
            </h3>
            <div class="space-y-3">
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Order ID</span>
                <span class="font-medium">{{ orderId || "-" }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Amount</span>
                <span class="font-medium">Rp {{ formatCurrency(amount) }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Payment Method</span>
                <span class="font-medium">{{
                  paymentMethod || "Online Payment"
                }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Date & Time</span>
                <span class="font-medium">{{
                  formatDateTime(transactionTime)
                }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <NuxtLink
              to="/profile/my-bookings"
              class="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md text-center"
            >
              View My Bookings
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 text-center"
            >
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(true);
const error = ref(null);

// Payment data
const paymentStatus = ref(null);
const orderId = ref(null);
const amount = ref(0);
const paymentMethod = ref(null);
const transactionTime = ref(null);

// Computed properties for status display
const statusTitle = computed(() => {
  switch (paymentStatus.value) {
    case "settlement":
      return "Payment Successful!";
    case "pending":
      return "Payment Pending";
    case "failed":
      return "Payment Failed";
    default:
      return "Processing Payment";
  }
});

const statusMessage = computed(() => {
  switch (paymentStatus.value) {
    case "settlement":
      return "Your booking has been confirmed. Thank you for choosing She Salon!";
    case "pending":
      return "Your payment is being processed. We'll update you once it's confirmed.";
    case "failed":
      return "There was an issue with your payment. Please try again or contact support.";
    default:
      return "We're checking your payment status. Please wait a moment...";
  }
});

// Format currency
const formatCurrency = (value) => {
  if (!value) return "0";
  return parseFloat(value).toLocaleString("id-ID");
};

// Format date and time
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "-";

  const date = new Date(dateTimeStr);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get payment data from URL or API
const getPaymentData = async () => {
  loading.value = true;

  try {
    // Get data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Extract parameters from URL
    const status = urlParams.get("transaction_status");
    const order = urlParams.get("order_id");
    const gross = urlParams.get("gross_amount");
    const time = urlParams.get("transaction_time");
    const payment = urlParams.get("payment_type");

    // If we have data from URL parameters
    if (status && order) {
      paymentStatus.value = status;
      orderId.value = order;
      amount.value = gross;
      transactionTime.value = time || new Date().toISOString();
      paymentMethod.value = payment || "Online Payment";

      // You could also verify this with your backend API
      // const config = useRuntimeConfig();
      // const response = await fetch(`${config.public.apiBaseUrl}/api/verify-payment/${order}`);
      // const data = await response.json();
      // Update values with verified data from backend
    } else {
      // If no URL parameters, try to get from route params or query
      paymentStatus.value = route.query.status || "pending";
      orderId.value = route.query.order_id || route.params.id;
      amount.value = route.query.amount || 0;
      transactionTime.value = route.query.time || new Date().toISOString();
      paymentMethod.value = route.query.payment_method || "Online Payment";
    }
  } catch (err) {
    console.error("Error getting payment data:", err);
    error.value = "Failed to load payment information";
  } finally {
    loading.value = false;
  }
};

// Initialize on component mount
onMounted(() => {
  getPaymentData();
});
</script>

<style scoped>
/* Animation for the success page */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
