<template>
  <div class="face-scanner">
    <button
      @click="openModal"
      class="scan-button group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#f6339a] to-[#f6339a] text-white transition-all duration-300 ease-out hover:scale-105"
    >
      <span
        class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease"
      >
        <svg
          class="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </span>
      <span
        class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-sm sm:text-base"
        >Try Our AI Hair Stylist</span
      >
      <span class="relative invisible text-sm sm:text-base"
        >Try Our AI Hair Stylist</span
      >
    </button>

    <!-- Camera Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-4 sm:mb-6">
            <div>
              <h3
                class="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f6339a] to-[#db2777] bg-clip-text text-transparent"
              >
                AI Hair Style Recommendation
              </h3>
              <p
                class="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 font-medium"
              >
                Position your face within the frame or upload a photo
              </p>
            </div>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Tab Buttons -->
          <div class="flex justify-center mb-4 sm:mb-6">
            <div class="inline-flex rounded-full p-1 bg-gray-100">
              <button
                @click="activeTab = 'camera'"
                class="px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
                :class="[
                  activeTab === 'camera'
                    ? 'bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800',
                ]"
              >
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>Camera</span>
                </div>
              </button>
              <button
                @click="activeTab = 'upload'"
                class="px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
                :class="[
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800',
                ]"
              >
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg>
                  <span>Upload</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Camera Tab -->
          <div
            v-if="activeTab === 'camera'"
            class="relative mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gray-100"
          >
            <div class="relative" style="aspect-ratio: 4/3">
              <video
                ref="videoRef"
                autoplay
                playsinline
                class="absolute inset-0 w-full h-full object-cover"
              ></video>
              <canvas
                ref="guideCanvasRef"
                class="absolute inset-0 w-full h-full pointer-events-none z-10"
              ></canvas>
              <canvas
                ref="canvasRef"
                class="absolute inset-0 w-full h-full"
              ></canvas>

              <div
                v-if="isLoading && activeTab === 'camera'"
                class="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm"
              >
                <div class="text-center">
                  <div
                    class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-[#f6339a] border-gray-200 mb-3 sm:mb-4"
                  ></div>
                  <p class="text-base sm:text-lg font-medium text-gray-800">
                    {{ scanningStatus }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="mb-4 sm:mb-6">
            <div
              class="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gray-100 transition-all duration-300"
            >
              <div
                class="relative border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6"
                :class="{ 'border-[#f6339a]': isDragging }"
                @dragenter.prevent="isDragging = true"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop($event)"
              >
                <input
                  type="file"
                  ref="fileInputRef"
                  @change="handleFileChange"
                  accept="image/*"
                  class="hidden"
                />

                <div v-if="!uploadedImage" class="text-center py-8 sm:py-12">
                  <svg
                    class="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg>
                  <p
                    class="text-base sm:text-lg font-medium text-gray-700 mb-2"
                  >
                    Drag and drop your photo here
                  </p>
                  <p class="text-gray-500 mb-4">or</p>
                  <button
                    @click="triggerFileInput"
                    class="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white rounded-full hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    Browse Files
                  </button>
                </div>

                <!-- Preview of uploaded image -->
                <div v-else class="relative overflow-hidden">
                  <div class="relative" style="aspect-ratio: 4/3">
                    <img
                      :src="uploadedImage"
                      alt="Uploaded face"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <canvas
                      ref="uploadCanvasRef"
                      class="absolute inset-0 w-full h-full"
                      style="display: none"
                    ></canvas>
                  </div>
                  <button
                    @click="clearUploadedImage"
                    class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                  >
                    <svg
                      class="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <!-- Loading overlay for upload tab -->
                <div
                  v-if="isLoading && activeTab === 'upload'"
                  class="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl"
                >
                  <div class="text-center">
                    <div
                      class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-[#f6339a] border-gray-200 mb-3 sm:mb-4"
                    ></div>
                    <p class="text-base sm:text-lg font-medium text-gray-800">
                      {{ scanningStatus }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center space-y-3 sm:space-y-4">
            <p
              v-if="scanningStatus"
              class="text-xs sm:text-sm md:text-base text-gray-600 font-medium"
            >
              {{ scanningStatus }}
            </p>
            <button
              @click="startScan"
              :disabled="
                (activeTab === 'upload' && !uploadedImage) || isLoading
              "
              class="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white transition-all duration-300 ease-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease"
                >Analyze My Face Shape</span
              >
              <span class="relative invisible">Analyze My Face Shape</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Recommendations Modal -->
    <Teleport to="body">
      <div
        v-if="isRecommendationModalOpen && currentRecommendation"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div
          class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-5xl shadow-2xl relative max-h-[90vh] overflow-hidden"
        >
          <button
            @click="closeRecommendationModal"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full z-20"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="text-center mb-4 sm:mb-6">
            <h4
              class="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f6339a] to-[#db2777] bg-clip-text text-transparent"
            >
              Recommended Hairstyles for {{ detectedFaceShape }} Face Shape
            </h4>
            <p
              class="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2"
            >
              These styles are perfectly suited for your unique facial features
            </p>
          </div>

          <!-- Recommendation Carousel -->
          <div class="relative px-8 sm:px-12 overflow-hidden">
            <!-- Mobile & Desktop Carousel -->
            <div class="relative">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${
                    currentRecommendationIndex * 100
                  }%)`,
                }"
              >
                <div
                  v-for="(recommendation, index) in recommendations"
                  :key="recommendation.id"
                  class="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto"
                    >
                      <div class="relative aspect-[3/4] w-full">
                        <img
                          :src="recommendation.image"
                          :alt="recommendation.name"
                          class="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div
                        class="p-4 sm:p-6 bg-gradient-to-b from-white to-pink-50"
                      >
                        <h5
                          class="text-xl sm:text-2xl font-bold text-[#db2777] mb-2 sm:mb-3 text-center"
                        >
                          {{ recommendation.name }}
                        </h5>
                        <p
                          class="text-gray-700 text-sm sm:text-base leading-relaxed"
                        >
                          {{ recommendation.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Arrows -->
              <button
                @click="showPreviousRecommendation"
                class="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-[#f6339a] rounded-full shadow-lg transition-all duration-300 disabled:opacity-30 z-10 hover:bg-pink-50"
                :disabled="currentRecommendationIndex === 0"
              >
                <svg
                  class="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                @click="showNextRecommendation"
                class="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-[#f6339a] rounded-full shadow-lg transition-all duration-300 disabled:opacity-30 z-10 hover:bg-pink-50"
                :disabled="
                  currentRecommendationIndex === recommendations.length - 1
                "
              >
                <svg
                  class="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="flex justify-center mt-6 gap-2">
            <button
              v-for="(_, index) in recommendations"
              :key="index"
              @click="currentRecommendationIndex = index"
              class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
              :class="[
                index === currentRecommendationIndex
                  ? 'bg-[#f6339a] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400',
              ]"
              :aria-label="`View hairstyle ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNuxtApp } from "#app";

const { $firestore } = useNuxtApp();
const isModalOpen = ref(false);
const isRecommendationModalOpen = ref(false);
const stream = ref(null);
const videoRef = ref(null);
const canvasRef = ref(null);
const guideCanvasRef = ref(null);
const uploadCanvasRef = ref(null);
const fileInputRef = ref(null);
const isLoading = ref(false);
const scanningStatus = ref("");
const recommendations = ref([]);
const currentRecommendationIndex = ref(0);
const detectedFaceShape = ref("");
const activeTab = ref("camera");
const uploadedImage = ref(null);
const isDragging = ref(false);
let animationFrameId = null;
let cameraInitialized = false; // Flag to track camera initialization

const currentRecommendation = computed(() => {
  if (recommendations.value.length === 0) return null;
  return recommendations.value[currentRecommendationIndex.value];
});

const showNextRecommendation = () => {
  if (currentRecommendationIndex.value < recommendations.value.length - 1) {
    currentRecommendationIndex.value++;
  }
};

const showPreviousRecommendation = () => {
  if (currentRecommendationIndex.value > 0) {
    currentRecommendationIndex.value--;
  }
};

const openRecommendationModal = () => {
  // Close the camera modal when opening recommendations
  closeModal();

  isRecommendationModalOpen.value = true;
  currentRecommendationIndex.value = 0;
};

const closeRecommendationModal = () => {
  isRecommendationModalOpen.value = false;
};

const drawFaceGuide = (canvas) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Create gradient for guide
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(249, 116, 116, 0.3)");
  gradient.addColorStop(1, "rgba(255, 87, 87, 0.3)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;

  const centerX = width / 2;
  const centerY = height / 2;
  const faceWidth = width * 0.4;
  const faceHeight = height * 0.6;

  // Draw outer glow
  ctx.shadowColor = "rgba(249, 116, 116, 0.5)";
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    faceWidth / 2,
    faceHeight / 2,
    0,
    0,
    2 * Math.PI
  );
  ctx.stroke();

  // Reset shadow for text
  ctx.shadowBlur = 0;

  // Add guide text with gradient
  const textGradient = ctx.createLinearGradient(
    centerX - 100,
    height - 40,
    centerX + 100,
    height - 20
  );
  textGradient.addColorStop(0, "#f6339a");
  textGradient.addColorStop(1, "#db2777");

  ctx.fillStyle = textGradient;
  ctx.font = "600 16px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Align your face within the frame", centerX, height - 30);
};

const initializeGuideCanvas = () => {
  if (!videoRef.value || !guideCanvasRef.value) return;

  const video = videoRef.value;
  const guideCanvas = guideCanvasRef.value;

  const checkDimensions = setInterval(() => {
    if (video.videoWidth && video.videoHeight) {
      clearInterval(checkDimensions);
      guideCanvas.width = video.videoWidth;
      guideCanvas.height = video.videoHeight;
      drawFaceGuide(guideCanvas);
    }
  }, 100);
};

const openModal = async () => {
  isModalOpen.value = true;
  activeTab.value = "camera";
  uploadedImage.value = null;

  // Initialize camera only if it hasn't been initialized before
  if (activeTab.value === "camera" && !cameraInitialized) {
    await initializeCamera();
    cameraInitialized = true; // Set the flag to true after initialization
  }
};

const initializeCamera = async () => {
  isLoading.value = true;
  scanningStatus.value = "Initializing camera...";

  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480,
        facingMode: "user",
      },
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;
      await videoRef.value.play();
      initializeGuideCanvas();
    }
  } catch (error) {
    console.error("Error:", error);
    scanningStatus.value = "Error accessing camera. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null; // Also set stream.value to null
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  uploadedImage.value = null;
  cameraInitialized = false; // Reset the flag when closing the modal
};

const drawFaceShape = (ctx, detection) => {
  const { xcenter, ycenter, width, height } = detection;

  // Create gradient for detection box
  const gradient = ctx.createLinearGradient(
    xcenter - width / 2,
    ycenter - height / 2,
    xcenter + width / 2,
    ycenter + height / 2
  );
  gradient.addColorStop(0, "#f6339a");
  gradient.addColorStop(1, "#db2777");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(249, 116, 116, 0.5)";
  ctx.shadowBlur = 10;

  // Draw detection box
  ctx.beginPath();
  ctx.rect(xcenter - width / 2, ycenter - height / 2, width, height);
  ctx.stroke();

  // Reset shadow for text
  ctx.shadowBlur = 0;

  // Add detection text with gradient
  const textGradient = ctx.createLinearGradient(
    xcenter - width / 2,
    ycenter - height / 2 - 20,
    xcenter + width / 2,
    ycenter - height / 2 - 20
  );
  textGradient.addColorStop(0, "#f6339a");
  textGradient.addColorStop(1, "#db2777");

  ctx.fillStyle = textGradient;
  ctx.font = "600 20px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    `Face Shape: ${detection.name} (${Math.round(
      detection.confidence * 100
    )}%)`,
    xcenter,
    ycenter - height / 2 - 10
  );
};

const captureFace = async () => {
  if (!canvasRef.value && !uploadCanvasRef.value) return;

  let canvas;

  if (activeTab.value === "camera") {
    if (!videoRef.value) return;

    const video = videoRef.value;
    canvas = canvasRef.value;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  } else {
    // Use the uploaded image
    canvas = uploadCanvasRef.value;
    const img = new Image();
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      await processCapturedImage(canvas);
    };
    img.src = uploadedImage.value;
    return; // Return early as we'll call processCapturedImage in the onload callback
  }

  await processCapturedImage(canvas);
};

const processCapturedImage = async (canvas) => {
  try {
    isLoading.value = true;
    scanningStatus.value = "Analyzing your face shape...";

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "face.jpg");

    const response = await fetch(
      "https://modeldetection-api-401887634547.asia-southeast2.run.app/detect",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Detection API request failed");
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.detections && result.detections.length > 0) {
      const bestDetection = result.detections.sort(
        (a, b) => b.confidence - a.confidence
      )[0];

      // Store the detected face shape
      detectedFaceShape.value = bestDetection.name;

      // Draw face shape on the canvas
      const ctx = canvas.getContext("2d");
      drawFaceShape(ctx, bestDetection);

      scanningStatus.value = `Analysis complete! Your face shape is ${
        bestDetection.name
      } (${Math.round(bestDetection.confidence * 100)}% confidence)`;

      await getRecommendations(bestDetection.name);
      openRecommendationModal();
    } else {
      scanningStatus.value = "No face detected. Please try again.";
    }
  } catch (error) {
    console.error("Detection error:", error);
    scanningStatus.value = "Error analyzing face. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const startScan = () => {
  captureFace();
};

const getRecommendations = async (faceShape) => {
  try {
    console.log("Detected face shape:", faceShape);
    const shapeCollection = collection($firestore, faceShape.toLowerCase());
    const snapshot = await getDocs(shapeCollection);

    const styles = [];
    snapshot.forEach((doc) => {
      styles.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    recommendations.value = styles;
    console.log("Recommendations:", recommendations.value);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

// File upload handling
const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    processUploadedFile(file);
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    processUploadedFile(file);
  } else {
    scanningStatus.value = "Please upload an image file.";
  }
};

const processUploadedFile = (file) => {
  if (!file || !file.type.startsWith("image/")) {
    scanningStatus.value = "Please upload a valid image file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    scanningStatus.value =
      "Image uploaded successfully. Click 'Analyze' to continue.";

    // Prepare the canvas for later use with the image
    if (uploadCanvasRef.value) {
      const canvas = uploadCanvasRef.value;
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
      };
      img.src = uploadedImage.value;
    }
  };
  reader.readAsDataURL(file);
};

const clearUploadedImage = () => {
  uploadedImage.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
  scanningStatus.value = "";
};

// Watch for tab changes to initialize camera or clean up
watch(activeTab, (newTab) => {
  if (newTab === "camera" && !stream.value && !cameraInitialized) {
    initializeCamera();
    cameraInitialized = true;
  } else if (newTab === "upload") {
    // Stop camera stream when switching to upload tab
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
      stream.value = null;
      cameraInitialized = false;
    }
    scanningStatus.value = "";
  }
});

// Clean up resources when component is unmounted
onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// Make sure to import watch
</script>

<style scoped>
/* Enhanced styling for face scanner */
.face-scanner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scan-button {
  min-width: 160px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(246, 51, 154, 0.25);
  @media (min-width: 640px) {
    min-width: 200px;
    padding: 0.875rem 1.75rem;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Improved camera guide */
.absolute.inset-0.flex.items-center.justify-center.bg-white\/70.backdrop-blur-sm {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}

/* Enhanced loading animation */
.animate-spin.rounded-full.h-10.w-10.sm\:h-12.sm\:w-12.border-4.border-t-\[#f6339a\].border-gray-200.mb-3.sm\:mb-4 {
  box-shadow: 0 0 15px rgba(246, 51, 154, 0.3);
}

/* Improved recommendation cards */
.bg-white.rounded-2xl.shadow-xl.overflow-hidden.h-full {
  border: 1px solid rgba(246, 51, 154, 0.1);
  transition: all 0.3s ease;
}

.bg-white.rounded-2xl.shadow-xl.overflow-hidden.h-full:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(246, 51, 154, 0.2);
}

/* Enhanced navigation buttons */
.absolute.-left-2.top-1\/2.-translate-y-1\/2.p-2.text-\[#f6339a\].hover\:bg-pink-500.rounded-full.transition-all.duration-300.disabled\:opacity-30,
.absolute.-right-2.top-1\/2.-translate-y-1\/2.p-2.text-\[#f6339a\].hover\:bg-pink-500.rounded-full.transition-all.duration-300.disabled\:opacity-30 {
  background: white;
  box-shadow: 0 4px 12px rgba(246, 51, 154, 0.2);
}

.absolute.-left-2.top-1\/2.-translate-y-1\/2.p-2.text-\[#f6339a\].hover\:bg-pink-500.rounded-full.transition-all.duration-300.disabled\:opacity-30:hover,
.absolute.-right-2.top-1\/2.-translate-y-1\/2.p-2.text-\[#f6339a\].hover\:bg-pink-500.rounded-full.transition-all.duration-300.disabled\:opacity-30:hover {
  background: rgba(246, 51, 154, 0.1);
}

.fixed.inset-0.z-\[9999\].flex.items-center.justify-center.p-4 {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.bg-white\/95.backdrop-blur-sm.rounded-2xl.sm\:rounded-3xl.p-4.sm\:p-6.md\:p-8.w-full.max-w-2xl.shadow-2xl.transform.transition-all.duration-300.max-h-\[90vh\].overflow-y-auto {
  border: 1px solid rgba(246, 51, 154, 0.1);
  box-shadow: 0 25px 50px -12px rgba(246, 51, 154, 0.25);
}

.relative.mb-4.sm\:mb-6.rounded-xl.sm\:rounded-2xl.overflow-hidden.shadow-xl.bg-gray-100 {
  border: 2px solid rgba(246, 51, 154, 0.1);
  box-shadow: 0 10px 25px -5px rgba(246, 51, 154, 0.2);
}

.rounded-xl.sm\:rounded-2xl.overflow-hidden.shadow-xl.bg-gray-100.transition-all.duration-300 {
  border: 2px solid rgba(246, 51, 154, 0.1);
  box-shadow: 0 10px 25px -5px rgba(246, 51, 154, 0.2);
}

.inline-flex.rounded-full.p-1.bg-gray-100 {
  padding: 0.25rem;
  background: rgba(246, 51, 154, 0.1);
  box-shadow: 0 2px 8px -2px rgba(246, 51, 154, 0.15);
}

.px-4.sm\:px-6.py-2.rounded-full.transition-all.duration-300.text-sm.sm\:text-base {
  font-weight: 500;
}

.fixed.inset-0.z-\[10000\].flex.items-center.justify-center.p-4 {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
}

.bg-white\/95.backdrop-blur-sm.rounded-2xl.sm\:rounded-3xl.p-4.sm\:p-6.md\:p-8.w-full.max-w-7xl.shadow-2xl.relative.h-\[90vh\].sm\:h-5\/6 {
  border: 1px solid rgba(246, 51, 154, 0.1);
  box-shadow: 0 25px 50px -12px rgba(246, 51, 154, 0.3);
}

.text-xl.sm\:text-2xl.md\:text-3xl.font-bold.bg-gradient-to-r.from-\[#f6339a\].to-\[#db2777\].bg-clip-text.text-transparent {
  background-size: 200% auto;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

/* Enhanced recommendation modal */
.fixed.inset-0.z-\[10000\].flex.items-center.justify-center.p-4.bg-black\/60.backdrop-blur-sm {
  animation: fadeIn 0.3s ease-out;
}

.bg-white.rounded-xl.shadow-lg.overflow-hidden.w-full.max-w-md.mx-auto {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bg-white.rounded-xl.shadow-lg.overflow-hidden.w-full.max-w-md.mx-auto:hover {
  transform: translateY(-5px);
}

.relative.aspect-\[3\/4\].w-full {
  overflow: hidden;
}

.relative.aspect-\[3\/4\].w-full img {
  transition: transform 0.5s ease;
}

.relative.aspect-\[3\/4\].w-full:hover img {
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
