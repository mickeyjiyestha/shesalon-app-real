import { defineNuxtRouteMiddleware, useCookie, navigateTo } from "#app";

// Middleware for pages that should only be accessible to non-authenticated users (like login and register)
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");
  const userCookie = useCookie("user");

  // If user is already logged in, redirect based on role
  if (token.value) {
    // Check user role from cookie
    let userData;

    try {
      userData = JSON.parse(userCookie.value || "{}");
    } catch (e) {
      userData = {};
    }

    // Redirect based on role
    if (userData.role === "admin") {
      return navigateTo("/admin");
    } else {
      return navigateTo("/");
    }
  }
});
