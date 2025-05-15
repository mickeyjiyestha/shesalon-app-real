<template>
  <transition name="fade">
    <div v-if="isVisible" class="promo-overlay">
      <div class="promo-content">
        <button
          @click="closePromo"
          class="close-button"
          aria-label="Close promotion"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="promo-header">
          <div class="salon-logo">
            <span>SHE</span>
            <span class="logo-accent">SALON</span>
          </div>
          <div class="promo-badge">LIMITED TIME OFFER</div>
        </div>

        <h2 class="promo-title">GRAND OPENING SPECIAL</h2>

        <div class="promo-details">
          <div class="discount">
            <span class="percentage">30%</span>
            <span class="off">OFF</span>
          </div>
          <div class="services">
            <p>ALL PREMIUM TREATMENTS</p>
            <ul>
              <li>Hair Coloring & Styling</li>
              <li>Keratin Treatments</li>
              <li>Premium Facials</li>
              <li>Nail Art Services</li>
            </ul>
          </div>
        </div>

        <div class="valid-until">
          <div class="calendar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <span>Valid until May 31, 2025</span>
        </div>

        <div class="promo-code-container">
          <p>Use Promo Code:</p>
          <div class="promo-code">WELCOME30</div>
        </div>

        <button @click="bookNow" class="book-now-button">
          BOOK YOUR APPOINTMENT NOW
        </button>

        <p class="terms">
          *Terms and conditions apply. Cannot be combined with other offers.
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PromoOverlay",
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    // Check if the user has already seen the promo
    const hasSeenPromo = localStorage.getItem("hasSeenPromo");
    if (hasSeenPromo) {
      this.isVisible = false;
    }
  },
  methods: {
    closePromo() {
      this.isVisible = false;
      // Set a flag in localStorage so the promo doesn't show again in this session
      localStorage.setItem("hasSeenPromo", "true");
    },
    bookNow() {
      // Close the promo
      this.closePromo();
      // Scroll to booking section or open booking modal
      this.$emit("book-now");
    },
  },
};
</script>

<style scoped>
.promo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.promo-content {
  position: relative;
  width: 100%;
  max-width: 550px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f3f7 100%);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 25px 50px -12px rgba(246, 51, 154, 0.25);
  text-align: center;
  overflow: hidden;
}

.promo-content::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(246, 51, 154, 0.1) 0%,
    rgba(246, 51, 154, 0.05) 100%
  );
  border-radius: 50%;
  z-index: -1;
}

.promo-content::after {
  content: "";
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(246, 51, 154, 0.1) 0%,
    rgba(246, 51, 154, 0.05) 100%
  );
  border-radius: 50%;
  z-index: -1;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  color: #f6339a;
  transform: rotate(90deg);
}

.promo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.salon-logo {
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #333;
}

.logo-accent {
  color: #f6339a;
  margin-left: 4px;
}

.promo-badge {
  background: linear-gradient(135deg, #f6339a 0%, #e02d8a 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}

.promo-title {
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 30px;
  color: #333;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.promo-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #f6339a 0%, #e02d8a 100%);
  border-radius: 3px;
}

.promo-details {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  gap: 30px;
}

.discount {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.percentage {
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #f6339a 0%, #e02d8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 4px 8px rgba(246, 51, 154, 0.2);
}

.off {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-top: 5px;
}

.services {
  text-align: left;
}

.services p {
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  font-size: 16px;
}

.services ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.services li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.services li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #f6339a;
  font-weight: bold;
}

.valid-until {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  color: #666;
  font-size: 14px;
}

.calendar-icon {
  margin-right: 8px;
  color: #f6339a;
}

.promo-code-container {
  margin-bottom: 25px;
}

.promo-code-container p {
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.promo-code {
  display: inline-block;
  background: linear-gradient(135deg, #f6339a 0%, #e02d8a 100%);
  color: white;
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 2px;
  box-shadow: 0 4px 15px -3px rgba(246, 51, 154, 0.4);
}

.book-now-button {
  background: linear-gradient(135deg, #f6339a 0%, #e02d8a 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -3px rgba(246, 51, 154, 0.4);
  letter-spacing: 1px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 350px;
}

.book-now-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px -3px rgba(246, 51, 154, 0.5);
}

.terms {
  font-size: 12px;
  color: #999;
  margin: 0;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .promo-content {
    padding: 30px 20px;
  }

  .promo-title {
    font-size: 28px;
  }

  .promo-details {
    flex-direction: column;
    gap: 20px;
  }

  .percentage {
    font-size: 60px;
  }

  .services {
    text-align: center;
  }

  .services li {
    padding-left: 0;
    text-align: center;
  }

  .services li::before {
    content: none;
  }
}

@media (max-width: 480px) {
  .promo-content {
    padding: 25px 15px;
  }

  .promo-title {
    font-size: 24px;
  }

  .percentage {
    font-size: 50px;
  }

  .book-now-button {
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style>
