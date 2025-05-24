<template>
  <!-- Disclaimer Modal - Shows first -->
  <div
    v-if="isOpen && showDisclaimer"
    class="fixed inset-0 z-[60] overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen p-6">
      <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 z-10 transition-all duration-300 transform"
      >
        <!-- Header -->
        <div class="text-center mb-6">
          <div
            class="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">
            Syarat & Ketentuan Booking
          </h2>
          <p class="text-gray-600">
            Mohon baca dan pahami ketentuan berikut sebelum melanjutkan booking
          </p>
        </div>

        <!-- Terms List -->
        <div class="space-y-4 mb-8">
          <div
            class="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">
                Batasan Booking Harian
              </h3>
              <p class="text-gray-600 text-sm">
                Setiap customer hanya dapat melakukan
                <strong>1 booking per hari</strong>. Pastikan Anda memilih waktu
                dan layanan dengan tepat.
              </p>
            </div>
          </div>

          <div
            class="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-100"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">
                Kebijakan Pembatalan
              </h3>
              <p class="text-gray-600 text-sm">
                Pembatalan booking hanya dapat dilakukan
                <strong>maksimal 30 menit sebelum</strong>
                jam booking dimulai. Lewat dari waktu tersebut, pembatalan tidak
                dapat diproses.
              </p>
            </div>
          </div>

          <div
            class="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Kebijakan Refund</h3>
              <p class="text-gray-600 text-sm">
                Refund akan diproses <strong>100%</strong> jika pembatalan
                dilakukan sesuai dengan ketentuan waktu yang berlaku (maksimal
                30 menit sebelum booking).
              </p>
            </div>
          </div>

          <div
            class="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-100"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-semibold text-sm">4</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">
                Konsekuensi Keterlambatan
              </h3>
              <p class="text-gray-600 text-sm">
                Jika Anda sudah melakukan down payment tetapi
                <strong>gagal membatalkan booking</strong>
                karena sudah lewat dari 30 menit sebelum jam dimulai, maka
                <strong class="text-red-600">uang akan hangus!</strong>
              </p>
            </div>
          </div>
        </div>

        <!-- Important Notice -->
        <div
          class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-amber-600 mr-2 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-amber-800 text-sm font-medium">
              <strong>Penting:</strong> Dengan melanjutkan booking, Anda
              menyetujui semua syarat dan ketentuan di atas.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="closeDisclaimer"
            class="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Batal
          </button>
          <button
            @click="acceptTerms"
            class="flex-1 px-6 py-3 bg-[#F97474] text-white rounded-xl font-medium hover:bg-[#e65c5c] transform hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Saya Setuju & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Booking Modal - Shows after disclaimer is accepted -->
  <div
    v-if="isOpen && !showDisclaimer"
    class="fixed inset-0 z-50 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen p-6">
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        @click="close"
      ></div>

      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 z-10 transition-all duration-300 transform"
      >
        <!-- Header with steps -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">
            Book Your Appointment
          </h2>

          <!-- Step indicator -->
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center w-full max-w-3xl">
              <div
                class="relative flex flex-col items-center flex-1"
                v-for="(step, index) in steps"
                :key="index"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center z-10 relative transition-all duration-300"
                  :class="[
                    currentStep > index
                      ? 'bg-[#F97474] text-white'
                      : currentStep === index
                      ? 'bg-[#F97474] text-white ring-4 ring-pink-100'
                      : 'bg-gray-200 text-gray-500',
                  ]"
                >
                  <span v-if="currentStep > index" class="text-lg">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div
                  class="text-xs font-medium mt-2 text-center"
                  :class="
                    currentStep >= index ? 'text-gray-800' : 'text-gray-400'
                  "
                >
                  {{ step }}
                </div>
                <!-- Connector line -->
                <div
                  v-if="index < steps.length - 1"
                  class="absolute top-5 w-full h-[2px] left-1/2"
                  :class="currentStep > index ? 'bg-[#F97474]' : 'bg-gray-200'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 1: Date Selection -->
        <div v-if="currentStep === 0" class="transition-all duration-300">
          <div class="flex justify-center">
            <div class="w-full max-w-md">
              <label
                class="block text-gray-700 text-lg font-medium mb-4 text-center"
                >Pick a Date</label
              >
              <div
                class="calendar-wrapper bg-white rounded-xl shadow-sm border border-gray-100"
              >
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

              <div class="mt-6 text-center">
                <p class="text-gray-600 text-sm mb-2">Selected Date:</p>
                <p class="font-medium text-lg text-gray-800">
                  {{ formattedSelectedDate }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Service Selection -->
        <div v-if="currentStep === 1" class="transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div v-if="isServicesLoaded">
                <div
                  v-for="(service, index) in selectedServices"
                  :key="index"
                  class="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <label class="block text-gray-700 font-medium mb-3">
                    Service {{ index + 1 }}
                  </label>
                  <div class="relative">
                    <select
                      v-model="selectedServices[index]"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
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
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
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
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
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
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
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
                  class="mt-2 px-4 py-2 bg-[#F97474] text-white rounded-xl hover:bg-[#e65c5c] transition flex items-center gap-2"
                  v-if="selectedServices.length < services.length"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Tambah Service
                </button>

                <!-- Special Request Box -->
                <div
                  class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <label class="block text-gray-700 font-medium mb-3">
                    Special Request
                  </label>
                  <textarea
                    v-model="specialRequest"
                    rows="3"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                    placeholder="Leave a message for the salon (optional)"
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <div
                class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3
                  class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-[#F97474]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm2 3v1a1 1 0 102 0V5h6v1a1 1 0 102 0V5h1a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Appointment Details
                </h3>

                <div class="mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-gray-600 text-sm">Selected Date:</p>
                    <p class="font-medium">{{ formattedSelectedDate }}</p>
                  </div>
                </div>

                <div class="mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-gray-600 text-sm">Selected Time:</p>
                    <p class="font-medium">{{ bookingTime || "---" }}</p>
                  </div>
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
                </div>

                <div v-else class="text-center py-8">
                  <p class="text-gray-500">
                    Select a service to see the summary
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Time Selection -->
        <div v-if="currentStep === 2" class="transition-all duration-300">
          <div class="flex justify-center">
            <div class="w-full max-w-2xl">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">
                  Choose Your Time
                </h3>
                <p class="text-gray-600">
                  Select your preferred appointment time for
                  {{ formattedSelectedDate }}
                </p>
              </div>

              <div v-if="isLoadingSlots" class="text-center py-8">
                <div class="inline-flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#F97474]"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span class="text-gray-600"
                    >Loading available time slots...</span
                  >
                </div>
              </div>

              <div v-else class="grid grid-cols-3 md:grid-cols-4 gap-3">
                <button
                  v-for="time in allTimeSlots"
                  :key="time"
                  @click="
                    availableSlots.includes(time) ? (bookingTime = time) : null
                  "
                  :disabled="bookedSlots.includes(time)"
                  class="px-4 py-3 rounded-xl text-center transition-all duration-200 font-medium"
                  :class="[
                    bookedSlots.includes(time)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                      : bookingTime === time
                      ? 'bg-[#F97474] text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md',
                  ]"
                >
                  {{ time }}
                  <span v-if="bookedSlots.includes(time)" class="block text-xs"
                    >Booked</span
                  >
                </button>
              </div>

              <div
                v-if="!isLoadingSlots && allTimeSlots.length === 0"
                class="text-center py-8"
              >
                <p class="text-gray-500">
                  No time slots available for the selected date and services.
                </p>
              </div>

              <div v-if="bookingTime" class="mt-8 text-center">
                <div
                  class="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-green-800 font-medium">
                    Selected: {{ formattedSelectedDate }} at {{ bookingTime }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Payment Method -->
        <div v-if="currentStep === 3" class="transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div>
                <label class="block text-gray-700 text-lg font-medium mb-4"
                  >Payment Method</label
                >
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="method in paymentMethods"
                    :key="method.id"
                    @click="paymentMethod = method.id"
                    class="p-4 border rounded-xl cursor-pointer transition-all duration-200 flex items-center"
                    :class="
                      paymentMethod === method.id
                        ? 'border-[#F97474] bg-pink-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    "
                  >
                    <div class="flex-shrink-0 mr-4">
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        :class="
                          paymentMethod === method.id
                            ? 'border-[#F97474]'
                            : 'border-gray-300'
                        "
                      >
                        <div
                          v-if="paymentMethod === method.id"
                          class="w-3 h-3 rounded-full bg-[#F97474]"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p class="font-medium">{{ method.nama }}</p>
                      <p class="text-sm text-gray-500">
                        {{
                          method.nama === "Cashless"
                            ? "Pay online via bank transfer or e-wallet"
                            : "Pay at the salon"
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Payment Type Radio Buttons - Only show for Cashless -->
                <div
                  v-if="isCashlessSelected"
                  class="mt-6 p-4 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-[#F97474] mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="text-sm font-medium text-gray-700">
                      Pembayaran cashless hanya untuk Down Payment (30% dari
                      total)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3
                  class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-[#F97474]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2-2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Payment Summary
                </h3>

                <div class="space-y-4 mb-6">
                  <div
                    class="flex justify-between items-center pb-2 border-b border-gray-200"
                  >
                    <p class="text-gray-600">Date & Time</p>
                    <p class="font-medium">
                      {{ formattedSelectedDate }}, {{ bookingTime }}
                    </p>
                  </div>

                  <div v-if="selectedServices.length > 0" class="space-y-3">
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
                            getAdditionalPrice(
                              serviceId,
                              index
                            ).toLocaleString()
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="font-semibold text-gray-800">Total</p>
                    <p class="font-semibold text-xl text-gray-800">
                      Rp{{ totalPrice.toLocaleString() }}
                    </p>
                  </div>
                  <div
                    v-if="isCashlessSelected"
                    class="flex justify-between items-center mt-2 text-sm"
                  >
                    <p class="text-gray-600">Down Payment (30%)</p>
                    <p class="font-medium text-gray-800">
                      Rp{{ Math.round(totalPrice * 0.3).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-between mt-8">
          <button
            v-if="currentStep > 0"
            @click="currentStep--"
            class="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </button>
          <div v-else class="w-24"></div>

          <button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="px-6 py-3 bg-[#F97474] text-white rounded-xl font-medium hover:bg-[#ff5757] transition-all duration-200 flex items-center"
            :disabled="!canProceedToNextStep"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            v-else
            @click="submitBooking"
            class="px-6 py-3 bg-[#F97474] text-white rounded-xl font-medium hover:bg-[#ff5757] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 flex items-center"
            :disabled="!isFormValid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Complete Booking
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
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const steps = ["Date", "Services", "Time", "Payment"];
const currentStep = ref(0);
const showDisclaimer = ref(true);

const canProceedToNextStep = computed(() => {
  if (currentStep.value === 0) {
    return selectedDate.value;
  } else if (currentStep.value === 1) {
    return selectedServices.value.every((service) => service !== "");
  } else if (currentStep.value === 2) {
    return bookingTime.value;
  }
  return true;
});

const nextStep = async () => {
  if (currentStep.value < steps.length - 1 && canProceedToNextStep.value) {
    // If moving from services step to time step, fetch available slots
    if (currentStep.value === 1) {
      await fetchAvailableSlots();
    }
    currentStep.value++;
  }
};

const selectedDate = ref(new Date());
const bookingTime = ref("");
const selectedServices = ref([""]);
const isServicesLoaded = ref(false);
const paymentMethod = ref("");
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

const availableSlots = ref([]);
const bookedSlots = ref([]);
const isLoadingSlots = ref(false);

// Add disclaimer functions
const closeDisclaimer = () => {
  showDisclaimer.value = false;
  close();
};

const acceptTerms = () => {
  showDisclaimer.value = false;
};

// Rest of your existing functions remain the same...
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
        `${config.public.apiBaseUrl}/api/products/hair/products`,
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

const totalEstimatedTime = computed(() => {
  return selectedServices.value.reduce((total, serviceId) => {
    if (!serviceId) return total;
    const service = getServiceById(serviceId);
    return total + (service?.estimasi_waktu || 0);
  }, 0);
});

const isFormValid = computed(() => {
  return (
    selectedDate.value &&
    bookingTime.value &&
    selectedServices.value.every((service) => service !== "") &&
    paymentMethod.value
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

const allTimeSlots = computed(() => {
  const all = [...availableSlots.value, ...bookedSlots.value];
  return all.sort((a, b) => {
    const timeA = a.split(":").map(Number);
    const timeB = b.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });
});

const createMidtransTransaction = async (bookingId) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${config.public.apiBaseUrl}/api/transaksi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        booking_id: bookingId,
        kategori_transaksi_id: isCashlessSelected.value ? 2 : 1,
        ...(isCashlessSelected.value && { is_dp: true }),
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
  currentStep.value = 0;
  showDisclaimer.value = true; // Reset disclaimer to show again
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

const fetchAvailableSlots = async () => {
  if (!selectedDate.value || totalEstimatedTime.value === 0) return;

  isLoadingSlots.value = true;
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/booking/available-slots`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          tanggal: formatDateForAPI(selectedDate.value),
          estimasi_waktu: totalEstimatedTime.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    availableSlots.value = result.available_slots || [];
    bookedSlots.value = result.booked_slots || [];
  } catch (error) {
    console.error("Error fetching available slots:", error);
    availableSlots.value = [];
    bookedSlots.value = [];
  } finally {
    isLoadingSlots.value = false;
  }
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
    const response = await fetch(`${config.public.apiBaseUrl}/api/booking`, {
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

    const servicesResponse = await fetch(
      `${config.public.apiBaseUrl}/api/layanan`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const servicesResult = await servicesResponse.json();
    services.value = servicesResult;
    isServicesLoaded.value = true;

    const paymentMethodsResponse = await fetch(
      `${config.public.apiBaseUrl}/api/transaksikategori`,
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

const isDisclaimerOpen = ref(false);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      setupMidtransCallback();
      isDisclaimerOpen.value = true;
    } else {
      window.removeEventListener("message", handleMidtransCallback);
      isDisclaimerOpen.value = false;
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
  border-radius: 0.75rem;
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
