<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import ProfileDropdown from "@/components/ProfileDropdown.vue";
import FaceScanner from "@/components/FaceScanner.vue";
import LoginModal from "@/components/LoginModal.vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    title: "Layered Shoulder Length",
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
    title: "Long Bob With Volume",
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

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

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

    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.error(`Logout failed: ${response.status}`);
    }

    Cookies.remove("token");
    user.value = null;
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
    Cookies.remove("token");
    router.push("/login");
  }
};

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
  <div class="scroll-smooth">
    <header
      class="w-full h-screen mb-20 md:mb-40 relative bg-cover bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/shesalon-assets/base-bg.webp')] transition-all duration-700 ease-out"
    >
      <nav
        class="absolute top-0 left-0 w-full px-4 md:px-20 py-4 md:py-6 transition-all duration-300"
      >
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <!-- Logo on the left -->
          <div class="logo scale-in z-30">
            <img
              class="w-10 md:w-16 transform hover:scale-110 transition-transform duration-300 ease-out"
              src="~/assets/images/shesalon-logo.png"
              alt="She Salon"
            />
          </div>

          <!-- Menu items (Home, Order, Blog, About, Contact Us) -->
          <div
            class="hidden md:flex text-white font-semibold text-lg space-x-8"
          >
            <p
              v-for="(item, index) in menuItems"
              :key="index"
              class="hover:text-[#F97474] cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-2px]"
            >
              {{ item }}
            </p>
          </div>

          <!-- Profile Dropdown moved here after the menu items -->
          <div class="ml-8">
            <!-- Add some margin if needed to separate from menu -->
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
              'fixed inset-0 bg-black/95 z-20 transition-all duration-300 md:hidden',
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
                class="hover:text-[#F97474] cursor-pointer transition-all duration-300"
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div
        class="absolute top-[45%] md:top-1/3 left-4 md:left-20 text-white -mt-10 px-4 md:px-0"
      >
        <p class="text-xl md:text-3xl slide-in from-left">
          Hello {{ user?.username }}, Welcome To She Salon
        </p>
        <h1
          class="text-4xl md:text-7xl font-extrabold mt-4 leading-tight slide-in from-left delay-200"
        >
          Discover Your Perfect <br class="hidden md:block" />
          Look with She Salon
        </h1>
        <p
          class="text-lg md:text-2xl mt-4 max-w-full md:max-w-4xl font-light mb-6 md:mb-10 slide-in from-left delay-400"
        >
          Professional hair, skin, and beauty treatments tailored just for you.
          <br class="hidden md:block" />
          Feel confident and radiant every day!
        </p>

        <div class="mt-6 flex space-x-4 slide-in from-left delay-600">
          <button
            v-if="!user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
            @click="router.push('/login')"
          >
            Login
          </button>
          <button
            v-if="!user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Register
          </button>

          <button
            v-if="user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Booking
          </button>
          <button
            v-if="user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Our Services
          </button>
        </div>
      </div>
    </header>

    <Brands />

    <div class="flex justify-center slide-in from-bottom px-4 md:px-0">
      <p class="text-3xl md:text-4xl font-semibold mb-10">
        What is
        <span class="text-pink-600 transition-colors duration-300"
          >She Salon?</span
        >
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
      <p class="text-3xl md:text-4xl font-semibold mb-20 md:mb-30">
        Our
        <span class="text-pink-600">Services</span>
      </p>
    </div>

    <Services />

    <div
      class="flex items-center justify-center -mt-10 md:-mt-20 mb-40 md:mb-60 px-4 md:px-0"
    >
      <button
        class="flex justify-center items-center rounded-xl bg-pink-500 hover:bg-pink-600 px-20 md:px-50 py-3 mt-7 text-white transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 transform"
        @click="openBookingModal"
      >
        Book Now
      </button>
    </div>

    <section class="py-32 bg-gray-50 mb-10">
      <div class="max-w-7xl mx-auto px-4 md:px-20">
        <div class="text-center mb-16 slide-in from-bottom">
          <h2 class="text-3xl md:text-4xl font-semibold mb-6">
            Not Sure About Your Style?
          </h2>
          <p class="text-lg text-gray-600 mb-12">
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
</style>
