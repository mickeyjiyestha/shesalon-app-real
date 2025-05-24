<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white to-pink-50 flex items-center justify-center p-4"
  >
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up"
    >
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
        <div class="mb-4">
          <!-- Success Animation -->
          <div
            v-if="paymentStatus === 'settlement' || paymentStatus === 'capture'"
            class="success-animation"
          >
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <!-- Pending Animation -->
          <div
            v-else-if="paymentStatus === 'pending'"
            class="pending-animation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              width="100"
              height="100"
            >
              <circle
                class="pending-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#FFC107"
                stroke-width="2"
              />
              <path
                class="pending-clock-hour"
                d="M26 26 L26 16"
                stroke="#FFC107"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                class="pending-clock-minute"
                d="M26 26 L32 32"
                stroke="#FFC107"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Failed Animation -->
          <div
            v-else-if="
              paymentStatus === 'deny' ||
              paymentStatus === 'cancel' ||
              paymentStatus === 'expire'
            "
            class="failed-animation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              width="100"
              height="100"
            >
              <circle
                class="failed-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#F44336"
                stroke-width="2"
              />
              <line
                class="failed-line1"
                x1="16"
                y1="16"
                x2="36"
                y2="36"
                stroke="#F44336"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                class="failed-line2"
                x1="16"
                y1="36"
                x2="36"
                y2="16"
                stroke="#F44336"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Default Animation -->
          <div v-else class="default-animation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              width="100"
              height="100"
            >
              <circle
                class="default-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#F472B6"
                stroke-width="2"
              />
              <circle
                class="default-dot"
                cx="26"
                cy="26"
                r="5"
                fill="#F472B6"
              />
              <circle
                class="default-pulse"
                cx="26"
                cy="26"
                r="15"
                fill="none"
                stroke="#F472B6"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-white mb-2 animate-fade-in">
          {{ statusTitle }}
        </h2>
        <p class="text-white/90 animate-fade-in" style="animation-delay: 0.2s">
          {{ statusMessage }}
        </p>
      </div>

      <!-- Payment Details -->
      <div class="p-6">
        <div v-if="loading" class="flex justify-center py-8">
          <div class="loader">
            <div class="loader-circle"></div>
            <div class="loader-line-mask">
              <div class="loader-line"></div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-6 animate-fade-in">
          <div class="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Error Loading Payment Data
          </h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button
            @click="fetchPaymentData"
            class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>

        <div v-else>
          <!-- Booking Information -->
          <div class="mb-6 animate-slide-in" style="animation-delay: 0.1s">
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Booking Information
            </h3>
            <div class="space-y-3">
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Booking Number</span>
                <span class="font-medium">{{ bookingNumber }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Service</span>
                <span class="font-medium">{{ serviceName }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Date & Time</span>
                <span class="font-medium">{{ formatBookingDateTime }}</span>
              </div>
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Customer</span>
                <span class="font-medium">{{ customerName }}</span>
              </div>
              <div
                v-if="specialRequest"
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Special Request</span>
                <span class="font-medium">{{ specialRequest }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Details -->
          <div class="mb-6 animate-slide-in" style="animation-delay: 0.3s">
            <h3
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              Payment Details
            </h3>
            <div class="space-y-3">
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Order ID</span>
                <span class="font-medium">{{ orderId }}</span>
              </div>

              <!-- Total Price Section -->
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Total Price</span>
                <span class="font-medium text-gray-800"
                  >Rp {{ formatCurrency(totalPrice) }}</span
                >
              </div>

              <!-- Down Payment Amount -->
              <div
                v-if="isDownPayment"
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Down Payment (30%)</span>
                <span class="font-medium text-pink-600"
                  >Rp {{ formatCurrency(amountPaid) }}</span
                >
              </div>

              <!-- Amount Paid -->
              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600 font-medium">Amount Paid</span>
                <span class="font-bold text-lg highlight-amount"
                  >Rp {{ formatCurrency(amountPaid) }}</span
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
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Payment Method</span>
                <span class="font-medium">{{ paymentMethod }}</span>
              </div>

              <div
                v-if="paymentBank"
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Bank</span>
                <span class="font-medium uppercase">{{ paymentBank }}</span>
              </div>

              <div
                v-if="vaNumber"
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">VA Number</span>
                <span class="font-medium">{{ vaNumber }}</span>
              </div>

              <div
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Transaction Time</span>
                <span class="font-medium">{{
                  formatDateTime(transactionTime)
                }}</span>
              </div>

              <div
                v-if="settlementTime"
                class="flex justify-between items-center pb-2 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
              >
                <span class="text-gray-600">Settlement Time</span>
                <span class="font-medium">{{
                  formatDateTime(settlementTime)
                }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-4 animate-slide-in" style="animation-delay: 0.5s">
            <NuxtLink
              to="/profile/my-bookings"
              class="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md text-center button-pulse"
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
import { definePageMeta, useRoute } from "#imports";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";

definePageMeta({
  middleware: ["auth"],
});

const config = useRuntimeConfig();
const route = useRoute();
const loading = ref(true);
const error = ref(null);

// Payment data
const paymentStatus = ref(null);
const orderId = ref(null);
const bookingNumber = ref(null);
const amountPaid = ref(0);
const totalPrice = ref(0);
const paymentMethod = ref(null);
const transactionTime = ref(null);
const settlementTime = ref(null);
const isDownPayment = ref(false);
const serviceName = ref(null);
const bookingDate = ref(null);
const bookingTime = ref(null);
const customerName = ref(null);
const specialRequest = ref(null);
const paymentBank = ref(null);
const vaNumber = ref(null);

// Fetch payment data from API
const fetchPaymentData = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Get order ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = urlParams.get("order_id") || route.query.order_id;

    if (!orderIdFromUrl) {
      throw new Error("Order ID not found in URL parameters");
    }

    // Get token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Fetch payment data from API
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/transaksi/status/${orderIdFromUrl}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payment data");
    }

    const data = await response.json();
    console.log("Payment data:", data);

    // Set payment data from API response
    if (data.midtrans_data) {
      paymentStatus.value = data.midtrans_data.transaction_status;
      orderId.value = data.midtrans_data.order_id;
      transactionTime.value = data.midtrans_data.transaction_time;
      settlementTime.value = data.midtrans_data.settlement_time;

      // Get payment method details
      paymentMethod.value = formatPaymentMethod(
        data.midtrans_data.payment_type
      );

      // Get bank and VA number if available
      if (
        data.midtrans_data.va_numbers &&
        data.midtrans_data.va_numbers.length > 0
      ) {
        paymentBank.value = data.midtrans_data.va_numbers[0].bank;
        vaNumber.value = data.midtrans_data.va_numbers[0].va_number;
      }
    }

    if (data.local_data) {
      bookingNumber.value = data.local_data.booking_number;
      totalPrice.value = parseFloat(data.local_data.total_harga);

      // Check if this is a down payment
      isDownPayment.value = parseFloat(data.local_data.dp_amount) > 0;

      // Set booking details
      bookingDate.value = data.local_data.booking_date;
      bookingTime.value = data.local_data.jam_mulai;
      customerName.value = data.local_data.user_name;
      serviceName.value = data.local_data.layanan_nama;
      specialRequest.value = data.local_data.special_request;

      // Set payment method if not already set
      if (!paymentMethod.value) {
        paymentMethod.value = data.local_data.metode_pembayaran;
      }
    }

    if (data.summary) {
      amountPaid.value = parseFloat(data.summary.amount_paid);

      // If payment status not set from midtrans_data
      if (!paymentStatus.value) {
        paymentStatus.value =
          data.summary.payment_status === "success" ? "settlement" : "pending";
      }
    }
  } catch (err) {
    console.error("Error fetching payment data:", err);
    error.value = err.message || "Failed to load payment data";
  } finally {
    loading.value = false;
  }
};

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
  return totalPrice.value - amountPaid.value;
});

const formatBookingDateTime = computed(() => {
  if (!bookingDate.value) return "-";

  const date = formatDate(bookingDate.value);
  const time = bookingTime.value ? formatTime(bookingTime.value) : "";

  return `${date} ${time}`;
});

// Format currency
const formatCurrency = (value) => {
  if (!value) return "0";
  return parseFloat(value).toLocaleString("id-ID");
};

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format time
const formatTime = (timeStr) => {
  if (!timeStr) return "";

  // If time is in format "HH:MM:SS", extract just HH:MM
  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    return `${parts[0]}:${parts[1]}`;
  }
  return timeStr;
};

// Format date and time
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "-";

  // Check if the date is in "YYYY-MM-DD HH:MM:SS" format
  if (dateTimeStr.includes(" ")) {
    const [datePart, timePart] = dateTimeStr.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Otherwise, assume it's a standard date string
  const date = new Date(dateTimeStr);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format payment method to be more readable
const formatPaymentMethod = (paymentType) => {
  if (!paymentType) return "Online Payment";

  switch (paymentType) {
    case "credit_card":
      return "Credit Card";
    case "bank_transfer":
      return "Bank Transfer";
    case "echannel":
      return "Mandiri Bill";
    case "gopay":
      return "GoPay";
    case "shopeepay":
      return "ShopeePay";
    case "qris":
      return "QRIS";
    default:
      return paymentType
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
  }
};

// Initialize on component mount
onMounted(() => {
  fetchPaymentData();
});
</script>

<style scoped>
/* Page Animation */
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Success Animation - FIXED */
.success-animation {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #ffffff;
  stroke-miterlimit: 10;
  animation: scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #ffffff;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #ffffff;
  stroke-width: 3;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

/* Pending Animation */
.pending-animation {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.pending-circle {
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  animation: pendingCircle 2s linear infinite;
}

@keyframes pendingCircle {
  0% {
    stroke-dashoffset: 157;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.pending-clock-hour {
  transform-origin: 26px 26px;
  animation: rotateHour 6s linear infinite;
}

.pending-clock-minute {
  transform-origin: 26px 26px;
  animation: rotateMinute 1s linear infinite;
}

@keyframes rotateHour {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateMinute {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Failed Animation */
.failed-animation {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.failed-circle {
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
  animation: failedCircle 1s ease-in-out forwards;
}

@keyframes failedCircle {
  0% {
    stroke-dashoffset: 157;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.failed-line1 {
  stroke-dasharray: 28;
  stroke-dashoffset: 28;
  animation: failedLine 0.5s ease-in-out 0.6s forwards;
}

.failed-line2 {
  stroke-dasharray: 28;
  stroke-dashoffset: 28;
  animation: failedLine 0.5s ease-in-out 0.9s forwards;
}

@keyframes failedLine {
  0% {
    stroke-dashoffset: 28;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Default Animation */
.default-animation {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.default-circle {
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  animation: defaultCircle 2s ease-in-out infinite;
}

@keyframes defaultCircle {
  0%,
  100% {
    stroke-opacity: 1;
  }
  50% {
    stroke-opacity: 0.5;
  }
}

.default-dot {
  animation: defaultDot 1.5s ease-in-out infinite;
}

@keyframes defaultDot {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.default-pulse {
  stroke-dasharray: 94;
  stroke-dashoffset: 94;
  animation: defaultPulse 2s ease-in-out infinite;
}

@keyframes defaultPulse {
  0% {
    stroke-dashoffset: 94;
    stroke-opacity: 1;
    transform: scale(0.8);
  }
  50% {
    stroke-opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    stroke-opacity: 0;
    transform: scale(1.2);
  }
}

/* Loading Animation */
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}

.loader-circle {
  width: 48px;
  height: 48px;
  position: absolute;
  border-radius: 50%;
  background: #f472b6;
  opacity: 0.7;
  animation: loaderBounce 2s infinite ease-in-out;
}

.loader-line-mask {
  position: absolute;
  left: 24px;
  top: 0;
  width: 24px;
  height: 48px;
  overflow: hidden;
  transform-origin: 0 center;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  animation: rotate 1.5s infinite linear;
}

.loader-line {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid transparent;
  border-top-color: #f472b6;
  animation: rotate 1.5s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loaderBounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

/* Highlight Amount Animation */
.highlight-amount {
  animation: highlightAmount 2s ease-in-out;
}

@keyframes highlightAmount {
  0%,
  100% {
    color: #111827;
  }
  50% {
    color: #ec4899;
  }
}

/* Button Pulse Animation */
.button-pulse {
  animation: buttonPulse 2s infinite;
}

@keyframes buttonPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(236, 72, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
  }
}
</style>
