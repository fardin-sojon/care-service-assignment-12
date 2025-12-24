
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



console.log("Firebase Config Check:", {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Present" : "Missing",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Present" : "Missing"
});

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
