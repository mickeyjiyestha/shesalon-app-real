<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <img src="/favicon.ico" alt="Logo" class="h-16 w-16" />
        </div>

        <div v-if="loading" class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
          ></div>
          <p class="mt-4 text-gray-600">Memuat detail pembayaran...</p>
        </div>

        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-500 text-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto"
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
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Terjadi Kesalahan
          </h2>
          <p class="text-gray-600">{{ error }}</p>
          <button
            @click="getPaymentData"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>

        <div v-else>
          <div class="text-center mb-6">
            <div
              v-if="paymentData.transaction_status === 'settlement'"
              class="text-green-500 text-xl mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto"
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
            </div>
            <div
              v-else-if="paymentData.transaction_status === 'pending'"
              class="text-yellow-500 text-xl mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto"
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
            </div>
            <div v-else class="text-red-500 text-xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto"
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
            </div>

            <h2 class="text-2xl font-bold text-gray-800">
              {{ getStatusTitle(paymentData.transaction_status) }}
            </h2>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <dl>
              <div
                class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-t-lg"
              >
                <dt class="text-sm font-medium text-gray-500">Order ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ paymentData.order_id }}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">Jumlah</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Rp {{ formatCurrency(paymentData.gross_amount) }}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Metode Pembayaran
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{
                    formatPaymentMethod(paymentData.payment_type, paymentData)
                  }}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Waktu Transaksi
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(paymentData.transaction_time) }}
                </dd>
              </div>
              <div
                v-if="paymentData.settlement_time"
                class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Waktu Pembayaran
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(paymentData.settlement_time) }}
                </dd>
              </div>
              <div
                v-if="
                  paymentData.va_numbers && paymentData.va_numbers.length > 0
                "
                class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Virtual Account
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ paymentData.va_numbers[0].bank.toUpperCase() }}:
                  {{ paymentData.va_numbers[0].va_number }}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-b-lg"
              >
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <span :class="getStatusClass(paymentData.transaction_status)">
                    {{ getStatusText(paymentData.transaction_status) }}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-6 flex justify-center">
            <NuxtLink
              to="/profile/my-bookings"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Lihat Booking Saya
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  middleware: "auth",
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const paymentData = ref(null);
    const orderId = ref("");
    const paymentStatus = ref("");
    const amount = ref(0);
    const transactionTime = ref("");
    const paymentMethod = ref("");
    const isDownPayment = ref(false);
    const totalPrice = ref(0);

    onMounted(() => {
      getPaymentData();
    });

    // Get payment data from URL and then fetch from Midtrans API
    const getPaymentData = async () => {
      loading.value = true;

      try {
        // Get order_id from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderIdFromUrl = urlParams.get("order_id");

        if (!orderIdFromUrl) {
          console.error("No order_id found in URL");
          loading.value = false;
          return;
        }

        orderId.value = orderIdFromUrl;

        // Midtrans server key (encoded for Basic Auth)
        const serverKey = "SB-Mid-server-sGgwR0-jQD0jlZaMT0jy6jGL";
        const encodedKey = btoa(`${serverKey}:`);

        // Fetch transaction data directly from Midtrans API
        const response = await fetch(
          `https://api.sandbox.midtrans.com/v2/${orderIdFromUrl}/status`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Basic ${encodedKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Update payment data from API response
        paymentStatus.value = data.transaction_status;
        amount.value = parseFloat(data.gross_amount || 0);
        transactionTime.value = data.transaction_time;

        // Check if this is a down payment (30%)
        // You might need to adjust this logic based on your business rules
        isDownPayment.value =
          orderIdFromUrl.includes("DP") ||
          data.custom_field1 === "down_payment";

        // Calculate total price (if down payment, it's amount / 0.3)
        if (isDownPayment.value) {
          totalPrice.value = Math.round(amount.value / 0.3);
        } else {
          totalPrice.value = amount.value;
        }

        // Get payment type and map to readable format
        const paymentType = data.payment_type;
        switch (paymentType) {
          case "credit_card":
            paymentMethod.value = "Credit Card";
            break;
          case "bank_transfer":
            const bank =
              data.va_numbers && data.va_numbers.length > 0
                ? data.va_numbers[0].bank
                : null;
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

    const formatCurrency = (amount) => {
      return parseFloat(amount).toLocaleString("id-ID");
    };

    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const formatPaymentMethod = (type, data) => {
      const methods = {
        bank_transfer: () => {
          if (data.va_numbers && data.va_numbers.length > 0) {
            return `Transfer Bank ${data.va_numbers[0].bank.toUpperCase()}`;
          }
          return "Transfer Bank";
        },
        credit_card: () => "Kartu Kredit",
        gopay: () => "GoPay",
        shopeepay: () => "ShopeePay",
        qris: () => "QRIS",
        cstore: () => {
          if (data.store === "indomaret") return "Indomaret";
          if (data.store === "alfamart") return "Alfamart";
          return "Convenience Store";
        },
      };

      return methods[type]
        ? methods[type]()
        : type.replace("_", " ").toUpperCase();
    };

    const getStatusText = (status) => {
      const statuses = {
        settlement: "Pembayaran Berhasil",
        capture: "Pembayaran Berhasil",
        pending: "Menunggu Pembayaran",
        deny: "Pembayaran Ditolak",
        cancel: "Pembayaran Dibatalkan",
        expire: "Pembayaran Kadaluarsa",
        refund: "Pembayaran Dikembalikan",
      };

      return statuses[status] || status;
    };

    const getStatusClass = (status) => {
      const classes = {
        settlement:
          "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800",
        capture:
          "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800",
        pending:
          "px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800",
        deny: "px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800",
        cancel:
          "px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800",
        expire:
          "px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800",
        refund:
          "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800",
      };

      return (
        classes[status] ||
        "px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
      );
    };

    const getStatusTitle = (status) => {
      const titles = {
        settlement: "Pembayaran Berhasil",
        capture: "Pembayaran Berhasil",
        pending: "Menunggu Pembayaran",
        deny: "Pembayaran Ditolak",
        cancel: "Pembayaran Dibatalkan",
        expire: "Pembayaran Kadaluarsa",
        refund: "Pembayaran Dikembalikan",
      };

      return titles[status] || "Detail Pembayaran";
    };

    return {
      loading,
      error,
      paymentData,
      getPaymentData,
      formatCurrency,
      formatDate,
      formatPaymentMethod,
      getStatusText,
      getStatusClass,
      getStatusTitle,
      orderId,
      paymentStatus,
      amount,
      transactionTime,
      paymentMethod,
      isDownPayment,
      totalPrice,
    };
  },
};
</script>
