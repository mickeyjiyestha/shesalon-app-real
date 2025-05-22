<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import ProfileDropdown from "@/components/ProfileDropdown.vue";
import FaceScanner from "@/components/FaceScanner.vue";
import LoginModal from "@/components/LoginModal.vue";
import BookingModal from "@/components/BookingModal.vue";
import Brands from "@/components/Brands.vue";
import Founder from "@/components/Founder.vue";
import Services from "@/components/Services.vue";
import HairstyleCard from "@/components/HairstyleCard.vue";
import WhyChoosingUs from "@/components/WhyChoosingUs.vue";
import Testimonial from "@/components/Testimonial.vue";
import Footer from "@/components/Footer.vue";
import Falcon from "@/components/Falcon.vue";
import PromoOverlay from "~/components/PromoOverlay.vue";

const config = useRuntimeConfig();

const router = useRouter();
const isMenuOpen = ref(false);
const user = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const isBookingModalOpen = ref(false);
const isLoginModalOpen = ref(false);
const hairstyles = [
  {
    imageUrl: "https://storage.googleapis.com/shesalon-hairstyle/Blunt%20Bangs",
    title: "Blunt Bangs",
    description: "Classic and bold straight-across bangs that make a statement",
  },
  {
    imageUrl:
      "https://storage.googleapis.com/shesalon-hairstyle/Curtain%20Bangs",
    title: "Curtain Bangs",
    description: "Soft, face-framing bangs that part in the middle",
  },
  {
    imageUrl:
      "https://storage.googleapis.com/shesalon-hairstyle/Layered%20Shoulder%20Length%20Cut",
    title: "Layered Shoulder Length Cut",
    description: "Medium length cut with dynamic layers for movement",
  },
  {
    imageUrl:
      "https://storage.googleapis.com/shesalon-hairstyle/Layered%20Cuts",
    title: "Layered Cuts",
    description: "Various layered styles for added volume and texture",
  },
  {
    imageUrl: "https://storage.googleapis.com/shesalon-hairstyle/Long%20Bob",
    title: "Long Bob",
    description: "Shoulder-grazing bob with plenty of body and movement",
  },
  {
    imageUrl:
      "https://storage.googleapis.com/shesalon-hairstyle/Long%20side-swept%20bangs",
    title: "Long Side-Swept Bangs",
    description: "Elegant side-swept bangs that softly frame the face",
  },
];

const menuItems = ["Home", "Order", "Blog", "About", "Contact Us"];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const handleMenuClick = (item) => {
  console.log(`Clicked: ${item}`);
  toggleMenu();
};

const openBookingModal = () => {
  if (!user.value) {
    isLoginModalOpen.value = true;
    return;
  }
  isBookingModalOpen.value = true;
};

const closeBookingModal = () => {
  isBookingModalOpen.value = false;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

const fetchUser = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const result = await response.json();
    console.log("Response API:", result);

    user.value = result;
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Fetch user error:", error);
  } finally {
    loading.value = false;
  }
};

const logoutUser = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove("token");
      router.push("/login");
      return;
    }

    const response = await fetch(
      `${config.public.apiBaseUrl}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      console.error(`Logout failed: ${response.status}`);
    }

    Cookies.remove("token");
    Cookies.remove("user");
    user.value = null;
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  }
};

const handleBookingSubmit = (bookingData) => {
  console.log("Booking data submitted:", bookingData);
  closeBookingModal();
};

const scrollToBooking = () => {
  // Scroll to booking section or open booking modal
  const bookingSection = document.getElementById("booking-section");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  } else {
    // If no booking section exists, you might want to open the booking modal
    openBookingModal();
  }
};

definePageMeta({
  middleware: ["auth"], // Apply auth middleware to this page
});

onMounted(() => {
  fetchUser();

  document.documentElement.style.scrollBehavior = "smooth";

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const createObserver = (className, delay = 0) => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, delay * index);
        }
      });
    }, observerOptions);
  };

  const fadeObserver = createObserver("fade-in", 100);
  const slideObserver = createObserver("slide-in", 150);
  const scaleObserver = createObserver("scale-in", 200);

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => fadeObserver.observe(el));
  document
    .querySelectorAll(".slide-in")
    .forEach((el) => slideObserver.observe(el));
  document
    .querySelectorAll(".scale-in")
    .forEach((el) => scaleObserver.observe(el));
});
</script>

<template>
  <div>
    <!-- Add the PromoOverlay component -->
    <PromoOverlay @book-now="scrollToBooking" />

    <div class="scroll-smooth">
      <header class="w-full h-screen mb-20 md:mb-40 relative overflow-hidden">
        <!-- Background with parallax effect -->
        <div class="absolute inset-0 w-full h-full">
          <!-- Main background image with overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10"
          ></div>

          <!-- Dynamic background with multiple layers for depth -->
          <div
            class="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 transition-all duration-700 ease-out"
            style="
              background-image: url('https://storage.googleapis.com/shesalon-assets/base-bg.webp');
            "
          ></div>

          <!-- Animated decorative elements -->
          <div
            class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-pink-500/20 filter blur-3xl animate-pulse-slow z-5"
          ></div>
          <div
            class="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-500/20 filter blur-3xl animate-pulse-slower z-5"
          ></div>

          <!-- Floating particles effect -->
          <div class="absolute inset-0 z-10 opacity-30">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
            <div class="particle particle-5"></div>
          </div>
        </div>

        <!-- Navigation -->
        <nav
          class="absolute top-0 left-0 w-full px-4 md:px-20 py-4 md:py-6 transition-all duration-300 z-50"
        >
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <!-- Logo with animation -->
            <div class="logo scale-in z-30 flex items-center">
              <div
                class="relative overflow-hidden rounded-full p-1 bg-white/10 backdrop-blur-sm"
              >
                <img
                  class="w-10 md:w-14 transform hover:scale-110 transition-transform duration-300 ease-out"
                  src="~/assets/images/shesalon-logo.png"
                  alt="She Salon"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent animate-spin-slow"
                ></div>
              </div>
              <span
                class="ml-3 text-white text-xl md:text-2xl font-bold opacity-0 animate-fadeIn"
                style="animation-delay: 300ms; animation-fill-mode: forwards"
              >
                She<span class="text-pink-400">Salon</span>
              </span>
            </div>

            <!-- Desktop Menu -->
            <div
              class="hidden md:flex text-white font-semibold text-lg space-x-8"
            >
              <p
                v-for="(item, index) in menuItems"
                :key="index"
                class="hover:text-pink-400 cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-2px] relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full opacity-0 animate-fadeIn"
                :style="`animation-delay: ${
                  300 + index * 100
                }ms; animation-fill-mode: forwards;`"
              >
                {{ item }}
              </p>
            </div>

            <!-- Profile Dropdown -->
            <div class="ml-8 opacity-100 z-50">
              <ProfileDropdown :user="user" @logout="logoutUser" />
            </div>

            <!-- Mobile menu toggle button -->
            <button @click="toggleMenu" class="md:hidden z-30 p-2 text-white">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!isMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Mobile menu (when toggled) -->
            <div
              :class="[
                'fixed inset-0 bg-black/95 backdrop-blur-md z-20 transition-all duration-500 md:hidden',
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
              ]"
            >
              <div
                class="flex flex-col items-center justify-center h-full space-y-8 text-white font-semibold text-xl"
              >
                <p
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="handleMenuClick(item)"
                  class="hover:text-pink-400 cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Content -->
        <div class="absolute inset-0 flex items-center z-20">
          <div class="container mx-auto px-4 md:px-20">
            <div class="max-w-3xl">
              <div class="space-y-6">
                <!-- Welcome text with animated underline -->
                <div class="relative inline-block slide-in from-left">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-10 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                    ></div>
                    <p class="text-xl md:text-2xl text-white font-light">
                      Hello
                      <span class="font-medium">{{
                        user?.username || "Guest"
                      }}</span>
                    </p>
                  </div>
                </div>

                <!-- Main heading with gradient text and animated reveal -->
                <h1
                  class="text-4xl md:text-7xl font-extrabold text-white leading-tight slide-in from-left delay-200 relative overflow-hidden"
                >
                  <span class="block">Discover Your</span>
                  <span class="block">
                    <span class="relative">
                      <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600"
                        >Perfect Style</span
                      >
                      <span
                        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-pink-600 animate-width-grow"
                      ></span>
                    </span>
                  </span>
                  <span class="block">with She Salon</span>
                </h1>

                <!-- Description with subtle animation and improved typography -->
                <p
                  class="text-lg md:text-2xl text-white/90 font-light max-w-2xl slide-in from-left delay-400 leading-relaxed"
                >
                  Professional hair, skin, and beauty treatments tailored just
                  for you.
                  <span class="block mt-2 text-pink-300"
                    >Feel confident and radiant every day!</span
                  >
                </p>

                <!-- CTA Buttons with enhanced styling -->
                <div
                  class="flex flex-wrap gap-4 mt-8 slide-in from-left delay-600"
                >
                  <template v-if="!user">
                    <button
                      @click="router.push('/login')"
                      class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-white text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/20"
                    >
                      <span
                        class="absolute w-0 h-full bg-gradient-to-r from-pink-500 to-pink-600 top-0 left-0 transition-all duration-300 group-hover:w-full"
                      ></span>
                      <span
                        class="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Login
                      </span>
                    </button>
                    <button
                      class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-transparent border-2 border-white text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/10"
                    >
                      <span
                        class="absolute w-0 h-full bg-white top-0 left-0 transition-all duration-300 group-hover:w-full"
                      ></span>
                      <span
                        class="relative flex items-center gap-2 group-hover:text-gray-900 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"
                          />
                        </svg>
                        Register
                      </span>
                    </button>
                  </template>

                  <template v-else>
                    <button
                      @click="openBookingModal"
                      class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/30"
                    >
                      <span
                        class="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-pink-700 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                      ></span>
                      <span
                        class="relative flex items-center gap-2 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Book Now
                      </span>
                    </button>
                    <button
                      class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/10"
                    >
                      <span
                        class="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                      ></span>
                      <span
                        class="relative flex items-center gap-2 group-hover:text-gray-900 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Our Services
                      </span>
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator with improved animation -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div class="flex flex-col items-center">
            <span class="text-white text-sm mb-2 opacity-80">Scroll Down</span>
            <div
              class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-1"
            >
              <div
                class="w-1.5 h-1.5 bg-white rounded-full animate-scroll-down"
              ></div>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div
          class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
        ></div>
      </header>

      <Brands />

      <div class="flex justify-center slide-in from-bottom px-4 md:px-0">
        <p class="text-3xl md:text-4xl font-semibold mb-10 relative">
          What is
          <span class="text-pink-600 transition-colors duration-300 relative">
            She Salon?
            <span
              class="absolute -bottom-2 left-0 w-full h-1 bg-pink-200 rounded-full"
            ></span>
          </span>
        </p>
      </div>
      <div
        class="flex justify-center mb-20 md:mb-30 items-center text-center fade-in px-4 md:px-0"
      >
        <p class="text-lg md:text-xl font-regular max-w-4xl text-[#696984]">
          She Salon is a beauty studio that offers professional hair, skin, and
          nail services whereby clients can enjoy expert styling, receive
          personalized treatments, relax in a luxurious space, and indulge in
          premium care all in one place.
        </p>
      </div>

      <Founder />

      <div class="flex justify-center slide-in from-bottom px-4 md:px-0">
        <p class="text-3xl md:text-4xl font-semibold mb-20 md:mb-30 relative">
          Our
          <span class="text-pink-600 relative">
            Services
            <span
              class="absolute -bottom-2 left-0 w-full h-1 bg-pink-200 rounded-full"
            ></span>
          </span>
        </p>
      </div>

      <Services />

      <div
        class="flex items-center justify-center -mt-10 md:-mt-20 mb-40 md:mb-60 px-4 md:px-0"
        id="booking-section"
      >
        <button
          class="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-xl bg-[#f6339a] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          @click="openBookingModal"
        >
          <span
            class="absolute w-0 h-full bg-[#e02d8a] top-0 left-0 transition-all duration-300 group-hover:w-full"
          ></span>
          <span class="relative flex items-center gap-2">
            Book Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>

      <section class="py-32 bg-gray-50 mb-10 relative overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-30"
        ></div>
        <div class="max-w-7xl mx-auto px-4 md:px-20 relative z-10">
          <div class="text-center mb-16 slide-in from-bottom">
            <h2
              class="text-3xl md:text-4xl font-semibold mb-6 relative inline-block"
            >
              Not Sure About Your Style?
              <span
                class="absolute -bottom-2 left-0 w-full h-1 bg-pink-200 rounded-full"
              ></span>
            </h2>
            <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Let our AI analyze your face shape and recommend the perfect
              hairstyle for you!
            </p>
            <FaceScanner />
          </div>

          <div class="relative overflow-hidden py-4 md:py-8">
            <div class="animate-scroll flex gap-4 md:gap-8 whitespace-normal">
              <HairstyleCard
                v-for="style in [...hairstyles, ...hairstyles]"
                :key="style.title"
                :image-url="style.imageUrl"
                :title="style.title"
                :description="style.description"
                class="w-[280px] md:w-[350px] flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </section>

      <LoginModal :is-open="isLoginModalOpen" @close="closeLoginModal" />

      <BookingModal
        :is-open="isBookingModalOpen"
        @close="closeBookingModal"
        @submit="handleBookingSubmit"
      />

      <WhyChoosingUs></WhyChoosingUs>

      <div class="mb-20 md:mb-40">
        <Testimonial />
      </div>
      <Footer></Footer>

      <Falcon />
    </div>
  </div>
</template>

<style>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in.show {
  opacity: 1;
  transform: translateY(0);
}

.slide-in {
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in.from-left {
  transform: translateX(-100px);
}

.slide-in.from-right {
  transform: translateX(100px);
}

.slide-in.from-bottom {
  transform: translateY(50px);
}

.slide-in.show {
  opacity: 1;
  transform: translate(0);
}

.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-in.show {
  opacity: 1;
  transform: scale(1);
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-600 {
  transition-delay: 600ms;
}

html {
  scroll-behavior: smooth;
}

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.parallax-header {
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .parallax-header {
    background-attachment: scroll;
  }
}

/* Modern button hover effect */
.btn-hover-slide {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-slide::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s;
  z-index: -1;
}

.btn-hover-slide:hover::before {
  left: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes widthGrow {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.animate-width-grow {
  animation: widthGrow 0.7s ease-out forwards;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulseSlow 4s infinite;
}

@keyframes pulseSlower {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-slower {
  animation: pulseSlower 6s infinite;
}

/* Scroll down animation */
@keyframes scrollDown {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translateY(8px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.animate-scroll-down {
  animation: scrollDown 2s linear infinite;
}

/* Particle animations */
.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 4s infinite linear;
}

.particle-1 {
  top: 10%;
  left: 20%;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  animation-delay: 0s;
}

.particle-2 {
  top: 30%;
  right: 15%;
  width: 6px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.5);
  animation-delay: 1s;
}

.particle-3 {
  bottom: 20%;
  left: 10%;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  animation-delay: 2s;
}

.particle-4 {
  bottom: 30%;
  right: 20%;
  width: 7px;
  height: 7px;
  background-color: rgba(255, 255, 255, 0.6);
  animation-delay: 3s;
}

.particle-5 {
  top: 40%;
  left: 30%;
  width: 9px;
  height: 9px;
  background-color: rgba(255, 255, 255, 0.7);
  animation-delay: 1.5s;
}

/* Spin animation for logo */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

/* Float animation for particles */
@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(10px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}
</style>
