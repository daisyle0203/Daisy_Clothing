import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDT-lFm0XOlcfV7onl-scwmVB1POps_Zeo",
  authDomain: "daisy-clothing-db.firebaseapp.com",
  projectId: "daisy-clothing-db",
  storageBucket: "daisy-clothing-db.appspot.com",
  messagingSenderId: "232220940056",
  appId: "1:232220940056:web:ca4b49a06687f14523306d",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (user) => {
    const userDocRef = doc(db, "users", user.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
}

