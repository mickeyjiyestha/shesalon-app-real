import {
  defineNuxtRouteMiddleware,
  useCookie,
  useRuntimeConfig,
  navigateTo,
} from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");
  const config = useRuntimeConfig();

  // Check if the route is an admin route
  const isAdminRoute = to.path.startsWith("/admin");

  // If no token exists, redirect to login page if trying to access protected routes
  if (!token.value) {
    if (isAdminRoute || to.path.startsWith("/profile")) {
      return navigateTo("/login");
    }
    return; // Allow access to public routes
  }

  // If token exists, verify user role
  try {
    // Fetch user profile to check role
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      // If token is invalid, clear it and redirect to login
      token.value = null;
      return navigateTo("/login");
    }

    const userData = await response.json();
    const isAdmin = userData.role === "admin";

    // Redirect based on role and requested route
    if (isAdminRoute && !isAdmin) {
      // Non-admin users trying to access admin routes
      return navigateTo("/");
    } else if (
      !isAdminRoute &&
      isAdmin &&
      to.path !== "/login" &&
      to.path !== "/register"
    ) {
      // Admin users trying to access client routes (except login/register)
      return navigateTo("/admin");
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    // On error, clear token and redirect to login
    token.value = null;
    return navigateTo("/login");
  }
});
