// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOKE8NLNlDnAj2lDtP0kEJyw26h7yV8RA',
  authDomain: 'rolebot-45f4c.firebaseapp.com',
  databaseURL: 'https://rolebot-45f4c-default-rtdb.firebaseio.com',
  projectId: 'rolebot-45f4c',
  storageBucket: 'rolebot-45f4c.appspot.com',
  messagingSenderId: '140023691856',
  appId: '1:140023691856:web:bcaf8078fbe86b475cef55'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Firebase Getters and Setters
export async function setNewAddress(address, { discordID, signature }) {
  // TODO: Set DISCORD IDs here
  await setDoc(doc(db, 'addresses', address), {
    discordID,
    signature
  })
}

export async function getAddresses() {
  const addressesCol = collection(db, 'addresses')
  const addressSnapshot = await getDocs(addressesCol)
  const addressList = addressSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return addressList
}
