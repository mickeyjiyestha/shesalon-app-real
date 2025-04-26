<template>
  <div class="faq-container">
    <h1 class="faq-title">Frequently Asked Questions</h1>
    <p class="faq-subtitle">
      Temukan jawaban untuk pertanyaan umum tentang layanan salon kami
    </p>

    <div class="faq-list">
      <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
        <div
          class="faq-question"
          @click="toggleAnswer(index)"
          :class="{ active: openIndex === index }"
        >
          <h3>{{ item.question }}</h3>
          <div class="faq-icon">
            <span v-if="openIndex === index">−</span>
            <span v-else>+</span>
          </div>
        </div>
        <div class="faq-answer" :class="{ open: openIndex === index }">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqPage",
  data() {
    return {
      openIndex: null,
      faqItems: [
        {
          question: "Bagaimana cara memesan layanan salon?",
          answer:
            "Anda dapat memesan layanan melalui website kami, menghubungi kami melalui telepon, atau datang langsung ke salon. Kami menyarankan untuk melakukan reservasi 1-2 hari sebelumnya untuk memastikan ketersediaan jadwal yang Anda inginkan.",
        },
        {
          question:
            "Berapa lama waktu yang dibutuhkan untuk layanan perawatan rambut?",
          answer:
            "Waktu perawatan bervariasi tergantung jenis layanan. Potong rambut memerlukan waktu sekitar 30-45 menit, pewarnaan rambut 2-3 jam, dan smoothing/rebonding 3-5 jam. Kami akan memberikan estimasi waktu yang lebih akurat saat Anda melakukan reservasi.",
        },
        {
          question: "Apakah saya perlu membawa sesuatu saat datang ke salon?",
          answer:
            "Tidak perlu membawa apapun secara khusus. Kami menyediakan semua peralatan dan produk yang diperlukan untuk perawatan Anda. Namun, jika Anda memiliki preferensi produk tertentu, Anda dapat membawanya dan memberi tahu stylist kami.",
        },
        {
          question: "Apakah salon menerima pelanggan tanpa reservasi?",
          answer:
            "Ya, kami menerima pelanggan walk-in, namun prioritas akan diberikan kepada pelanggan yang sudah melakukan reservasi. Untuk menghindari waktu tunggu, kami sangat menyarankan untuk membuat janji terlebih dahulu.",
        },
        {
          question: "Bagaimana kebijakan pembatalan reservasi?",
          answer:
            "Pembatalan dapat dilakukan minimal 24 jam sebelum jadwal yang telah ditentukan tanpa biaya penalti. Pembatalan kurang dari 24 jam mungkin dikenakan biaya sebesar 50% dari layanan yang dipesan.",
        },
        {
          question: "Apakah salon menyediakan layanan untuk acara khusus?",
          answer:
            "Ya, kami menyediakan layanan khusus untuk pernikahan, pesta, dan acara penting lainnya. Kami juga dapat menyediakan paket khusus untuk grup. Silakan hubungi kami untuk informasi lebih lanjut tentang layanan dan harga untuk acara khusus.",
        },
      ],
    };
  },
  methods: {
    toggleAnswer(index) {
      if (this.openIndex === index) {
        this.openIndex = null;
      } else {
        this.openIndex = index;
      }
    },
  },
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Roboto", Arial, sans-serif;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.faq-subtitle {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
}

.faq-list {
  margin-top: 30px;
}

.faq-item {
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question.active {
  background-color: #f6339a;
}

.faq-question.active h3 {
  color: white;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  transition: color 0.3s ease;
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
  color: #f6339a;
  transition: color 0.3s ease;
}

.faq-question.active .faq-icon {
  color: white;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background-color: #fff;
}

.faq-answer.open {
  max-height: 500px;
  padding: 16px 24px;
  border-top: 1px solid rgba(246, 51, 154, 0.2);
}

.faq-answer p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

@media (max-width: 768px) {
  .faq-container {
    padding: 30px 15px;
  }

  .faq-title {
    font-size: 2rem;
  }

  .faq-question {
    padding: 16px 20px;
  }

  .faq-question h3 {
    font-size: 1rem;
  }

  .faq-answer.open {
    padding: 14px 20px;
  }
}
</style>
