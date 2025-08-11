import { initFirebase } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const { auth, db } = (() => {
  try {
    const ob = initFirebase()
    return { auth: ob.auth, db: ob.db }
  } catch(e) {
    return { auth: null, db: null }
  }
})()

export async function register(email, password, displayName){
  if(!auth) throw new Error('Firebase is not configured')
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCred.user
  if(db){
    await setDoc(doc(db, 'users', user.uid), { displayName: displayName || '', email, role: 'employee' })
  }
  return user
}

export async function login(email, password){
  if(!auth) throw new Error('Firebase is not configured')
  const userCred = await signInWithEmailAndPassword(auth, email, password)
  return userCred.user
}

export async function logout(){
  if(!auth) throw new Error('Firebase is not configured')
  await signOut(auth)
}

export async function fetchUserProfile(uid){
  if(!db) return null
  const d = await getDoc(doc(db, 'users', uid))
  if(!d.exists()) return null
  return d.data()
}
