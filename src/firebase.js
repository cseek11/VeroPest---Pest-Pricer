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

const firebaseConfig = {
  apiKey: "AIzaSyCD4KKAMB8VCLoxD5JKGP2Dy7dO9lxlTc4",
  authDomain: "pest-pricer.firebaseapp.com",
  projectId: "pest-pricer",
  storageBucket: "pest-pricer.firebasestorage.app",
  messagingSenderId: "814646384186",
  appId: "1:814646384186:web:6e1199d451c0f9255b4703",
  measurementId: "G-V5BKEBFPJ6"
};

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
