import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnuXcWb3iJbYyXD9FjJ_wxdsVd6WWrmaA",
  authDomain: "wedding-invite-97fb7.firebaseapp.com",
  projectId: "wedding-invite-97fb7",
  storageBucket: "wedding-invite-97fb7.appspot.com",
  messagingSenderId: "1052998637154",
  appId: "1:1052998637154:web:5cdb5cb956e7ba716ba33b"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
