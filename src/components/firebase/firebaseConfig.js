import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyC6rPWTMAbZ_AvZYWRMqrGeynBqMeZhAEg",

  authDomain: "burgerqueen-3.firebaseapp.com",

  projectId: "burgerqueen-3",

  storageBucket: "burgerqueen-3.appspot.com",

  messagingSenderId: "482328602780",

  appId: "1:482328602780:web:00534814359ba7349e2559"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
