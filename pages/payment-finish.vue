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
            paymentStatus === 'settlement' || paymentStatus === 'capture',
          'bg-gradient-to-r from-yellow-500 to-yellow-600':
            paymentStatus === 'pending',
          'bg-gradient-to-r from-red-500 to-red-600':
            paymentStatus === 'deny' ||
            paymentStatus === 'cancel' ||
            paymentStatus === 'expire',
          'bg-gradient-to-r from-pink-500 to-pink-600': !paymentStatus,
        }"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center"
        >
          <svg
            v-if="paymentStatus === 'settlement' || paymentStatus === 'capture'"
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
            v-else-if="
              paymentStatus === 'deny' ||
              paymentStatus === 'cancel' ||
              paymentStatus === 'expire'
            "
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

              <!-- Total Price Section -->
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Total Price</span>
                <span class="font-medium text-gray-800"
                  >Rp {{ formatCurrency(totalPrice) }}</span
                >
              </div>

              <!-- Down Payment Amount -->
              <div
                v-if="isDownPayment"
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600">Down Payment (30%)</span>
                <span class="font-medium text-pink-600"
                  >Rp {{ formatCurrency(amount) }}</span
                >
              </div>

              <!-- Amount Paid -->
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100"
              >
                <span class="text-gray-600 font-medium">Amount Paid</span>
                <span class="font-bold text-lg"
                  >Rp {{ formatCurrency(amount) }}</span
                >
              </div>

              <!-- Remaining Payment (if applicable) -->
              <div
                v-if="isDownPayment"
                class="flex justify-between items-center pb-2 border-b border-gray-100 bg-gray-50 p-2 rounded-lg"
              >
                <span class="text-gray-600">Remaining Payment</span>
                <span class="font-medium text-gray-800"
                  >Rp {{ formatCurrency(remainingAmount) }}</span
                >
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
                <span class="text-gray-600">Transaction Time</span>
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
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["auth"],
});

const loading = ref(true);

// Payment data
const paymentStatus = ref(null);
const orderId = ref(null);
const amount = ref(0);
const totalPrice = ref(0);
const paymentMethod = ref(null);
const transactionTime = ref(null);
const isDownPayment = ref(false);

// Computed properties for status display
const statusTitle = computed(() => {
  switch (paymentStatus.value) {
    case "settlement":
    case "capture":
      return "Payment Successful!";
    case "pending":
      return "Payment Pending";
    case "deny":
    case "cancel":
    case "expire":
      return "Payment Failed";
    default:
      return "Thank You";
  }
});

const statusMessage = computed(() => {
  switch (paymentStatus.value) {
    case "settlement":
    case "capture":
      return isDownPayment.value
        ? "Your down payment has been confirmed. Please pay the remaining amount at the salon."
        : "Your booking has been confirmed. Thank you for choosing She Salon!";
    case "pending":
      return "Your payment is being processed. We'll update you once it's confirmed.";
    case "deny":
      return "Your payment was declined. Please try a different payment method.";
    case "cancel":
      return "Your payment was cancelled. Please try again when you're ready.";
    case "expire":
      return "Your payment session has expired. Please make a new booking.";
    default:
      return "Thank you for your transaction at She Salon.";
  }
});

const remainingAmount = computed(() => {
  if (!isDownPayment.value) return 0;
  return totalPrice.value - amount.value;
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

// Get payment data from URL
const getPaymentData = () => {
  loading.value = true;

  try {
    // Get data from URL parameters (Midtrans finish URL parameters)
    const urlParams = new URLSearchParams(window.location.search);

    // Extract parameters from URL
    paymentStatus.value = urlParams.get("transaction_status");
    orderId.value = urlParams.get("order_id");
    amount.value = parseFloat(urlParams.get("gross_amount") || 0);
    transactionTime.value =
      urlParams.get("transaction_time") || new Date().toISOString();

    // Check if this is a down payment (30%)
    // If the order_id contains "DP" or we can determine from other parameters
    isDownPayment.value =
      urlParams.get("is_dp") === "true" ||
      urlParams.get("payment_type") === "cashless";

    // Calculate total price (if down payment, it's amount / 0.3)
    if (isDownPayment.value) {
      totalPrice.value = Math.round(amount.value / 0.3);
    } else {
      totalPrice.value = amount.value;
    }

    // Get payment type and map to readable format
    const paymentType = urlParams.get("payment_type");
    switch (paymentType) {
      case "credit_card":
        paymentMethod.value = "Credit Card";
        break;
      case "bank_transfer":
        const bank =
          urlParams.get("va_numbers[0].bank") || urlParams.get("bank");
        paymentMethod.value = bank
          ? `Bank Transfer (${bank.toUpperCase()})`
          : "Bank Transfer";
        break;
      case "echannel":
        paymentMethod.value = "Mandiri Bill";
        break;
      case "gopay":
        paymentMethod.value = "GoPay";
        break;
      case "shopeepay":
        paymentMethod.value = "ShopeePay";
        break;
      case "qris":
        paymentMethod.value = "QRIS";
        break;
      default:
        paymentMethod.value = paymentType
          ? paymentType
              .replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())
          : "Online Payment";
    }
  } catch (err) {
    console.error("Error getting payment data:", err);
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
