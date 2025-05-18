import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPoaCwvVnCN82FB6avJnARDxtfL-kGT44`,
          async: true,
          defer: true,
        },
      ],
    },
  },
  nitro: {
    firebase: {
      gen: 2,
    },
  },
  compatibilityDate: "2025-04-21",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    },
  },
});
