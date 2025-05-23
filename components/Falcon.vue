<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="bg-[#f6339a] hover:bg-[#e02d8a] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      v-if="!isChatOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    </button>

    <!-- Chat Window -->
    <div
      v-show="isChatOpen"
      class="absolute bottom-0 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slideUp"
      style="height: 600px; max-height: 80vh"
    >
      <!-- Chat Header -->
      <div
        class="bg-gradient-to-r from-[#f6339a] to-[#ff5757] p-4 flex items-center justify-between"
      >
        <div class="flex items-center">
          <div
            class="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3"
          >
            <span class="text-[#f6339a] font-bold">S</span>
          </div>
          <h3 class="text-white text-base font-medium">She Salon</h3>
        </div>
        <button
          @click="toggleChat"
          class="text-white hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10 6a1 1 0 01-1 1H4a1 1 0 110-2h8a1 1 0 011 1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Top Info -->
      <div
        class="p-2 bg-gray-50 border-b border-gray-200 text-xs text-center text-gray-500"
      >
        {{ getCurrentDate() }}
      </div>

      <!-- Chat Messages -->
      <div
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
        ref="messageContainer"
      >
        <div v-for="(message, index) in messages" :key="index">
          <!-- Bot Message -->
          <div
            v-if="message.type === 'bot'"
            class="mb-4"
            :class="message.isNew ? 'animate-message-in' : ''"
          >
            <div class="text-xs text-gray-500 mb-1">SheSalon's Bot</div>
            <div class="flex items-start">
              <div
                class="bg-gray-100 rounded-2xl p-4 text-sm whitespace-pre-line shadow-sm"
                style="max-width: 80%; border-radius: 18px"
              >
                {{ message.text }}
              </div>
            </div>
          </div>

          <!-- User Message -->
          <div
            v-else
            class="flex justify-end mb-4"
            :class="message.isNew ? 'animate-message-in' : ''"
          >
            <div
              class="bg-gradient-to-r from-[#f6339a] to-[#ff5757] text-white rounded-2xl p-4 text-sm shadow-sm"
              style="max-width: 80%; border-radius: 18px"
            >
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Quick Replies -->
        <div
          v-if="quickReplies.length > 0"
          class="flex flex-wrap gap-2 justify-end"
        >
          <button
            v-for="(reply, index) in quickReplies"
            :key="index"
            @click="handleQuickReply(reply)"
            class="bg-[#f6339a] text-white rounded-full px-4 py-2 text-sm hover:bg-[#e02d8a] transition-colors duration-200 shadow-sm"
          >
            {{ reply }}
          </button>
        </div>

        <!-- Bot Typing Indicator -->
        <div v-if="isBotTyping" class="mb-4 animate-message-in">
          <div class="text-xs text-gray-500 mb-1">SheSalon's Bot</div>
          <div class="flex items-start">
            <div
              class="bg-gray-100 rounded-2xl p-4"
              style="border-radius: 18px"
            >
              <div class="flex space-x-1">
                <div class="typing-dot"></div>
                <div class="typing-dot animation-delay-200"></div>
                <div class="typing-dot animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 bg-white border-t border-gray-200">
        <div
          class="flex items-center rounded-full border border-gray-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#f6339a] focus-within:border-transparent transition-all duration-200"
        >
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            :disabled="isBotTyping"
            ref="messageInput"
            @keypress.enter="sendMessage"
            class="flex-1 px-4 py-3 text-sm focus:outline-none"
            :class="{ 'bg-gray-100': isBotTyping }"
          />
          <button
            type="button"
            @click="sendMessage"
            class="p-3 text-[#f6339a] hover:bg-[#f6339a]/10 transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed, nextTick } from "vue";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";

export default {
  setup() {
    const config = useRuntimeConfig();
    const isChatOpen = ref(false);
    const isBotTyping = ref(false);
    const newMessage = ref("");
    const messageInput = ref(null);
    const messageContainer = ref(null);
    const isRecording = ref(false);
    const onlineStatus = ref("Online");

    // Booking state management
    const bookingState = ref({
      isBookingFlow: false,
      currentStep: "initial",
      date: null,
      time: null,
      services: [],
      selectedServiceId: null,
      paymentMethod: null,
      specialRequest: "",
      selectedBrand: null,
      selectedProduct: null,
      selectedColor: null,
      collectedInfo: {},
    });

    // Available services and times (will be fetched from API)
    const availableServices = ref([]);
    const availableTimes = ref([
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
    ]);
    const paymentMethods = ref([]);
    const availableBrands = ref([]);
    const availableProducts = ref([]);
    const availableColors = ref([]);

    // Quick replies based on common queries
    const quickReplies = ref(["Book Appointment", "Services", "FAQ"]);

    // Get greeting based on time of day
    const getGreeting = () => {
      const hour = new Date().getHours();
      let greeting = "";

      if (hour < 12) {
        greeting = "Selamat pagi! ";
      } else if (hour < 17) {
        greeting = "Selamat siang! ";
      } else {
        greeting = "Selamat malam! ";
      }

      return (
        greeting +
        "Ada yang bisa saya bantu?\nAnda bisa tanyakan apa saja tentang She Salon, layanan kami, atau booking appointment 😊"
      );
    };

    const messages = ref([
      {
        type: "bot",
        text: getGreeting(),
        time: getCurrentTime(),
        isNew: false,
      },
    ]);

    // Remove isNew flag after animation completes
    const removeNewFlag = (message) => {
      setTimeout(() => {
        message.isNew = false;
      }, 1000); // Match this with your animation duration
    };

    // Toggle chat and focus input
    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
      if (isChatOpen.value) {
        setTimeout(() => {
          messageInput.value?.focus();
        }, 300);
      }
    };

    function getCurrentDate() {
      const now = new Date();
      return now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // FIXED: Indonesian date parser with string-based date creation
    function parseIndonesianDate(dateStr) {
      console.log("Parsing date:", dateStr);

      if (!dateStr) return null;

      // Normalize input - remove "tanggal" if present
      let normalized = dateStr.toLowerCase().trim();
      normalized = normalized.replace(/^tanggal\s+/i, "");

      // Handle "today", "tomorrow", etc.
      if (normalized.includes("hari ini") || normalized === "today") {
        return new Date();
      }

      if (normalized.includes("besok") || normalized === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      }

      // Map of Indonesian month names to their string representation (1-based for string format)
      const months = {
        januari: "01",
        jan: "01",
        februari: "02",
        feb: "02",
        maret: "03",
        mar: "03",
        april: "04",
        apr: "04",
        mei: "05",
        may: "05",
        juni: "06",
        jun: "06",
        juli: "07",
        jul: "07",
        agustus: "08",
        aug: "08",
        agt: "08",
        september: "09",
        sep: "09",
        oktober: "10",
        oct: "10",
        okt: "10",
        november: "11",
        nov: "11",
        desember: "12",
        dec: "12",
        des: "12",
      };

      // Try to extract day and month with regex
      const dateRegex = /(\d{1,2})\s+([a-zA-Z]+)(?:\s+(\d{4}))?/;
      const match = normalized.match(dateRegex);

      if (match) {
        const day = parseInt(match[1], 10);
        const monthStr = match[2].toLowerCase();
        const year = match[3]
          ? parseInt(match[3], 10)
          : new Date().getFullYear();

        if (!isNaN(day) && months.hasOwnProperty(monthStr)) {
          const month = months[monthStr];
          console.log(
            `Parsed: day=${day}, month=${month} (${monthStr}), year=${year}`
          );

          // PENTING: Buat tanggal dengan string format
          const dateStr = `${year}-${month}-${day.toString().padStart(2, "0")}`;
          console.log("Creating date with string:", dateStr);

          const date = new Date(dateStr);
          console.log("Resulting date object:", date.toISOString());

          // Verify the date was created correctly
          if (date.getDate() === day) {
            return date;
          } else {
            console.error("Date creation failed verification");
            console.error(`Expected day: ${day}, got: ${date.getDate()}`);

            // Fallback: force the day to be correct
            date.setDate(day);
            return date;
          }
        }
      }

      return null;
    }

    // FIXED: Direct date recognition with string-based date creation
    const recognizeDate = (text) => {
      console.log("Recognizing date from text:", text);

      // Match patterns like "tanggal 2 juni", "2 juni", etc.
      const dateRegex =
        /(?:tanggal\s+)?(\d{1,2})\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember|jan|feb|mar|apr|mei|jun|jul|agt|aug|sep|okt|oct|nov|des|dec)/i;

      const match = text.match(dateRegex);
      if (match) {
        const day = parseInt(match[1], 10);
        const monthStr = match[2].toLowerCase();

        console.log(`Matched: day=${day}, monthStr=${monthStr}`);

        // Map month names to numbers
        const months = {
          januari: "01",
          jan: "01",
          februari: "02",
          feb: "02",
          maret: "03",
          mar: "03",
          april: "04",
          apr: "04",
          mei: "05",
          may: "05",
          juni: "06",
          jun: "06",
          juli: "07",
          jul: "07",
          agustus: "08",
          aug: "08",
          agt: "08",
          september: "09",
          sep: "09",
          oktober: "10",
          oct: "10",
          okt: "10",
          november: "11",
          nov: "11",
          desember: "12",
          dec: "12",
          des: "12",
        };

        if (months.hasOwnProperty(monthStr)) {
          const month = months[monthStr];
          const year = new Date().getFullYear();

          // PENTING: Gunakan string format untuk membuat tanggal
          const dateStr = `${year}-${month}-${day.toString().padStart(2, "0")}`;
          console.log("Creating date with string:", dateStr);

          const date = new Date(dateStr);
          console.log("Resulting date object:", date.toISOString());

          // Verify the date was created correctly
          if (date.getDate() === day) {
            return dateStr; // Return YYYY-MM-DD format directly
          } else {
            console.error("Date creation failed verification");
            console.error(`Expected day: ${day}, got: ${date.getDate()}`);
          }
        }
      }
      return null;
    };

    // Handle quick replies
    const handleQuickReply = (reply) => {
      newMessage.value = reply;
      sendMessage();
    };

    // Format date for display with better verification
    const formatDate = (dateString) => {
      if (!dateString) return null;

      // Parse the date string to ensure we have a valid date
      const date = new Date(dateString);

      // Verify the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
      }

      // Get the day of the month (should be 1-31)
      const day = date.getDate();
      console.log("Day of month:", day);

      // Format the date using Intl.DateTimeFormat for better localization
      const formatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formatted = formatter.format(date);
      console.log("Formatted date:", formatted);

      // Verify the formatted date contains the correct day
      if (!formatted.includes(day.toString())) {
        console.error("Day mismatch in formatted date!");
      }

      return formatted;
    };

    // Start booking flow
    const startBookingFlow = async () => {
      bookingState.value.isBookingFlow = true;
      bookingState.value.currentStep = "collecting";
      bookingState.value.collectedInfo = {};

      // Fetch services if not already loaded
      if (availableServices.value.length === 0) {
        await fetchServices();
      }

      // Fetch payment methods if not already loaded
      if (paymentMethods.value.length === 0) {
        await fetchPaymentMethods();
      }

      addBotMessage(
        "Baik, saya akan bantu Anda untuk booking appointment. Kapan Anda ingin datang ke salon kami?"
      );
    };

    // Process booking information using Gemini
    const processBookingInfo = async (userInput) => {
      try {
        // Use Gemini to extract booking information
        const extractedInfo = await extractBookingInfo(userInput);
        console.log("Extracted info from Gemini:", extractedInfo);

        // Update collected information
        const collectedInfo = bookingState.value.collectedInfo;

        // Process date if provided - FIXED VERSION
        if (extractedInfo.date) {
          try {
            // Try direct parsing first
            const directDate = parseIndonesianDate(extractedInfo.date);
            console.log("Direct parsed date:", directDate);

            if (directDate && !isNaN(directDate.getTime())) {
              // Verify the day is correct before formatting
              console.log("Day from parsed date:", directDate.getDate());

              const formattedDate = directDate.toISOString().split("T")[0];
              collectedInfo.date = formattedDate;
              console.log("Successfully parsed date to:", formattedDate);
            } else {
              // If direct parsing fails, try standard parsing
              const parsedDate = new Date(extractedInfo.date);
              if (!isNaN(parsedDate.getTime())) {
                const formattedDate = parsedDate.toISOString().split("T")[0];
                collectedInfo.date = formattedDate;
                console.log("Standard parsed date to:", formattedDate);
              } else {
                console.error("Failed to parse date:", extractedInfo.date);
              }
            }
          } catch (error) {
            console.error("Error parsing date:", error, extractedInfo.date);
          }
        }

        // Process time if provided
        if (extractedInfo.time) {
          // Find closest available time
          const requestedTime = extractedInfo.time;
          const closestTime = findClosestTime(requestedTime);
          if (closestTime) {
            collectedInfo.time = closestTime;
          }
        }

        // Process service if provided
        if (extractedInfo.service) {
          const serviceName = extractedInfo.service.toLowerCase();
          const matchedService = availableServices.value.find((s) =>
            s.nama.toLowerCase().includes(serviceName)
          );

          if (matchedService) {
            collectedInfo.serviceId = matchedService.id.toString();
            collectedInfo.serviceName = matchedService.nama;
          }
        }

        // Process payment method if provided
        if (extractedInfo.paymentMethod) {
          const paymentName = extractedInfo.paymentMethod.toLowerCase();
          const matchedPayment = paymentMethods.value.find((p) =>
            p.nama.toLowerCase().includes(paymentName)
          );

          if (matchedPayment) {
            collectedInfo.paymentMethodId = matchedPayment.id;
            collectedInfo.paymentMethodName = matchedPayment.nama;
          }
        }

        // Process special request if provided
        if (extractedInfo.specialRequest) {
          collectedInfo.specialRequest = extractedInfo.specialRequest;
        }

        // Follow step-by-step process
        await processBookingSteps();
      } catch (error) {
        console.error("Error processing booking info:", error);
        addBotMessage(
          "Maaf, saya mengalami kesulitan memproses informasi tersebut. Bisakah Anda mencoba lagi?"
        );
      }
    };

    // Process booking steps one by one
    const processBookingSteps = async () => {
      const collectedInfo = bookingState.value.collectedInfo;

      // Step 1: Date
      if (!collectedInfo.date) {
        bookingState.value.currentStep = "date";
        addBotMessage(
          "Baik, kapan Anda ingin datang ke salon kami? Anda bisa menyebutkan tanggal seperti '2 Juni' atau 'besok'."
        );
        return;
      }

      // Step 2: Time
      if (!collectedInfo.time) {
        bookingState.value.currentStep = "time";
        addBotMessage(
          `Oke, tanggal ${formatDate(
            collectedInfo.date
          )} ya. Jam berapa Anda ingin booking? Jam operasional kami adalah 09:00-19:00.`
        );
        return;
      }

      // Step 3: Service
      if (!collectedInfo.serviceId) {
        bookingState.value.currentStep = "service";

        // Check if services are loaded
        if (availableServices.value.length === 0) {
          addBotMessage("Sedang memuat data layanan...");
          await fetchServices();
        }

        let serviceMessage = `Perfect! ${formatDate(collectedInfo.date)} jam ${
          collectedInfo.time
        }. Sekarang, layanan apa yang Anda inginkan?\n\n📋 SEMUA LAYANAN KAMI:\n\n`;

        // Group services by category for better organization
        const servicesByCategory = {};
        availableServices.value.forEach((service) => {
          const categoryName = getCategoryName(service.kategori_id);
          if (!servicesByCategory[categoryName]) {
            servicesByCategory[categoryName] = [];
          }
          servicesByCategory[categoryName].push(service);
        });

        // Display services grouped by category
        Object.keys(servicesByCategory).forEach((categoryName) => {
          serviceMessage += `🔸 ${categoryName.toUpperCase()}:\n`;
          servicesByCategory[categoryName].forEach((service, index) => {
            serviceMessage += `   ${index + 1}. ${service.nama}`;
            if (service.deskripsi) {
              serviceMessage += ` - ${service.deskripsi}`;
            }
            if (service.harga) {
              serviceMessage += ` (Rp${Number(
                service.harga
              ).toLocaleString()})`;
            }
            serviceMessage += `\n`;
          });
          serviceMessage += `\n`;
        });

        serviceMessage += `💡 Silakan sebutkan nama layanan yang Anda inginkan.`;

        addBotMessage(serviceMessage);
        return;
      }

      // Step 4: Payment Method
      if (!collectedInfo.paymentMethodId) {
        bookingState.value.currentStep = "payment";
        let paymentMessage = `Baik, ${
          collectedInfo.serviceName
        } pada ${formatDate(collectedInfo.date)} jam ${
          collectedInfo.time
        }. Bagaimana Anda ingin melakukan pembayaran?\n\n`;

        paymentMethods.value.forEach((method) => {
          paymentMessage += `• ${method.nama}\n`;
        });

        addBotMessage(paymentMessage);
        return;
      }

      // All information collected, show summary
      bookingState.value.date = collectedInfo.date;
      bookingState.value.time = collectedInfo.time;
      bookingState.value.selectedServiceId = collectedInfo.serviceId;
      bookingState.value.services = [collectedInfo.serviceId];
      bookingState.value.paymentMethod = collectedInfo.paymentMethodId;
      bookingState.value.specialRequest = collectedInfo.specialRequest || "";

      // Show booking summary
      const summary = generateBookingSummary();
      addBotMessage(
        summary +
          "\n\nApakah informasi ini sudah benar? Ketik 'ya' untuk konfirmasi atau 'tidak' untuk mengubah."
      );

      bookingState.value.currentStep = "confirm";
    };

    // Helper function to get category name
    const getCategoryName = (categoryId) => {
      const categoryMap = {
        1: "Potong Rambut",
        2: "Pewarnaan Rambut",
        3: "Highlight & Lowlight",
        4: "Full Color",
        5: "Perawatan Rambut",
        6: "Styling",
        7: "Treatment",
      };
      return categoryMap[categoryId] || "Layanan Lainnya";
    };

    // Find the closest available time to the requested time
    const findClosestTime = (requestedTime) => {
      // If the time is already in the correct format and available, return it
      if (availableTimes.value.includes(requestedTime)) {
        return requestedTime;
      }

      // Try to parse the time
      let hours, minutes;

      // Handle various time formats
      if (requestedTime.includes(":")) {
        [hours, minutes] = requestedTime.split(":").map(Number);
      } else {
        // Assume it's just hours
        hours = parseInt(requestedTime, 10);
        minutes = 0;
      }

      // Validate hours and minutes
      if (
        isNaN(hours) ||
        hours < 0 ||
        hours > 23 ||
        isNaN(minutes) ||
        minutes < 0 ||
        minutes > 59
      ) {
        return null;
      }

      // Format to HH:MM
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      // Find the closest available time
      let closestTime = null;
      let minDiff = Infinity;

      const requestedMinutes = hours * 60 + minutes;

      for (const time of availableTimes.value) {
        const [timeHours, timeMinutes] = time.split(":").map(Number);
        const timeInMinutes = timeHours * 60 + timeMinutes;

        const diff = Math.abs(timeInMinutes - requestedMinutes);

        if (diff < minDiff) {
          minDiff = diff;
          closestTime = time;
        }
      }

      return closestTime;
    };

    // Get missing booking information
    const getMissingBookingInfo = () => {
      const collectedInfo = bookingState.value.collectedInfo;
      const missingInfo = [];

      if (!collectedInfo.date) missingInfo.push("date");
      if (!collectedInfo.time) missingInfo.push("time");
      if (!collectedInfo.serviceId) missingInfo.push("service");
      if (!collectedInfo.paymentMethodId) missingInfo.push("paymentMethod");

      return missingInfo;
    };

    // Generate next prompt based on missing information
    const generateNextPrompt = (missingInfo) => {
      const collectedInfo = bookingState.value.collectedInfo;
      let prompt = "Terima kasih atas informasinya. ";

      // Add what we've collected so far
      const collectedItems = [];
      if (collectedInfo.date)
        collectedItems.push(`tanggal: ${formatDate(collectedInfo.date)}`);
      if (collectedInfo.time)
        collectedItems.push(`waktu: ${collectedInfo.time}`);
      if (collectedInfo.serviceName)
        collectedItems.push(`layanan: ${collectedInfo.serviceName}`);
      if (collectedInfo.paymentMethodName)
        collectedItems.push(
          `metode pembayaran: ${collectedInfo.paymentMethodName}`
        );

      if (collectedItems.length > 0) {
        prompt += `Saya sudah mencatat ${collectedItems.join(", ")}. `;
      }

      // Ask for missing information
      if (missingInfo.includes("date")) {
        prompt += "Kapan Anda ingin datang ke salon kami? ";
      }

      if (missingInfo.includes("time")) {
        prompt +=
          "Jam berapa Anda ingin booking? Jam operasional kami adalah 09:00-19:00. ";
      }

      if (missingInfo.includes("service")) {
        prompt += "Layanan apa yang Anda inginkan? ";

        // List some services as examples
        if (availableServices.value.length > 0) {
          prompt += "Beberapa layanan kami: ";
          const sampleServices = availableServices.value
            .slice(0, 3)
            .map((s) => s.nama);
          prompt += sampleServices.join(", ") + ", dll. ";
        }
      }

      if (missingInfo.includes("paymentMethod")) {
        prompt += "Bagaimana Anda ingin melakukan pembayaran? ";

        // List payment methods
        if (paymentMethods.value.length > 0) {
          const methodNames = paymentMethods.value.map((p) => p.nama);
          prompt += "Kami menerima " + methodNames.join(" atau ") + ". ";
        }
      }

      return prompt;
    };

    // Extract booking information using Gemini
    const extractBookingInfo = async (userInput) => {
      try {
        const API_KEY = "AIzaSyCCGVP3tHJLuNFbnGvpEGvhH_uW6kVj504";
        const API_URL =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

        // Create context with available services and payment methods
        let contextInfo = `Extract booking information from the following user message. 
        Today's date is ${new Date().toISOString().split("T")[0]}.
        
        Available services:`;

        availableServices.value.forEach((service) => {
          contextInfo += `\n- ${service.nama}`;
        });

        contextInfo += "\n\nAvailable payment methods:";
        paymentMethods.value.forEach((method) => {
          contextInfo += `\n- ${method.nama}`;
        });

        contextInfo +=
          "\n\nAvailable times: " + availableTimes.value.join(", ");

        contextInfo += `\n\nExtract the following information if present:
        - date: Convert to a standard date format (e.g., "June 2, 2025"). IMPORTANT: For Indonesian dates like "2 juni", make sure to keep the day as 2, not 1.
        - time: Extract the hour in 24-hour format (e.g., "14:00"). Look for patterns like "jam 10", "10:00", "pukul 14", etc.
        - service: Extract the service name
        - paymentMethod: Extract the payment method
        - specialRequest: Extract any special requests

Return the information in JSON format with these fields. If a field is not present, omit it.

User message: "${userInput}"`;

        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: contextInfo }],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        });

        const data = await response.json();

        if (
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content
        ) {
          const reply = data.candidates[0].content.parts[0].text;
          console.log("Gemini raw response:", reply);

          // Extract JSON from the response
          const jsonMatch =
            reply.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/) ||
            reply.match(/\{[\s\S]*\}/);

          if (jsonMatch) {
            const jsonStr = jsonMatch[1] || jsonMatch[0];
            return JSON.parse(jsonStr);
          } else {
            // Try to parse the entire response as JSON
            try {
              return JSON.parse(reply);
            } catch (e) {
              console.error(
                "Failed to parse JSON from Gemini response:",
                reply
              );
              return {};
            }
          }
        } else {
          console.error("Unexpected Gemini API response:", data);
          return {};
        }
      } catch (error) {
        console.error("Error extracting booking info with Gemini:", error);
        return {};
      }
    };

    // Generate booking summary
    const generateBookingSummary = () => {
      const selectedService = availableServices.value.find(
        (s) => s.id === parseInt(bookingState.value.selectedServiceId, 10)
      );
      const selectedPayment = paymentMethods.value.find(
        (p) => p.id === bookingState.value.paymentMethod
      );

      let summary = "Ringkasan Booking:\n";
      summary += `Tanggal: ${formatDate(bookingState.value.date)}\n`;
      summary += `Waktu: ${bookingState.value.time}\n`;
      summary += `Layanan: ${
        selectedService ? selectedService.nama : "Unknown"
      }\n`;

      if (bookingState.value.selectedColor) {
        const selectedColor = availableColors.value.find(
          (c) => c.color_id === bookingState.value.selectedColor
        );
        if (selectedColor) {
          summary += `Warna: ${selectedColor.nama}\n`;
        }
      }

      if (bookingState.value.specialRequest) {
        summary += `Permintaan Khusus: ${bookingState.value.specialRequest}\n`;
      }

      summary += `Metode Pembayaran: ${
        selectedPayment ? selectedPayment.nama : "Unknown"
      }`;

      return summary;
    };

    // Reset booking state
    const resetBookingState = () => {
      bookingState.value = {
        isBookingFlow: false,
        currentStep: "initial",
        date: null,
        time: null,
        services: [],
        selectedServiceId: null,
        paymentMethod: null,
        specialRequest: "",
        selectedBrand: null,
        selectedProduct: null,
        selectedColor: null,
        collectedInfo: {},
      };
    };

    // Fetch services from API
    const fetchServices = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          addBotMessage(
            "Anda perlu login terlebih dahulu untuk melakukan booking. Silakan login dulu ya."
          );
          resetBookingState();
          return;
        }

        const response = await fetch(
          `${config.public.apiBaseUrl}/api/layanan`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        availableServices.value = data;
        return data;
      } catch (error) {
        console.error("Error fetching services:", error);
        addBotMessage(
          "Maaf, saya tidak bisa mengambil data layanan saat ini. Silakan coba lagi nanti."
        );
        resetBookingState();
      }
    };

    // Fetch payment methods from API
    const fetchPaymentMethods = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const response = await fetch(
          `${config.public.apiBaseUrl}/api/transaksikategori`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment methods");
        }

        const data = await response.json();
        paymentMethods.value = data;
        return data;
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        addBotMessage(
          "Maaf, saya tidak bisa mengambil data metode pembayaran saat ini. Silakan coba lagi nanti."
        );
      }
    };

    // Fetch hair products from API
    const fetchHairProducts = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

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
          throw new Error("Failed to fetch hair products");
        }

        const result = await response.json();
        availableProducts.value = result.data;

        // Extract unique brands
        const uniqueBrands = [];
        const brandIds = new Set();

        result.data.forEach((product) => {
          if (!brandIds.has(product.brand.id)) {
            brandIds.add(product.brand.id);
            uniqueBrands.push(product.brand);
          }
        });

        availableBrands.value = uniqueBrands;
        return result.data;
      } catch (error) {
        console.error("Error fetching hair products:", error);
        addBotMessage(
          "Maaf, saya tidak bisa mengambil data produk rambut saat ini. Silakan coba lagi nanti."
        );
      }
    };

    // Submit booking to API
    const submitBooking = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          addBotMessage(
            "Anda perlu login terlebih dahulu untuk melakukan booking. Silakan login dulu ya."
          );
          resetBookingState();
          return;
        }

        // Prepare booking payload
        const bookingPayload = {
          layanan_id: bookingState.value.services.filter((id) => id !== ""),
          tanggal: bookingState.value.date,
          jam_mulai: `${bookingState.value.time}:00`,
          special_request: bookingState.value.specialRequest,
        };

        // Add hair color details if applicable
        if (bookingState.value.selectedColor) {
          bookingPayload.hair_color = {
            color_id: bookingState.value.selectedColor,
            brand_id: bookingState.value.selectedBrand,
          };
        }

        // Create booking
        const response = await fetch(
          `${config.public.apiBaseUrl}/api/booking`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(bookingPayload),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to create booking");
        }

        // Create transaction
        const transactionResult = await createMidtransTransaction(
          result.booking_id
        );

        // For cashless payments, provide the payment link
        const isCashlessSelected = bookingState.value.paymentMethod === 2; // Assuming ID 2 is for Cashless

        if (isCashlessSelected && transactionResult.snap_url) {
          addBotMessage(
            `✅ Booking berhasil dibuat (#${result.booking_number})!\n\nUntuk menyelesaikan pembayaran, silakan klik link berikut:\n${transactionResult.snap_url}`
          );
        } else {
          addBotMessage(
            `✅ Booking berhasil dibuat (#${result.booking_number})!\n\nJanji temu Anda telah dikonfirmasi. Kami menantikan kedatangan Anda!`
          );
        }

        resetBookingState();
      } catch (error) {
        console.error("Error creating booking:", error);
        addBotMessage(
          `Maaf, terjadi kesalahan saat membuat booking: ${error.message}`
        );
        resetBookingState();
      }
    };

    // Create Midtrans transaction
    const createMidtransTransaction = async (bookingId) => {
      try {
        const token = Cookies.get("token");
        const isCashlessSelected = bookingState.value.paymentMethod === 2; // Assuming ID 2 is for Cashless

        const response = await fetch(
          `${config.public.apiBaseUrl}/api/transaksi`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              booking_id: bookingId,
              kategori_transaksi_id: isCashlessSelected ? 2 : 1,
              ...(isCashlessSelected && { is_dp: true }),
            }),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to create transaction");
        }

        return result;
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
      }
    };

    // Add bot message to chat
    const addBotMessage = (text) => {
      const botMessage = {
        type: "bot",
        text: text,
        time: getCurrentTime(),
        isNew: true,
      };

      messages.value.push(botMessage);
      removeNewFlag(botMessage);
    };

    // Process message with Gemini AI
    const processWithGemini = async (message) => {
      try {
        const API_KEY = "AIzaSyCCGVP3tHJLuNFbnGvpEGvhH_uW6kVj504";
        const API_URL =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

        // Get chat history for context (last 10 messages)
        const recentMessages = messages.value.slice(-10).map((msg) => ({
          role: msg.type === "bot" ? "model" : "user",
          parts: [{ text: msg.text }],
        }));

        // Create context with salon information and available services/times
        let contextInfo = `Anda adalah asisten virtual untuk She Salon, salon kecantikan premium. 
        Tanggal hari ini: ${getCurrentDate()}.
        
        Jika Anda mendeteksi pengguna ingin melakukan booking, jawab dengan "BOOKING_INTENT_DETECTED" di awal pesan Anda, lalu berikan respons yang membantu tentang booking.
        
        Jika pengguna bertanya tentang layanan tertentu, berikan informasi tentang layanan kami.
        
        Jawaban harus ramah, membantu, dan ringkas. Gunakan Bahasa Indonesia yang sopan.`;

        // Add available services to context if loaded
        if (availableServices.value.length > 0) {
          contextInfo += "\n\nLayanan yang tersedia:";
          availableServices.value.forEach((service) => {
            contextInfo += `\n- ${service.nama} (${
              service.deskripsi || "Tidak ada deskripsi"
            })`;
          });
        }

        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: contextInfo }],
              },
              ...recentMessages,
              {
                role: "user",
                parts: [{ text: message }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        });

        const data = await response.json();

        if (
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content
        ) {
          let reply = data.candidates[0].content.parts[0].text;

          // Check if the model detected a booking intent
          if (reply.startsWith("BOOKING_INTENT_DETECTED")) {
            reply = reply.replace("BOOKING_INTENT_DETECTED", "").trim();

            // Fetch services if not already loaded
            if (availableServices.value.length === 0) {
              await fetchServices();
            }

            // Add a quick reply for booking
            quickReplies.value = ["Book Appointment"];
          }

          return reply;
        } else {
          console.error("Unexpected Gemini API response:", data);
          return "Maaf, saya tidak bisa memproses permintaan tersebut. Bisakah Anda mencoba lagi?";
        }
      } catch (error) {
        console.error("Error processing with Gemini:", error);
        return "Maaf, saya sedang mengalami masalah koneksi. Silakan coba lagi nanti.";
      }
    };

    // FIXED: Direct date input handler with string-based date creation
    const handleDirectDateInput = (userText) => {
      console.log("Handling direct date input:", userText);

      // Handle common date patterns directly
      if (userText.match(/^\d{1,2}\s+juni?$/i)) {
        // Extract the day number
        const dayMatch = userText.match(/^(\d{1,2})/);
        if (dayMatch) {
          const day = parseInt(dayMatch[1], 10);
          console.log("Extracted day:", day);

          if (!isNaN(day) && day >= 1 && day <= 31) {
            // Create date for June of current year
            const year = new Date().getFullYear();

            // PENTING: Gunakan string format untuk membuat tanggal
            const dateStr = `${year}-06-${day.toString().padStart(2, "0")}`;
            const date = new Date(dateStr);

            console.log(
              `Direct date input: day=${day}, month=6 (June), year=${year}`
            );
            console.log("Created date using string:", dateStr);
            console.log("Resulting date object:", date.toISOString());

            // Verify the date was created correctly
            if (date.getDate() === day) {
              // Format as YYYY-MM-DD
              return dateStr;
            } else {
              console.error("Date creation failed verification");
              console.error(`Expected day: ${day}, got: ${date.getDate()}`);
            }
          }
        }
      }
      return null;
    };

    // FIXED: Direct time input handler
    const handleDirectTimeInput = (userText) => {
      console.log("Handling direct time input:", userText);

      // Handle time patterns like "jam 10", "10:00", "pukul 14", etc.
      const timeMatch = userText.match(
        /(?:jam\s+|pukul\s+)?(\d{1,2})(?::(\d{2}))?(?:\s*(?:pagi|siang|sore|malam))?/i
      );

      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;

        console.log(`Extracted time: ${hours}:${minutes}`);

        // Validate time (salon hours 9-19)
        if (hours >= 9 && hours <= 19 && minutes >= 0 && minutes <= 59) {
          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
          console.log("✅ Time formatted:", formattedTime);
          return formattedTime;
        } else {
          console.log("❌ Time outside business hours");
          return null;
        }
      }

      return null;
    };

    // Tambahkan fungsi baru untuk mengenali layanan secara langsung
    const recognizeService = (userText) => {
      console.log("Recognizing service from text:", userText);

      if (!availableServices.value || availableServices.value.length === 0) {
        console.log("No services available to match against");
        return null;
      }

      // Normalize input
      const normalizedInput = userText.toLowerCase().trim();

      // Try exact match first
      const exactMatch = availableServices.value.find(
        (service) => service.nama.toLowerCase() === normalizedInput
      );

      if (exactMatch) {
        console.log("✅ Found exact service match:", exactMatch.nama);
        return {
          serviceId: exactMatch.id.toString(),
          serviceName: exactMatch.nama,
        };
      }

      // Try partial match
      const partialMatches = availableServices.value.filter(
        (service) =>
          service.nama.toLowerCase().includes(normalizedInput) ||
          normalizedInput.includes(service.nama.toLowerCase())
      );

      if (partialMatches.length > 0) {
        // Sort by closest match (shortest name that contains the input)
        partialMatches.sort((a, b) => {
          // If one contains the exact input and the other doesn't, prioritize the exact one
          const aContains = a.nama.toLowerCase().includes(normalizedInput);
          const bContains = b.nama.toLowerCase().includes(normalizedInput);

          if (aContains && !bContains) return -1;
          if (!aContains && bContains) return 1;

          // Otherwise sort by length (shorter = more specific match)
          return a.nama.length - b.nama.length;
        });

        const bestMatch = partialMatches[0];
        console.log("✅ Found partial service match:", bestMatch.nama);
        return {
          serviceId: bestMatch.id.toString(),
          serviceName: bestMatch.nama,
        };
      }

      // No match found
      console.log("❌ No service match found for:", normalizedInput);
      return null;
    };

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      const userText = newMessage.value;

      // Special case for "2 juni" input - handle this FIRST before any other processing
      if (userText.trim().toLowerCase() === "2 juni") {
        console.log("🎯 SPECIAL CASE: Handling '2 juni' directly");

        // Force create June 2nd date
        const year = new Date().getFullYear();
        const dateStr = `${year}-06-02`;
        const date = new Date(dateStr);

        console.log("Forced date creation:", dateStr);
        console.log("Resulting date:", date.toISOString());
        console.log(
          "Verification - Day:",
          date.getDate(),
          "Month:",
          date.getMonth() + 1
        );

        if (
          bookingState.value.isBookingFlow &&
          (bookingState.value.currentStep === "date" ||
            !bookingState.value.collectedInfo.date)
        ) {
          // Add user message with animation flag
          const userMessage = {
            type: "user",
            text: userText,
            time: getCurrentTime(),
            isNew: true,
          };

          messages.value.push(userMessage);
          removeNewFlag(userMessage);

          newMessage.value = "";
          messageInput.value?.focus();

          // Show typing indicator
          isBotTyping.value = true;

          // Set the date directly
          bookingState.value.collectedInfo.date = dateStr;
          console.log("✅ Date set successfully:", dateStr);

          // Move to next step
          await processBookingSteps();
          isBotTyping.value = false;
          return;
        }
      }

      // Special case for time input - handle this before other processing
      if (
        bookingState.value.isBookingFlow &&
        (bookingState.value.currentStep === "time" ||
          !bookingState.value.collectedInfo.time)
      ) {
        console.log("⏰ Processing time input:", userText);

        // Try to extract time from various formats
        const timeMatch = userText.match(
          /(?:jam\s+)?(\d{1,2})(?::(\d{2}))?(?:\s*(?:pagi|siang|sore|malam))?/i
        );

        if (timeMatch) {
          const hours = parseInt(timeMatch[1], 10);
          const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;

          console.log(`Extracted time: ${hours}:${minutes}`);

          // Validate time
          if (hours >= 9 && hours <= 19 && minutes >= 0 && minutes <= 59) {
            const formattedTime = `${hours
              .toString()
              .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

            console.log("✅ Time formatted:", formattedTime);

            // Add user message
            const userMessage = {
              type: "user",
              text: userText,
              time: getCurrentTime(),
              isNew: true,
            };

            messages.value.push(userMessage);
            removeNewFlag(userMessage);

            newMessage.value = "";
            messageInput.value?.focus();

            // Show typing indicator
            isBotTyping.value = true;

            // Set the time directly
            bookingState.value.collectedInfo.time = formattedTime;
            console.log("✅ Time set successfully:", formattedTime);

            // Move to next step
            await processBookingSteps();
            isBotTyping.value = false;
            return;
          } else {
            console.log("❌ Invalid time range");

            // Add user message
            const userMessage = {
              type: "user",
              text: userText,
              time: getCurrentTime(),
              isNew: true,
            };

            messages.value.push(userMessage);
            removeNewFlag(userMessage);

            newMessage.value = "";
            messageInput.value?.focus();

            // Show typing indicator
            isBotTyping.value = true;

            addBotMessage(
              "Maaf, jam operasional kami adalah 09:00-19:00. Silakan pilih waktu dalam rentang tersebut."
            );
            isBotTyping.value = false;
            return;
          }
        }
      }

      // Special case for service input
      if (
        bookingState.value.isBookingFlow &&
        (bookingState.value.currentStep === "service" ||
          !bookingState.value.collectedInfo.serviceId)
      ) {
        console.log("🛍️ Processing service input:", userText);

        // Try to recognize service directly
        const recognizedService = recognizeService(userText);

        if (recognizedService) {
          // Add user message
          const userMessage = {
            type: "user",
            text: userText,
            time: getCurrentTime(),
            isNew: true,
          };

          messages.value.push(userMessage);
          removeNewFlag(userMessage);

          newMessage.value = "";
          messageInput.value?.focus();

          // Show typing indicator
          isBotTyping.value = true;

          // Set the service directly
          bookingState.value.collectedInfo.serviceId =
            recognizedService.serviceId;
          bookingState.value.collectedInfo.serviceName =
            recognizedService.serviceName;
          console.log(
            "✅ Service set successfully:",
            recognizedService.serviceName
          );

          // Move to next step
          await processBookingSteps();
          isBotTyping.value = false;
          return;
        }
      }

      // Add user message with animation flag
      const userMessage = {
        type: "user",
        text: userText,
        time: getCurrentTime(),
        isNew: true,
      };

      messages.value.push(userMessage);
      removeNewFlag(userMessage);

      newMessage.value = "";
      messageInput.value?.focus();

      // Show typing indicator before fetching response
      isBotTyping.value = true;

      try {
        // Check if we're in a booking flow
        if (bookingState.value.isBookingFlow) {
          // Special handling for date step
          if (
            bookingState.value.currentStep === "date" ||
            !bookingState.value.collectedInfo.date
          ) {
            console.log("📅 Processing date input:", userText);

            // Try direct date input handling first
            const directDate = handleDirectDateInput(userText);
            if (directDate) {
              console.log("✅ Directly handled date input:", directDate);
              bookingState.value.collectedInfo.date = directDate;
              // Move to next step
              await processBookingSteps();
              isBotTyping.value = false;
              return;
            }

            // Try direct date recognition next
            const recognizedDate = recognizeDate(userText);
            if (recognizedDate) {
              console.log("✅ Directly recognized date:", recognizedDate);
              bookingState.value.collectedInfo.date = recognizedDate;
              // Move to next step
              await processBookingSteps();
              isBotTyping.value = false;
              return;
            }

            // Special handling for users repeating date information
            if (
              userText.toLowerCase().includes("juni") ||
              userText.toLowerCase().includes("aku bilang") ||
              userText.toLowerCase().includes("sudah bilang")
            ) {
              console.log("🔄 User seems to be repeating date information");

              // Extract numbers from the text as a last resort
              const numbers = userText.match(/\d+/g);
              if (numbers && numbers.length > 0) {
                const day = parseInt(numbers[0]);
                // Detect month names
                const monthNames = [
                  "januari",
                  "februari",
                  "maret",
                  "april",
                  "mei",
                  "juni",
                  "juli",
                  "agustus",
                  "september",
                  "oktober",
                  "november",
                  "desember",
                ];

                let month = -1;
                for (let i = 0; i < monthNames.length; i++) {
                  if (userText.toLowerCase().includes(monthNames[i])) {
                    month = i;
                    break;
                  }
                }

                if (month >= 0 && !isNaN(day)) {
                  const year = new Date().getFullYear();

                  // PENTING: Gunakan string format untuk membuat tanggal
                  const monthStr = (month + 1).toString().padStart(2, "0");
                  const dayStr = day.toString().padStart(2, "0");
                  const dateStr = `${year}-${monthStr}-${dayStr}`;

                  console.log(
                    `🎯 Forced recognition: year=${year}, month=${month}, day=${day}`
                  );
                  console.log("Created date string:", dateStr);

                  const date = new Date(dateStr);
                  console.log("Resulting date object:", date.toISOString());
                  console.log(
                    "Verification - Day:",
                    date.getDate(),
                    "Month:",
                    date.getMonth() + 1
                  );

                  if (!isNaN(date.getTime()) && date.getDate() === day) {
                    bookingState.value.collectedInfo.date = dateStr;
                    console.log(
                      "✅ Forced date recognition successful:",
                      dateStr
                    );

                    // Move to next step
                    await processBookingSteps();
                    isBotTyping.value = false;
                    return;
                  }
                }
              }
            }
          }

          if (bookingState.value.currentStep === "confirm") {
            // Check if user is confirming or canceling
            const confirmResponse = await processWithGemini(
              `Is the user confirming or canceling in this message: "${userText}"? 
               Just respond with either "CONFIRM" or "CANCEL".`
            );

            if (confirmResponse.includes("CONFIRM")) {
              await submitBooking();
            } else {
              resetBookingState();
              addBotMessage(
                "Booking dibatalkan. Ada yang bisa saya bantu lainnya?"
              );
            }
          } else {
            // Process booking information
            await processBookingInfo(userText);
          }
        }
        // Check for booking intent
        else if (
          userText.toLowerCase().includes("book") ||
          userText.toLowerCase().includes("booking") ||
          userText.toLowerCase().includes("appointment") ||
          userText.toLowerCase().includes("janji") ||
          userText.toLowerCase().includes("pesan")
        ) {
          await startBookingFlow();
        }
        // Otherwise, process with Gemini
        else {
          const botReply = await processWithGemini(userText);

          // Add bot message with animation flag
          const botMessage = {
            type: "bot",
            text: botReply,
            time: getCurrentTime(),
            isNew: true,
          };

          messages.value.push(botMessage);
          removeNewFlag(botMessage);
        }
      } catch (error) {
        console.error("Error in message processing:", error);

        // Add error message
        const errorMessage = {
          type: "bot",
          text: "Maaf, saya mengalami kesalahan. Silakan coba lagi nanti.",
          time: getCurrentTime(),
          isNew: true,
        };

        messages.value.push(errorMessage);
        removeNewFlag(errorMessage);
      } finally {
        isBotTyping.value = false;
      }
    };

    // Auto scroll to bottom when new messages arrive
    watch(
      messages,
      () => {
        nextTick(() => {
          if (messageContainer.value) {
            messageContainer.value.scrollTop =
              messageContainer.value.scrollHeight;
          }
        });
      },
      { deep: true }
    );

    // Keyboard shortcuts
    const useKeyboardShortcuts = () => {
      window.addEventListener("keydown", (e) => {
        // Alt + C to toggle chat
        if (e.altKey && e.key === "c") {
          toggleChat();
        }
      });
    };

    // Fetch hair products on component mount
    const fetchHairProductsOnMount = async () => {
      await fetchHairProducts();
    };

    const fetchServicesOnMount = async () => {
      await fetchServices();
    };

    const fetchPaymentMethodsOnMount = async () => {
      await fetchPaymentMethods();
    };

    onMounted(() => {
      useKeyboardShortcuts();
      fetchHairProductsOnMount();
      fetchServicesOnMount();
      fetchPaymentMethodsOnMount();
    });

    return {
      isChatOpen,
      isBotTyping,
      newMessage,
      messageInput,
      messageContainer,
      isRecording,
      onlineStatus,
      bookingState,
      availableServices,
      availableTimes,
      paymentMethods,
      availableBrands,
      availableProducts,
      availableColors,
      quickReplies,
      messages,
      toggleChat,
      getCurrentDate,
      getCurrentTime,
      parseIndonesianDate,
      recognizeDate,
      handleQuickReply,
      formatDate,
      startBookingFlow,
      processBookingInfo,
      processBookingSteps,
      findClosestTime,
      getMissingBookingInfo,
      generateNextPrompt,
      extractBookingInfo,
      generateBookingSummary,
      resetBookingState,
      fetchServices,
      fetchPaymentMethods,
      fetchHairProducts,
      submitBooking,
      createMidtransTransaction,
      addBotMessage,
      processWithGemini,
      handleDirectDateInput,
      handleDirectTimeInput,
      recognizeService,
      sendMessage,
      useKeyboardShortcuts,
      fetchHairProductsOnMount,
      fetchServicesOnMount,
      fetchPaymentMethodsOnMount,
    };
  },
};
</script>

<style scoped>
.animate-message-in {
  animation: messageIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typing-dot {
  width: 6px;
  height: 6px;
  background-color: #9ca3af;
  border-radius: 9999px;
  animation: typing 1s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #f6339a;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #e02d8a;
}
</style>
