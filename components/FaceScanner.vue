<template>
  <div class="face-scanner overflow-x-hidden">
    <button
      @click="openModal"
      class="scan-button group relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#f6339a] to-[#f6339a] text-white transition-all duration-300 ease-out hover:scale-105"
    >
      <span
        class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease"
      >
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
        class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-xs sm:text-sm md:text-base"
        >Try Our AI Hair Stylist</span
      >
      <span class="relative invisible text-xs sm:text-sm md:text-base"
        >Try Our AI Hair Stylist</span
      >
    </button>

    <!-- Camera Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-x-hidden"
      >
        <div
          class="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-sm sm:max-w-md md:max-w-2xl shadow-2xl transform transition-all duration-300 max-h-[95vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
            <div>
              <h3
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#f6339a] to-[#db2777] bg-clip-text text-transparent"
              >
                AI Hair Style Recommendation
              </h3>
              <p
                class="text-xs sm:text-sm md:text-base text-gray-600 mt-1 font-medium"
              >
                Position your face within the frame or upload a photo
              </p>
            </div>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full"
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
          <div class="flex justify-center mb-3 sm:mb-4 md:mb-6">
            <div class="inline-flex rounded-full p-0.5 sm:p-1 bg-gray-100">
              <button
                @click="activeTab = 'camera'"
                class="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base"
                :class="[
                  activeTab === 'camera'
                    ? 'bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800',
                ]"
              >
                <div class="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                  <svg
                    class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
                class="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base"
                :class="[
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800',
                ]"
              >
                <div class="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                  <svg
                    class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
            class="relative mb-3 sm:mb-4 md:mb-6 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-gray-100"
          >
            <div class="relative" style="aspect-ratio: 4/3">
              <video
                ref="videoRef"
                autoplay
                playsinline
                muted
                class="absolute inset-0 w-full h-full object-cover"
                @loadedmetadata="onVideoLoaded"
              ></video>

              <!-- Face Detection Canvas - This will show the tracking box -->
              <canvas
                ref="faceDetectionCanvasRef"
                class="absolute inset-0 w-full h-full pointer-events-none"
                style="
                  z-index: 30;
                  background: transparent;
                  position: absolute;
                  top: 0;
                  left: 0;
                "
              ></canvas>

              <canvas
                ref="guideCanvasRef"
                class="absolute inset-0 w-full h-full pointer-events-none z-10"
                v-show="!faceDetected"
              ></canvas>

              <canvas
                ref="canvasRef"
                class="absolute inset-0 w-full h-full"
                style="display: none"
              ></canvas>

              <!-- Face Detection Status -->
              <div
                v-if="faceDetectionStatus && !isLoading"
                class="absolute top-2 right-2 px-3 py-1 rounded-full text-xs z-40"
                :class="[
                  faceDetected
                    ? 'bg-green-500/80 text-white'
                    : 'bg-red-500/80 text-white',
                ]"
              >
                {{ faceDetectionStatus }}
              </div>

              <!-- Debug Info -->
              <div
                v-if="debugInfo"
                class="absolute bottom-2 left-2 bg-black/70 text-white text-xs p-2 rounded z-40"
              >
                <div>Skin pixels: {{ debugInfo.skinPixels }}</div>
                <div>Face found: {{ debugInfo.faceFound }}</div>
                <div>Detection active: {{ debugInfo.detectionActive }}</div>
              </div>

              <!-- Scanning Animation Overlay -->
              <div
                v-if="isLoading && activeTab === 'camera'"
                class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
              >
                <div class="relative">
                  <!-- Face scanning animation -->
                  <div
                    class="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64"
                  >
                    <!-- Outer scanning ring -->
                    <div
                      class="absolute inset-0 rounded-full border-2 border-[#f6339a]/30"
                    >
                      <div
                        class="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f6339a] animate-spin"
                      ></div>
                    </div>

                    <!-- Inner scanning ring -->
                    <div
                      class="absolute inset-3 sm:inset-4 rounded-full border-2 border-[#db2777]/20"
                    >
                      <div
                        class="absolute inset-0 rounded-full border-2 border-transparent border-r-[#db2777] animate-spin"
                        style="
                          animation-duration: 1.5s;
                          animation-direction: reverse;
                        "
                      ></div>
                    </div>

                    <!-- Scanning lines -->
                    <div class="absolute inset-0 overflow-hidden rounded-full">
                      <div class="scanning-line-1"></div>
                      <div class="scanning-line-2"></div>
                      <div class="scanning-line-3"></div>
                      <div class="scanning-line-4"></div>
                    </div>

                    <!-- Center face icon -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <svg
                          class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#f6339a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>

                    <!-- Pulsing dots around the face -->
                    <div
                      class="absolute top-2 sm:top-3 md:top-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-pulse"
                    ></div>
                    <div
                      class="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-pulse"
                      style="animation-delay: 0.5s"
                    ></div>
                    <div
                      class="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-pulse"
                      style="animation-delay: 1s"
                    ></div>
                    <div
                      class="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-pulse"
                      style="animation-delay: 1.5s"
                    ></div>
                  </div>

                  <!-- Status text -->
                  <div class="text-center mt-3 sm:mt-4">
                    <p
                      class="text-sm sm:text-base md:text-lg font-medium text-white drop-shadow-lg"
                    >
                      {{ scanningStatus }}
                    </p>
                    <div class="flex justify-center mt-2 space-x-1">
                      <div
                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-bounce"
                      ></div>
                      <div
                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-bounce"
                        style="animation-delay: 0.1s"
                      ></div>
                      <div
                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f6339a] rounded-full animate-bounce"
                        style="animation-delay: 0.2s"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="mb-3 sm:mb-4 md:mb-6">
            <div
              class="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-gray-100 transition-all duration-300"
            >
              <div
                class="relative border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 md:p-6"
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

                <div
                  v-if="!uploadedImage"
                  class="text-center py-6 sm:py-8 md:py-12"
                >
                  <svg
                    class="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-400 mb-2 sm:mb-3 md:mb-4"
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
                    class="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2"
                  >
                    Drag and drop your photo here
                  </p>
                  <p class="text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">
                    or
                  </p>
                  <button
                    @click="triggerFileInput"
                    class="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white rounded-full hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base"
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
                    class="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3 bg-black/50 text-white p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                  >
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
                  class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl"
                >
                  <div class="relative">
                    <!-- Face scanning animation -->
                    <div
                      class="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                    >
                      <!-- Outer scanning ring -->
                      <div
                        class="absolute inset-0 rounded-full border-2 border-[#f6339a]/30"
                      >
                        <div
                          class="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f6339a] animate-spin"
                        ></div>
                      </div>

                      <!-- Inner scanning ring -->
                      <div
                        class="absolute inset-2 sm:inset-3 rounded-full border-2 border-[#db2777]/20"
                      >
                        <div
                          class="absolute inset-0 rounded-full border-2 border-transparent border-r-[#db2777] animate-spin"
                          style="
                            animation-duration: 1.5s;
                            animation-direction: reverse;
                          "
                        ></div>
                      </div>

                      <!-- Scanning lines -->
                      <div
                        class="absolute inset-0 overflow-hidden rounded-full"
                      >
                        <div class="scanning-line-1"></div>
                        <div class="scanning-line-2"></div>
                        <div class="scanning-line-3"></div>
                        <div class="scanning-line-4"></div>
                      </div>

                      <!-- Center face icon -->
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <svg
                            class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 h-8 text-[#f6339a]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>

                      <!-- Pulsing dots around the face -->
                      <div
                        class="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-pulse"
                      ></div>
                      <div
                        class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-pulse"
                        style="animation-delay: 0.5s"
                      ></div>
                      <div
                        class="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-pulse"
                        style="animation-delay: 1s"
                      ></div>
                      <div
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-pulse"
                        style="animation-delay: 1.5s"
                      ></div>
                    </div>

                    <!-- Status text -->
                    <div class="text-center mt-3">
                      <p
                        class="text-sm sm:text-base md:text-lg font-medium text-white drop-shadow-lg"
                      >
                        {{ scanningStatus }}
                      </p>
                      <div class="flex justify-center mt-2 space-x-1">
                        <div
                          class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-bounce"
                        ></div>
                        <div
                          class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-bounce"
                          style="animation-delay: 0.1s"
                        ></div>
                        <div
                          class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f6339a] rounded-full animate-bounce"
                          style="animation-delay: 0.2s"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center space-y-2 sm:space-y-3 md:space-y-4">
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
              class="group relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#f6339a] to-[#db2777] text-white transition-all duration-300 ease-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base w-full sm:w-auto"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
                >{{
                  activeTab === "camera" && !faceDetected
                    ? "Position Face in Frame"
                    : "Analyze My Face Shape"
                }}</span
              >
              <span class="relative invisible">{{
                activeTab === "camera" && !faceDetected
                  ? "Position Face in Frame"
                  : "Analyze My Face Shape"
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Recommendations Modal -->
    <Teleport to="body">
      <div
        v-if="isRecommendationModalOpen && currentRecommendation"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-x-hidden"
      >
        <div
          class="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl shadow-2xl relative max-h-[95vh] overflow-hidden"
        >
          <button
            @click="closeRecommendationModal"
            class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full z-20"
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

          <div class="text-center mb-3 sm:mb-4 md:mb-6">
            <h4
              class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#f6339a] to-[#db2777] bg-clip-text text-transparent"
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
          <div class="relative px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
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
                  class="w-full flex-shrink-0 px-1 sm:px-2 md:px-4"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                    >
                      <div class="relative aspect-[3/4] w-full">
                        <img
                          :src="recommendation.image"
                          :alt="recommendation.name"
                          class="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div
                        class="p-3 sm:p-4 md:p-6 bg-gradient-to-b from-white to-pink-50"
                      >
                        <h5
                          class="text-lg sm:text-xl md:text-2xl font-bold text-[#db2777] mb-1.5 sm:mb-2 md:mb-3 text-center"
                        >
                          {{ recommendation.name }}
                        </h5>
                        <p
                          class="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed"
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
                class="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/90 text-[#f6339a] rounded-full shadow-lg transition-all duration-300 disabled:opacity-30 z-10 hover:bg-pink-50"
                :disabled="currentRecommendationIndex === 0"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
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
                class="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/90 text-[#f6339a] rounded-full shadow-lg transition-all duration-300 disabled:opacity-30 z-10 hover:bg-pink-50"
                :disabled="
                  currentRecommendationIndex === recommendations.length - 1
                "
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
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
          <div class="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2">
            <button
              v-for="(_, index) in recommendations"
              :key="index"
              @click="currentRecommendationIndex = index"
              class="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300"
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
import {
  ref,
  computed,
  onBeforeUnmount,
  watch,
  nextTick,
  onMounted,
} from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNuxtApp } from "#app";

const { $firestore } = useNuxtApp();
const isModalOpen = ref(false);
const isRecommendationModalOpen = ref(false);
const stream = ref(null);
const videoRef = ref(null);
const canvasRef = ref(null);
const guideCanvasRef = ref(null);
const faceDetectionCanvasRef = ref(null);
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
const faceDetected = ref(false);
const faceDetectionStatus = ref("");
const debugInfo = ref(null);

// Face detection variables
let animationFrameId = null;
let cameraInitialized = false;
let lastFacePosition = null;
let faceStabilityCounter = 0;

const currentRecommendation = computed(() => {
  if (recommendations.value.length === 0) return null;
  return recommendations.value[currentRecommendationIndex.value];
});

// Improved face detection with better reliability
const detectFacesImproved = async () => {
  if (!videoRef.value || !faceDetectionCanvasRef.value || isLoading.value) {
    return;
  }

  const video = videoRef.value;
  const canvas = faceDetectionCanvasRef.value;
  const ctx = canvas.getContext("2d");

  // Ensure canvas matches video dimensions
  const videoRect = video.getBoundingClientRect();
  if (canvas.width !== videoRect.width || canvas.height !== videoRect.height) {
    canvas.width = videoRect.width;
    canvas.height = videoRect.height;
    canvas.style.width = videoRect.width + "px";
    canvas.style.height = videoRect.height + "px";
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  try {
    // Create temporary canvas for analysis
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;

    // Draw current video frame
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    // Get image data
    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    const data = imageData.data;

    // Multiple detection methods for better reliability
    const faceRegions = [];

    // Method 1: Skin color detection (improved)
    const skinRegion = detectSkinRegion(
      data,
      tempCanvas.width,
      tempCanvas.height
    );
    if (skinRegion) faceRegions.push(skinRegion);

    // Method 2: Brightness variation detection (for better lighting conditions)
    const brightnessRegion = detectBrightnessVariation(
      data,
      tempCanvas.width,
      tempCanvas.height
    );
    if (brightnessRegion) faceRegions.push(brightnessRegion);

    // Method 3: Edge detection for face outline
    const edgeRegion = detectFaceEdges(
      data,
      tempCanvas.width,
      tempCanvas.height
    );
    if (edgeRegion) faceRegions.push(edgeRegion);

    // Combine and validate face regions
    const bestFace = findBestFaceRegion(
      faceRegions,
      tempCanvas.width,
      tempCanvas.height
    );

    debugInfo.value = {
      skinPixels: skinRegion ? skinRegion.confidence : 0,
      faceFound: !!bestFace,
      detectionActive: true,
      regions: faceRegions.length,
    };

    if (bestFace) {
      // Stabilize detection to reduce flickering
      if (lastFacePosition && isPositionSimilar(bestFace, lastFacePosition)) {
        faceStabilityCounter++;
      } else {
        faceStabilityCounter = 0;
      }

      lastFacePosition = bestFace;

      // Only show detection box if position is stable
      if (faceStabilityCounter >= 2) {
        drawFaceBox(
          ctx,
          bestFace,
          canvas.width / video.videoWidth,
          canvas.height / video.videoHeight
        );
        faceDetected.value = true;
        faceDetectionStatus.value = "Face detected";
      }
    } else {
      faceDetected.value = false;
      faceDetectionStatus.value = "Looking for face...";
      faceStabilityCounter = 0;
    }
  } catch (error) {
    console.error("Face detection error:", error);
    faceDetected.value = false;
    faceDetectionStatus.value = "Detection error";
  }

  // Continue detection loop
  if (activeTab.value === "camera" && isModalOpen.value && !isLoading.value) {
    animationFrameId = requestAnimationFrame(detectFacesImproved);
  }
};

// Improved skin color detection
function detectSkinRegion(data, width, height) {
  const skinPixels = [];
  const blockSize = 4; // Smaller blocks for better precision

  for (let y = 0; y < height * 0.8; y += blockSize) {
    // Focus on upper 80%
    for (let x = 0; x < width; x += blockSize) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (isImprovedSkinColor(r, g, b)) {
        skinPixels.push({ x, y });
      }
    }
  }

  if (skinPixels.length < 20) return null;

  const minX = Math.min(...skinPixels.map((p) => p.x));
  const maxX = Math.max(...skinPixels.map((p) => p.x));
  const minY = Math.min(...skinPixels.map((p) => p.y));
  const maxY = Math.max(...skinPixels.map((p) => p.y));

  const faceWidth = maxX - minX;
  const faceHeight = maxY - minY;
  const aspectRatio = faceWidth / faceHeight;

  // Face validation
  if (
    aspectRatio > 0.5 &&
    aspectRatio < 1.8 &&
    faceWidth > 60 &&
    faceHeight > 80
  ) {
    return {
      x: minX,
      y: minY,
      width: faceWidth,
      height: faceHeight,
      confidence: skinPixels.length,
      method: "skin",
    };
  }

  return null;
}

// Brightness variation detection for faces
function detectBrightnessVariation(data, width, height) {
  const regions = [];
  const blockSize = 20;

  for (let y = 0; y < height - blockSize; y += blockSize) {
    for (let x = 0; x < width - blockSize; x += blockSize) {
      let totalBrightness = 0;
      let variations = 0;
      let lastBrightness = 0;

      for (let dy = 0; dy < blockSize; dy += 2) {
        for (let dx = 0; dx < blockSize; dx += 2) {
          const i = ((y + dy) * width + (x + dx)) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

          if (lastBrightness > 0) {
            variations += Math.abs(brightness - lastBrightness);
          }
          totalBrightness += brightness;
          lastBrightness = brightness;
        }
      }

      const avgBrightness = totalBrightness / ((blockSize * blockSize) / 4);
      const avgVariation = variations / ((blockSize * blockSize) / 4);

      // Face regions typically have moderate brightness and variation
      if (
        avgBrightness > 80 &&
        avgBrightness < 200 &&
        avgVariation > 10 &&
        avgVariation < 50
      ) {
        regions.push({
          x: x,
          y: y,
          width: blockSize * 3,
          height: blockSize * 4,
          confidence: avgVariation,
          method: "brightness",
        });
      }
    }
  }

  return regions.length > 0 ? regions[0] : null;
}

// Simple edge detection for face outline
function detectFaceEdges(data, width, height) {
  const edges = [];

  for (let y = 1; y < height - 1; y += 3) {
    for (let x = 1; x < width - 1; x += 3) {
      const i = (y * width + x) * 4;

      // Simple Sobel edge detection
      const gx =
        -data[((y - 1) * width + (x - 1)) * 4] +
        data[((y - 1) * width + (x + 1)) * 4] +
        -2 * data[(y * width + (x - 1)) * 4] +
        2 * data[(y * width + (x + 1)) * 4] +
        -data[((y + 1) * width + (x - 1)) * 4] +
        data[((y + 1) * width + (x + 1)) * 4];

      const gy =
        -data[((y - 1) * width + (x - 1)) * 4] -
        2 * data[((y - 1) * width + x) * 4] -
        data[((y - 1) * width + (x + 1)) * 4] +
        data[((y + 1) * width + (x - 1)) * 4] +
        2 * data[((y + 1) * width + x) * 4] +
        data[((y + 1) * width + (x + 1)) * 4];

      const magnitude = Math.sqrt(gx * gx + gy * gy);

      if (magnitude > 30) {
        // Edge threshold
        edges.push({ x, y });
      }
    }
  }

  if (edges.length < 50) return null;

  const minX = Math.min(...edges.map((p) => p.x));
  const maxX = Math.max(...edges.map((p) => p.x));
  const minY = Math.min(...edges.map((p) => p.y));
  const maxY = Math.max(...edges.map((p) => p.y));

  const faceWidth = maxX - minX;
  const faceHeight = maxY - minY;

  if (faceWidth > 80 && faceHeight > 100) {
    return {
      x: minX,
      y: minY,
      width: faceWidth,
      height: faceHeight,
      confidence: edges.length,
      method: "edges",
    };
  }

  return null;
}

// Find the best face region from multiple detection methods
function findBestFaceRegion(regions, width, height) {
  if (regions.length === 0) return null;

  // Score each region based on multiple factors
  const scoredRegions = regions.map((region) => {
    let score = 0;

    // Size score (prefer medium-sized faces)
    const sizeRatio = (region.width * region.height) / (width * height);
    if (sizeRatio > 0.05 && sizeRatio < 0.4) score += 30;

    // Position score (prefer center-upper area)
    const centerX = region.x + region.width / 2;
    const centerY = region.y + region.height / 2;
    const distanceFromCenter = Math.abs(centerX - width / 2) / width;
    const heightPosition = centerY / height;

    if (distanceFromCenter < 0.3) score += 20;
    if (heightPosition > 0.2 && heightPosition < 0.7) score += 20;

    // Aspect ratio score
    const aspectRatio = region.width / region.height;
    if (aspectRatio > 0.6 && aspectRatio < 1.4) score += 25;

    // Confidence score
    score += Math.min(region.confidence / 10, 20);

    return { ...region, score };
  });

  // Return the highest scoring region
  return scoredRegions.reduce((best, current) =>
    current.score > best.score ? current : best
  );
}

// Check if two face positions are similar (for stability)
function isPositionSimilar(face1, face2, threshold = 30) {
  const dx = Math.abs(face1.x - face2.x);
  const dy = Math.abs(face1.y - face2.y);
  const dw = Math.abs(face1.width - face2.width);
  const dh = Math.abs(face1.height - face2.height);

  return dx < threshold && dy < threshold && dw < threshold && dh < threshold;
}

// Improved skin color detection
function isImprovedSkinColor(r, g, b) {
  // Multiple skin tone ranges for better coverage

  // Range 1: Light skin tones
  const light =
    r > 180 &&
    r < 255 &&
    g > 160 &&
    g < 220 &&
    b > 140 &&
    b < 200 &&
    r > g &&
    r > b &&
    r - g < 40 &&
    r - b < 60;

  // Range 2: Medium skin tones
  const medium =
    r > 120 &&
    r < 200 &&
    g > 90 &&
    g < 160 &&
    b > 70 &&
    b < 130 &&
    r > g &&
    r > b &&
    r - g > 5 &&
    r - b > 15;

  // Range 3: Darker skin tones
  const dark =
    r > 80 &&
    r < 150 &&
    g > 60 &&
    g < 120 &&
    b > 40 &&
    b < 100 &&
    r >= g &&
    r >= b &&
    r - b > 10;

  // Range 4: Asian skin tones
  const asian =
    r > 160 &&
    r < 220 &&
    g > 140 &&
    g < 190 &&
    b > 100 &&
    b < 160 &&
    Math.abs(r - g) < 30 &&
    r > b &&
    r - b > 20;

  return light || medium || dark || asian;
}

// Draw face detection box
function drawFaceBox(ctx, face, scaleX, scaleY) {
  const displayX = face.x * scaleX;
  const displayY = face.y * scaleY;
  const displayWidth = face.width * scaleX;
  const displayHeight = face.height * scaleY;

  // Main face box
  ctx.strokeStyle = "#00ff66";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00ff66";
  ctx.shadowBlur = 10;
  ctx.strokeRect(displayX, displayY, displayWidth, displayHeight);

  // Corner markers
  const cornerSize = 15;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ff0066";

  // Draw corners
  drawCorner(ctx, displayX, displayY, cornerSize, "top-left");
  drawCorner(ctx, displayX + displayWidth, displayY, cornerSize, "top-right");
  drawCorner(
    ctx,
    displayX,
    displayY + displayHeight,
    cornerSize,
    "bottom-left"
  );
  drawCorner(
    ctx,
    displayX + displayWidth,
    displayY + displayHeight,
    cornerSize,
    "bottom-right"
  );

  // Label
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#00ff66";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.fillText("FACE DETECTED", displayX + displayWidth / 2, displayY - 10);
}

// Draw corner markers
function drawCorner(ctx, x, y, size, position) {
  ctx.beginPath();
  switch (position) {
    case "top-left":
      ctx.moveTo(x, y + size);
      ctx.lineTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case "top-right":
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size);
      break;
    case "bottom-left":
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case "bottom-right":
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y - size);
      break;
  }
  ctx.stroke();
}

// Video loaded event handler
const onVideoLoaded = () => {
  console.log("Video loaded, starting face detection");
  setTimeout(() => {
    startFaceDetection();
  }, 500);
};

// Start face detection loop
const startFaceDetection = () => {
  console.log("Starting improved face detection");
  if (videoRef.value && activeTab.value === "camera") {
    detectFacesImproved();
  }
};

// Stop face detection loop
const stopFaceDetection = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  faceDetected.value = false;
  faceDetectionStatus.value = "";
  lastFacePosition = null;
  faceStabilityCounter = 0;

  // Clear detection canvas
  if (faceDetectionCanvasRef.value) {
    const ctx = faceDetectionCanvasRef.value.getContext("2d");
    ctx.clearRect(
      0,
      0,
      faceDetectionCanvasRef.value.width,
      faceDetectionCanvasRef.value.height
    );
  }
};

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
      const rect = video.getBoundingClientRect();
      guideCanvas.width = rect.width;
      guideCanvas.height = rect.height;
      drawFaceGuide(guideCanvas);
    }
  }, 100);
};

const openModal = async () => {
  isModalOpen.value = true;
  activeTab.value = "camera";
  uploadedImage.value = null;

  // Wait for the next tick to ensure the modal and video element are rendered
  await nextTick();

  // Initialize camera only if it hasn't been initialized before and we're on camera tab
  if (activeTab.value === "camera" && !cameraInitialized) {
    await initializeCamera();
    cameraInitialized = true;
  }
};

const initializeCamera = async () => {
  if (!videoRef.value) {
    console.error("Video element not available");
    return;
  }

  isLoading.value = true;
  scanningStatus.value = "Initializing camera...";

  try {
    // Stop any existing stream first
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
      stream.value = null;
    }

    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
      },
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;

      // Wait for the video to be ready
      await new Promise((resolve, reject) => {
        videoRef.value.onloadedmetadata = () => {
          videoRef.value.play().then(resolve).catch(reject);
        };
        videoRef.value.onerror = reject;
      });

      // Initialize guide canvas after video is ready
      setTimeout(() => {
        initializeGuideCanvas();
      }, 300);
    }
  } catch (error) {
    console.error("Error accessing camera:", error);
    scanningStatus.value =
      "Error accessing camera. Please check permissions and try again.";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  stopFaceDetection();

  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
  }

  uploadedImage.value = null;
  cameraInitialized = false;
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
    stopFaceDetection(); // Stop face detection during processing
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

watch(activeTab, async (newTab) => {
  if (
    newTab === "camera" &&
    !stream.value &&
    !cameraInitialized &&
    isModalOpen.value
  ) {
    await nextTick();
    await initializeCamera();
    cameraInitialized = true;
  } else if (newTab === "upload") {
    // Stop camera stream and face detection when switching to upload tab
    stopFaceDetection();
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
  stopFaceDetection();
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
});
</script>

<style scoped>
/* Scanning line animations */
.scanning-line-1 {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 20%;
  background: linear-gradient(to bottom, #f6339a, transparent);
  transform: translateX(-50%);
  animation: scanRotate 2s linear infinite;
}

.scanning-line-2 {
  position: absolute;
  top: 50%;
  right: 0;
  width: 20%;
  height: 2px;
  background: linear-gradient(to left, #db2777, transparent);
  transform: translateY(-50%);
  animation: scanRotate 2s linear infinite;
  animation-delay: 0.5s;
}

.scanning-line-3 {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 2px;
  height: 20%;
  background: linear-gradient(to top, #f6339a, transparent);
  transform: translateX(-50%);
  animation: scanRotate 2s linear infinite;
  animation-delay: 1s;
}

.scanning-line-4 {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20%;
  height: 2px;
  background: linear-gradient(to right, #db2777, transparent);
  transform: translateY(-50%);
  animation: scanRotate 2s linear infinite;
  animation-delay: 1.5s;
}

@keyframes scanRotate {
  0% {
    opacity: 0;
    transform: rotate(0deg) translateX(-50%) translateY(-50%);
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(360deg) translateX(-50%) translateY(-50%);
  }
}

/* Enhanced scanning animation */
@keyframes faceScan {
  0% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.8) rotate(360deg);
    opacity: 0.5;
  }
}

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
</style>
