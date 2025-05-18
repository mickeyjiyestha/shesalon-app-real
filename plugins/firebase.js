import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSwu2eAehp7Lz70JgaYWrY3MD-IFRv3tw",
  authDomain: "shesalon-app.firebaseapp.com",
  projectId: "shesalon-app",
  storageBucket: "shesalon-app.firebasestorage.app",
  messagingSenderId: "401887634547",
  appId: "1:401887634547:web:b75107af0019e1c339b606",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Tambahkan ini
const db = getFirestore(app);

// ✅ Kalau kamu pakai Nuxt plugin:
export default defineNuxtPlugin(() => {
  return {
    provide: {
      firestore: db, // ini nanti bisa dipakai sebagai $firestore
    },
  };
});
