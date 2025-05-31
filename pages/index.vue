<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

const router = useRouter();
const isMenuOpen = ref(false);
const user = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const isBookingModalOpen = ref(false);
const isLoginModalOpen = ref(false);
const isScrolled = ref(false);

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

const menuItems = [
  { name: "About", id: "about-section" },
  { name: "Services", id: "services-section" },
  { name: "AI Stylist", id: "ai-section" },
  { name: "Why Us", id: "why-section" },
  { name: "Reviews", id: "testimonials-section" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const handleMenuClick = (item) => {
  scrollToSection(item.id);
  toggleMenu();
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
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
  scrollToSection("booking-section");
};

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchUser();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Sticky Navigation -->
    <nav
      :class="[
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100'
          : 'bg-transparent',
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span
              :class="[
                'text-xl font-bold transition-colors duration-300',
                isScrolled ? 'text-gray-900' : 'text-white',
              ]"
            >
              She<span class="text-pink-500">Salon</span>
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center space-x-8">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="scrollToSection(item.id)"
              :class="[
                'text-sm font-medium transition-all duration-300 hover:text-pink-500 relative group',
                isScrolled ? 'text-gray-700' : 'text-white/90',
              ]"
            >
              {{ item.name }}
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
          </div>

          <!-- Right Side -->
          <div class="flex items-center space-x-4">
            <ProfileDropdown :user="user" @logout="logoutUser" />

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMenu"
              :class="[
                'lg:hidden p-2 rounded-lg transition-colors duration-300',
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10',
              ]"
            >
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
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        :class="[
          'lg:hidden fixed inset-0 bg-white z-40 transition-all duration-300',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        ]"
      >
        <div class="flex flex-col items-center justify-center h-full space-y-8">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="handleMenuClick(item)"
            class="text-xl font-medium text-gray-700 hover:text-pink-500 transition-colors duration-300"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Background -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        ></div>
        <div
          class="absolute inset-0 bg-cover bg-center opacity-20"
          style="
            background-image: url('https://storage.googleapis.com/shesalon-assets/base-bg.webp');
          "
        ></div>
      </div>

      <!-- Content -->
      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div class="max-w-4xl mx-auto">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium mb-8"
          >
            <span
              class="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"
            ></span>
            Welcome to She Salon
          </div>

          <!-- Main Heading -->
          <h1
            class="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Beauty Journey
            <span
              class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400"
            >
              Starts Here
            </span>
          </h1>

          <!-- Description -->
          <p
            class="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Experience professional hair, skin, and beauty treatments with our
            expert stylists in a luxurious, modern environment.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <template v-if="!user">
              <button
                @click="router.push('/login')"
                class="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
              >
                Get Started
                <svg
                  class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button
                @click="scrollToSection('services-section')"
                class="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Explore Services
              </button>
            </template>
            <template v-else>
              <button
                @click="openBookingModal"
                class="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
              >
                Book Appointment
                <svg
                  class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                @click="scrollToSection('ai-section')"
                class="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Try AI Stylist
              </button>
            </template>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <button
            @click="scrollToSection('about-section')"
            class="text-white/60 hover:text-white transition-colors duration-300"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about-section" class="py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            What is <span class="text-pink-500">She Salon?</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            She Salon is a premium beauty studio offering professional hair,
            skin, and nail services. Experience expert styling, personalized
            treatments, and luxurious care all in one place.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            class="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              Expert Stylists
            </h3>
            <p class="text-gray-600">
              Professional stylists with years of experience in the latest
              trends and techniques.
            </p>
          </div>

          <div
            class="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              AI Technology
            </h3>
            <p class="text-gray-600">
              Advanced AI hair analysis to recommend the perfect hairstyle for
              your face shape.
            </p>
          </div>

          <div
            class="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              Premium Care
            </h3>
            <p class="text-gray-600">
              Luxurious treatments using high-quality products in a relaxing
              environment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services-section" class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span class="text-pink-500">Services</span>
          </h2>
        </div>
        <Services />

        <!-- CTA -->
        <div class="text-center mt-16" id="booking-section">
          <button
            @click="openBookingModal"
            class="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
          >
            Book Now
            <svg
              class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- AI Section -->
    <section id="ai-section" class="py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our AI Hair <span class="text-pink-500">Stylist</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Let our AI analyze your face shape and recommend the perfect
            hairstyle for you!
          </p>
          <FaceScanner />
        </div>

        <!-- Hairstyles Showcase -->
        <div class="relative overflow-hidden">
          <div class="flex gap-6 animate-scroll">
            <HairstyleCard
              v-for="style in [...hairstyles, ...hairstyles]"
              :key="style.title"
              :image-url="style.imageUrl"
              :title="style.title"
              :description="style.description"
              class="w-80 flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section id="why-section" class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyChoosingUs />
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials-section" class="py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonial />
      </div>
    </section>

    <!-- Footer -->
    <Footer />

    <!-- Modals -->
    <LoginModal :is-open="isLoginModalOpen" @close="closeLoginModal" />
    <BookingModal
      :is-open="isBookingModalOpen"
      @close="closeBookingModal"
      @submit="handleBookingSubmit"
    />

    <Falcon />
  </div>
</template>

<style scoped>
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

html {
  scroll-behavior: smooth;
}
</style>
