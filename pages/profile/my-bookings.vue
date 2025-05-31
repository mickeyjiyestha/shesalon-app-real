<template>
  <ProfileLayout>
    <div class="overflow-x-hidden">
      <h1
        class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-3"
      >
        <span
          class="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
          >My Bookings</span
        >
        <div
          class="h-px flex-1 bg-gradient-to-r from-pink-100 to-transparent"
        ></div>
      </h1>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-0 flex items-center justify-center text-pink-500 font-medium"
          >
            <span class="animate-pulse">Loading</span>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8 animate-fade-in"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
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
          <span>{{ error }}</span>
        </div>
      </div>

      <div v-else>
        <!-- Booking filters -->
        <div class="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
          <button
            v-for="status in [
              'All',
              'pending',
              'confirmed',
              'completed',
              'cancelled',
            ]"
            :key="status"
            @click="activeFilter = status"
            class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            :class="
              activeFilter === status
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-if="filteredBookings.length === 0"
          class="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 text-center"
        >
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 sm:h-10 sm:w-10 text-pink-500"
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
          </div>
          <h3 class="text-xl font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p class="text-gray-500 mb-6">
            You don't have any
            {{ activeFilter !== "All" ? activeFilter.toLowerCase() : "" }}
            bookings yet.
          </p>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Book a Service</span>
          </NuxtLink>
        </div>

        <!-- Bookings list -->
        <div v-else class="space-y-6">
          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div class="p-4 sm:p-6">
              <div
                class="flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-pink-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        class="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight"
                      >
                        {{ booking.layanan_names }}
                      </h3>
                      <p class="text-xs sm:text-sm text-gray-500">
                        #{{ booking.booking_number }}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-1 ml-0 sm:ml-13 mt-3">
                    <p
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400"
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
                      <span>{{ formatDate(booking.tanggal) }}</span>
                    </p>
                    <p
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400"
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
                      <span
                        >{{ formatTime(booking.jam_mulai) }} -
                        {{ formatTime(booking.jam_selesai) }}</span
                      >
                    </p>
                    <p
                      v-if="booking.special_request"
                      class="text-xs sm:text-sm md:text-base text-gray-600 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      <span>{{ booking.special_request }}</span>
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-3">
                  <span
                    :class="[
                      'px-4 py-1 rounded-full text-sm font-medium',
                      getStatusClass(booking.status),
                    ]"
                  >
                    {{
                      booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)
                    }}
                  </span>
                  <p class="text-gray-900 font-bold">
                    Rp {{ formatPrice(booking.total_harga) }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Booked on {{ formatDateShort(booking.created_at) }}
                  </p>
                </div>
              </div>

              <div
                class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 flex flex-wrap gap-2 sm:gap-3"
              >
                <button
                  v-if="
                    booking.status === 'pending' ||
                    booking.status === 'confirmed'
                  "
                  @click="rescheduleBooking(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-pink-200 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors duration-300 text-xs sm:text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
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
                  Reschedule
                </button>
                <button
                  v-if="
                    booking.status === 'pending' ||
                    booking.status === 'confirmed'
                  "
                  @click="cancelBooking(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-xs sm:text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
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
                  Cancel
                </button>
                <button
                  v-if="booking.status === 'completed'"
                  @click="openReviewModal(booking)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-xs sm:text-sm font-medium shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  Leave Review
                </button>
                <button
                  @click="viewDetails(booking.id)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-xs sm:text-sm font-medium ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
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
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <div
      v-if="showReviewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeReviewModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Leave a Review</h2>
              <p class="text-sm text-gray-500 mt-1">
                Share your experience with {{ selectedBooking?.layanan_names }}
              </p>
            </div>
            <button
              @click="closeReviewModal"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400"
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
            </button>
          </div>

          <!-- Review Form -->
          <form @submit.prevent="submitReview" class="space-y-6">
            <!-- Rating Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Rating <span class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  @click="setRating(star)"
                  class="p-1 transition-transform hover:scale-110"
                  :class="
                    star <= reviewForm.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
                <span class="ml-2 text-sm text-gray-600">
                  {{ getRatingText(reviewForm.rating) }}
                </span>
              </div>
            </div>

            <!-- Comment Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Comment <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="reviewForm.comment"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                placeholder="Tell us about your experience..."
                required
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                {{ reviewForm.comment.length }}/500 characters
              </p>
            </div>

            <!-- Image Upload Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Add Photo (Optional)
              </label>
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors"
                @dragover.prevent
                @drop.prevent="handleFileDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />

                <div
                  v-if="!reviewForm.image"
                  @click="$refs.fileInput.click()"
                  class="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-gray-400 mx-auto mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-gray-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>

                <div v-else class="relative">
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="max-h-32 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    @click="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeReviewModal"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="
                  isSubmittingReview ||
                  !reviewForm.rating ||
                  !reviewForm.comment.trim()
                "
                class="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  v-if="isSubmittingReview"
                  class="flex items-center justify-center gap-2"
                >
                  <svg
                    class="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
                <span v-else>Submit Review</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeSuccessModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
        @click.stop
      >
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-500"
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">Review Submitted!</h3>
        <p class="text-gray-600 mb-6">
          Thank you for your feedback! Your testimonial has been submitted and
          is awaiting approval.
        </p>
        <button
          @click="closeSuccessModal"
          class="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const bookings = ref([]);
const loading = ref(true);
const error = ref(null);
const activeFilter = ref("All");

// Review modal states
const showReviewModal = ref(false);
const showSuccessModal = ref(false);
const isSubmittingReview = ref(false);
const selectedBooking = ref(null);
const imagePreview = ref(null);

// Review form data
const reviewForm = ref({
  rating: 0,
  comment: "",
  image: null,
  layanan_id: [],
});

// Fetch bookings from API
const fetchBookings = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(`${config.public.apiBaseUrl}/api/booking`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch booking data");
    }

    const data = await response.json();
    bookings.value = data.bookings || [];
    console.log("Booking data loaded:", bookings.value);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error.value = err.message || "Failed to load booking data";
  } finally {
    loading.value = false;
  }
};

// Filter bookings based on selected status
const filteredBookings = computed(() => {
  if (activeFilter.value === "All") {
    return bookings.value;
  }
  return bookings.value.filter(
    (booking) =>
      booking.status.toLowerCase() === activeFilter.value.toLowerCase()
  );
});

// Format date to Indonesian locale
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

// Format date to short format
const formatDateShort = (dateStr) => {
  if (!dateStr) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

// Format time (HH:MM:SS to HH:MM)
const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    return `${parts[0]}:${parts[1]}`;
  }
  return timeStr;
};

// Format price with thousand separator
const formatPrice = (price) => {
  if (!price) return "0";
  return new Intl.NumberFormat("id-ID").format(parseFloat(price));
};

// Get CSS class for status badge
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Review modal functions
const openReviewModal = (booking) => {
  selectedBooking.value = booking;

  // Extract layanan_id - handle both array and single value cases
  let layananIds = [];
  if (booking.layanan_id) {
    if (Array.isArray(booking.layanan_id)) {
      layananIds = booking.layanan_id;
    } else {
      layananIds = [booking.layanan_id];
    }
  } else if (booking.id) {
    layananIds = [booking.id];
  }

  reviewForm.value = {
    rating: 0,
    comment: "",
    image: null,
    layanan_id: layananIds,
  };

  showReviewModal.value = true;
  console.log("Opening review modal for booking:", booking);
  console.log("Layanan IDs:", layananIds);
};

const closeReviewModal = () => {
  showReviewModal.value = false;
  selectedBooking.value = null;
  resetReviewForm();
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

const resetReviewForm = () => {
  reviewForm.value = {
    rating: 0,
    comment: "",
    image: null,
    layanan_id: [],
  };
  imagePreview.value = null;
};

const setRating = (rating) => {
  reviewForm.value.rating = rating;
};

const getRatingText = (rating) => {
  const texts = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  return texts[rating] || "Select rating";
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
};

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
};

const handleFile = (file) => {
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  reviewForm.value.image = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  reviewForm.value.image = null;
  imagePreview.value = null;
};

const submitReview = async () => {
  if (!reviewForm.value.rating || !reviewForm.value.comment.trim()) {
    alert("Please provide both rating and comment");
    return;
  }

  isSubmittingReview.value = true;

  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const formData = new FormData();
    formData.append("rating", reviewForm.value.rating.toString());
    formData.append("comment", reviewForm.value.comment);

    // Format layanan_id as comma-separated string like in Postman example
    if (
      Array.isArray(reviewForm.value.layanan_id) &&
      reviewForm.value.layanan_id.length > 0
    ) {
      const layananIdString = reviewForm.value.layanan_id.join(", ");
      formData.append("layanan_id", layananIdString);
    } else if (reviewForm.value.layanan_id) {
      formData.append("layanan_id", reviewForm.value.layanan_id.toString());
    }

    if (reviewForm.value.image) {
      formData.append("image", reviewForm.value.image);
    }

    // Debug - log form data
    console.log("Submitting review with data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await fetch(`${config.public.apiBaseUrl}/api/testimoni`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(errorData.message || "Failed to submit review");
    }

    const data = await response.json();
    console.log("Review submitted successfully:", data);

    closeReviewModal();
    showSuccessModal.value = true;
  } catch (err) {
    console.error("Error submitting review:", err);
    alert(err.message || "Failed to submit review. Please try again.");
  } finally {
    isSubmittingReview.value = false;
  }
};

// Other booking functions
const rescheduleBooking = async (id) => {
  alert(
    `Reschedule functionality for booking #${id} would be implemented here`
  );
};

const cancelBooking = async (id) => {
  if (!confirm("Are you sure you want to cancel this booking?")) {
    return;
  }

  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/booking/${id}/cancel`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to cancel booking");
    }

    await fetchBookings();
    alert("Booking cancelled successfully");
  } catch (err) {
    console.error("Error cancelling booking:", err);
    alert(err.message || "Failed to cancel booking");
  }
};

const viewDetails = (id) => {
  alert(`Details page for booking #${id} would be implemented here`);
};

// Fetch bookings when component is mounted
onMounted(() => {
  fetchBookings();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
