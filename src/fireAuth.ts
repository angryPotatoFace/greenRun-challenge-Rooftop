require('dotenv').config();
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import * as admin from 'firebase-admin';


const firebaseConfig = JSON.parse( process.env.FIREBASE_CONFIG! );

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth:Auth  = getAuth(app);
export const administrator =  admin.initializeApp(firebaseConfig) 