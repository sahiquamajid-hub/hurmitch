import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPhIefV3lTCNS4-EGKGrYzOL1-AKwS7Lc",
    authDomain: "hurmitch-26c18.firebaseapp.com",
    projectId: "hurmitch-26c18",
    storageBucket: "hurmitch-26c18.firebasestorage.app",
    messagingSenderId: "395848541772",
    appId: "1:395848541772:web:d874a6f5caf9ca68ccb6e9"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)