import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBJKEQTMQAY4Np83CSHuPAzds4S8vQ0LaM",
    authDomain: "arbitrage-604fb.firebaseapp.com",
    projectId: "arbitrage-604fb",
    storageBucket: "arbitrage-604fb.appspot.com",
    messagingSenderId: "420358805743",
    appId: "1:420358805743:web:d1545219d6817947a6a31a",
    measurementId: "G-30DR94EXD9"
}

const app = initializeApp(firebaseConfig)
const firebaseDB = getFirestore(app)

export default firebaseDB