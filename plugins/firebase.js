import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCZ99olMqj_1h9HpGMhiN5KCYLXnUFTrc",
  authDomain: "shesalon-app.firebaseapp.com",
  projectId: "shesalon-app",
  storageBucket: "shesalon-app.firebasestorage.app",
  messagingSenderId: "401887634547",
  appId: "1:401887634547:web:c8d6066e9723396539b606",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firestore: db,
    },
  };
});
