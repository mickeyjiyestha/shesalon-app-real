<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="bg-[#f6339a] hover:bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
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
      class="absolute bottom-0 right-0 w-80 md:w-96 bg-white rounded-t-lg shadow-2xl overflow-hidden flex flex-col"
      style="height: 600px; max-height: 80vh"
    >
      <!-- Chat Header -->
      <div class="bg-[#f6339a] p-3 flex items-center justify-between">
        <div class="flex items-center">
          <h3 class="text-white text-base font-medium">She Salon</h3>
        </div>
        <button @click="toggleChat" class="text-white">
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
        class="p-2 bg-gray-100 border-b border-gray-200 text-xs text-center text-gray-500"
      >
        April 16 at 7:14 PM
      </div>

      <!-- Chat Messages -->
      <div
        class="flex-1 overflow-y-auto p-3 space-y-4 bg-white"
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
                class="bg-gray-100 rounded-2xl p-3 text-sm whitespace-pre-line"
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
              class="bg-[#f6339a] text-white rounded-2xl p-3 text-sm"
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
            class="bg-[#f6339a] text-white rounded-full px-4 py-2 text-sm hover:bg-pink-600 transition-colors duration-200"
          >
            {{ reply }}
          </button>
        </div>

        <!-- Bot Typing Indicator -->
        <div v-if="isBotTyping" class="mb-4 animate-message-in">
          <div class="text-xs text-gray-500 mb-1">Maksima's Bot</div>
          <div class="flex items-start">
            <div
              class="bg-gray-100 rounded-2xl p-3"
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
      <div class="p-3 bg-white border-t border-gray-200">
        <div
          class="flex items-center rounded-full border border-gray-300 overflow-hidden bg-white"
        >
          <input
            v-model="newMessage"
            type="text"
            :placeholder="inputPlaceholder"
            :disabled="isBotTyping"
            ref="messageInput"
            @keypress.enter="sendMessage"
            class="flex-1 px-4 py-2 text-sm focus:outline-none"
            :class="{ 'bg-gray-100': isBotTyping }"
          />
          <button
            type="button"
            @click="sendMessage"
            class="p-2 text-gray-400 hover:text-gray-600"
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

<script setup>
import { ref, watch, onMounted, computed, nextTick } from "vue";

const isChatOpen = ref(false);
const isBotTyping = ref(false);
const newMessage = ref("");
const messageInput = ref(null);
const messageContainer = ref(null);
const isRecording = ref(false);
const onlineStatus = ref("Online");

// Quick replies based on common queries
const quickReplies = ref(["FAQ", "Tanya hal lain"]);

// Get greeting based on time of day
const getGreeting = () => {
  return "Halo ada yang bisa saya bantu?\nAnda bisa tanyakan apa saja, saya akan bantu cari jawaban 😊\n\nAtau ada hal lain yang ingin Anda ketahui?";
};

const messages = ref([
  {
    type: "bot",
    text: getGreeting(),
    time: "7:14 PM",
    isNew: false,
  },
]);

// Remove isNew flag after animation completes
const removeNewFlag = (message) => {
  setTimeout(() => {
    message.isNew = false;
  }, 1000); // Match this with your animation duration
};

// Computed placeholder text
const inputPlaceholder = computed(() => {
  return "Type a message...";
});

// Toggle chat and focus input
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value) {
    setTimeout(() => {
      messageInput.value?.focus();
    }, 300);
  }
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Handle quick replies
const handleQuickReply = (reply) => {
  newMessage.value = reply;
  sendMessage();
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userText = newMessage.value;

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
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay for typing animation

  const botReply = await fetchBotResponse(userText);

  isBotTyping.value = false;

  // Add bot message with animation flag
  const botMessage = {
    type: "bot",
    text: botReply,
    time: getCurrentTime(),
    isNew: true,
  };

  messages.value.push(botMessage);
  removeNewFlag(botMessage);
};

const fetchBotResponse = async (message) => {
  try {
    const response = await fetch(
      "https://shesalon-chatbot-401887634547.asia-southeast2.run.app/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();
    return data.response || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
};

// Auto scroll to bottom when new messages arrive
watch(
  messages,
  () => {
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    });
  },
  { deep: true }
);

// Keyboard shortcuts
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    // Alt + C to toggle chat
    if (e.altKey && e.key === "c") {
      toggleChat();
    }
  });
});
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
  background: #ddd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
