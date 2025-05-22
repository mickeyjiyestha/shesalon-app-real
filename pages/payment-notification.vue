<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white to-pink-50 flex items-center justify-center p-4"
  >
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in"
    >
      <!-- Processing Header -->
      <div class="p-6 text-center bg-gradient-to-r from-pink-500 to-pink-600">
        <div
          class="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center"
        >
          <svg
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
        <h2 class="text-2xl font-bold text-white mb-2">Processing Payment</h2>
        <p class="text-white/90">
          Please wait while we process your payment notification...
        </p>
      </div>

      <!-- Loading Animation -->
      <div class="p-8 text-center">
        <div class="flex justify-center mb-6">
          <div
            class="animate-spin rounded-full h-16 w-16 border-4 border-pink-100 border-t-pink-500"
          ></div>
        </div>

        <p class="text-gray-600 mb-8">
          This page handles payment notifications from Midtrans.<br />
          You will be redirected automatically.
        </p>

        <div class="space-y-4">
          <NuxtLink
            to="/"
            class="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md text-center"
          >
            Return to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const config = useRuntimeConfig();

const processPaymentNotification = async () => {
  try {
    // Get data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Extract parameters from URL
    const status = urlParams.get("transaction_status");
    const orderId = urlParams.get("order_id");
    const grossAmount = urlParams.get("gross_amount");

    if (status && orderId) {
      // You could send this data to your backend to update the transaction status
      // const response = await fetch(`${config.public.apiBaseUrl}/api/payment-notification`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     transaction_status: status,
      //     order_id: orderId,
      //     gross_amount: grossAmount
      //   })
      // });

      // Redirect to payment success page with parameters
      router.push({
        path: "/payment-success",
        query: {
          transaction_status: status,
          order_id: orderId,
          gross_amount: grossAmount,
          transaction_time: new Date().toISOString(),
        },
      });
    } else {
      // If no parameters, redirect to home after a delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  } catch (error) {
    console.error("Error processing payment notification:", error);
    // Redirect to home after a delay
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
};

onMounted(processPaymentNotification);
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
