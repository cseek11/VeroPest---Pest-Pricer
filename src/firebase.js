/*
  Firebase initialization placeholder.
  Replace the firebaseConfig object with your project's values.

  Steps:
  1. Go to https://console.firebase.google.com/, create project.
  2. Enable Authentication -> Email/Password.
  3. Create Firestore database.
  4. Add Web App and copy firebaseConfig, then paste below.
*/

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP_hJoJZ675QiMZltgjxkHrtLzw9Lldv4",
  authDomain: "veropest---pest-pricer.firebaseapp.com",
  projectId: "veropest---pest-pricer",
  storageBucket: "veropest---pest-pricer.firebasestorage.app",
  messagingSenderId: "635747849334",
  appId: "1:635747849334:web:95041a0e62847333cf3b57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let app = null
let auth = null
let db = null

export function initFirebase() {
  if (app) return { app, auth, db }
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    enableIndexedDbPersistence(db).catch((err)=>{
      // console.warn('Persistence not enabled', err)
    })
  } catch(e) {
    console.warn('Firebase init error (placeholder):', e)
  }
  return { app, auth, db }
}

export function getFirebaseConfigPlaceholder(){
  return firebaseConfig
}
