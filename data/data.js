import 'dotenv/config';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "talento-tech-ea6fe",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "670821178740",
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);