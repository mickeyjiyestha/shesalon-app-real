<template>
  <footer class="bg-gray-50 py-16 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-50"
    ></div>
    <div class="container mx-auto px-4 md:px-8 relative z-10">
      <div class="w-full mb-12 fade-in">
        <h3 class="text-[#f6339a] font-semibold text-center mb-6 text-xl">
          Visit Us
        </h3>
        <div
          class="block w-full h-[300px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <GoogleMap />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div class="fade-in">
          <h2
            class="text-xl font-bold mb-2 bg-gradient-to-r from-[#f6339a] to-[#ff5757] bg-clip-text text-transparent"
          >
            She Salon
          </h2>
          <p class="text-gray-600 mt-2">
            Beauty, expertise, quality service, relaxation, confidence, style,
            care, elegance, perfection, trust.
          </p>
          <p class="text-gray-500 text-sm mt-4">Copyright © 2025</p>
          <div class="mt-4 text-gray-600">
            <a
              href="https://maps.app.goo.gl/2g4WapZUU1irp3dR8"
              target="_blank"
              rel="noopener noreferrer"
              class="block group hover:text-[#f6339a] transition-colors duration-300"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 group-hover:text-[#f6339a] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Our Location:</span>
              </div>
              <p
                class="text-sm mt-2 pl-7 group-hover:text-[#f6339a] transition-colors duration-300"
              >
                Jl. Pratama No.95B, Benoa, Kec. Kuta Sel., Kabupaten Badung,
                Bali
              </p>
            </a>
          </div>
        </div>

        <div class="fade-in delay-200">
          <h3 class="text-[#f6339a] font-semibold mb-4">Services</h3>
          <ul class="mt-2 space-y-3 text-gray-700">
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Smoothing
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Massage
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Pedicure
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Haircut
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Hair Coloring
            </li>
          </ul>
        </div>

        <div class="fade-in delay-400">
          <h3 class="text-[#f6339a] font-semibold mb-4">Quick Links</h3>
          <ul class="mt-2 space-y-3 text-gray-700">
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Home
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              About Us
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Services
            </li>
            <li
              class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer flex items-center"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-pink-300 mr-2"></span>
              Booking
            </li>
          </ul>
        </div>

        <div class="fade-in delay-600">
          <h3 class="text-[#f6339a] font-semibold mb-4">Follow Us</h3>
          <ul class="mt-2 space-y-3 text-gray-700">
            <li
              class="flex items-center space-x-2 hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
            >
              <i class="fab fa-facebook"></i>
              <span>Facebook</span>
            </li>
            <li
              class="flex items-center space-x-2 hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
            >
              <i class="fab fa-twitter"></i>
              <span>Twitter</span>
            </li>
            <li
              class="flex items-center space-x-2 hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
            >
              <i class="fab fa-instagram"></i>
              <span>Instagram</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center text-gray-500 text-sm">
      <span
        class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-y-[-2px] cursor-pointer"
      >
        Terms & Conditions
      </span>
      |
      <span
        class="hover:text-[#f6339a] transition-all duration-300 ease-out hover:translate-y-[-2px] cursor-pointer"
      >
        Privacy Policy
      </span>
    </div>
  </footer>
</template>
