import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6JTT0yeZA5SmViqEuofdr2mXIyOrklcE",
    authDomain: "capstone-ad93d.firebaseapp.com",
    projectId: "capstone-ad93d",
    storageBucket: "capstone-ad93d.firebasestorage.app",
    messagingSenderId: "758928001372",
    appId: "1:758928001372:web:135aad790a9c39a32c1999"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };