<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-content">
        <div class="error-animations">
          <div class="scissors-container">
            <div class="scissors">
              <div class="scissors-half scissors-top">
                <div class="scissors-blade"></div>
                <div class="scissors-handle"></div>
              </div>
              <div class="scissors-half scissors-bottom">
                <div class="scissors-blade"></div>
                <div class="scissors-handle"></div>
              </div>
            </div>
          </div>
          <div class="hair-strand hair-strand-1"></div>
          <div class="hair-strand hair-strand-2"></div>
          <div class="hair-strand hair-strand-3"></div>
        </div>

        <h1 class="error-title">
          <span class="error-code">404</span>
          <span class="error-message">Page Not Found</span>
        </h1>

        <p class="error-description">
          Oops! Looks like this page took a bad haircut and disappeared.
        </p>

        <div class="error-actions">
          <NuxtLink to="/" class="error-button primary">
            <span>Back to Home</span>
          </NuxtLink>
          <NuxtLink to="/services" class="error-button secondary">
            <span>Our Services</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";

defineProps({
  error: Object,
});

// Handle head metadata
useHead({
  title: "Page Not Found - She Salon",
  meta: [
    {
      name: "description",
      content: "The page you are looking for could not be found.",
    },
  ],
});
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8f8 0%, #fff 100%);
  padding: 2rem;
  font-family: "Poppins", sans-serif;
}

.error-container {
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.error-content {
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(255, 105, 180, 0.1);
  position: relative;
  overflow: hidden;
}

.error-content::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(255, 105, 180, 0.2) 0%,
    rgba(255, 182, 193, 0.1) 100%
  );
  border-radius: 50%;
  z-index: -1;
}

.error-content::after {
  content: "";
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 150px;
  height: 150px;
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.2) 0%,
    rgba(255, 105, 180, 0.1) 100%
  );
  border-radius: 50%;
  z-index: -1;
}

.error-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.error-code {
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* Fallback for browsers that don't support -webkit-text-fill-color */
  margin-bottom: 0.5rem;
  text-shadow: 3px 3px 6px rgba(255, 105, 180, 0.2);
  animation: pulse 2s infinite;
}

.error-message {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.5rem;
}

.error-description {
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.error-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.error-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
  z-index: -1;
  transition: all 0.3s ease;
}

.error-button:hover::before {
  transform: translateY(-100%);
}

.error-button.primary {
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.error-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
}

.error-button.secondary {
  background: white;
  color: #ff69b4;
  border: 2px solid #ff69b4;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.1);
}

.error-button.secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.2);
  background: rgba(255, 105, 180, 0.05);
}

/* Animations */
.error-animations {
  position: relative;
  height: 150px;
  margin-bottom: 2rem;
}

.scissors-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 3s ease-in-out infinite;
}

.scissors {
  width: 100px;
  height: 100px;
  position: relative;
  transform: rotate(45deg);
}

.scissors-half {
  position: absolute;
  width: 100%;
  height: 50%;
  transform-origin: 100% 50%;
}

.scissors-top {
  top: 0;
  animation: cut-top 2.5s ease-in-out infinite;
}

.scissors-bottom {
  bottom: 0;
  animation: cut-bottom 2.5s ease-in-out infinite;
}

.scissors-blade {
  position: absolute;
  width: 60%;
  height: 10px;
  background: linear-gradient(90deg, #ff69b4, #ff1493);
  border-radius: 5px 0 0 5px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.scissors-handle {
  position: absolute;
  width: 40%;
  height: 20px;
  background: #333;
  border-radius: 0 10px 10px 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.hair-strand {
  position: absolute;
  height: 2px;
  background: #333;
  top: 50%;
  border-radius: 50%;
}

.hair-strand-1 {
  width: 80px;
  left: calc(50% - 120px);
  animation: fall 3s ease-in-out infinite;
}

.hair-strand-2 {
  width: 60px;
  left: calc(50% + 60px);
  animation: fall 2.5s ease-in-out 0.5s infinite;
}

.hair-strand-3 {
  width: 70px;
  left: calc(50% - 30px);
  top: calc(50% + 40px);
  animation: fall 3.5s ease-in-out 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes float {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes cut-top {
  0%,
  100% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
}

@keyframes cut-bottom {
  0%,
  100% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px) rotate(10deg);
    opacity: 0;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-message {
    font-size: 2rem;
  }

  .error-content {
    padding: 2rem;
  }

  .error-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .error-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }

  .error-message {
    font-size: 1.5rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-animations {
    height: 120px;
  }

  .scissors {
    width: 80px;
    height: 80px;
  }
}
</style>
