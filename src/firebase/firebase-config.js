import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {

  apiKey: "AIzaSyBcuoinmve6kA5am_AmUTfyVgNnPaJP-EE",

  authDomain: "classroomproject-a7030.firebaseapp.com",

  projectId: "classroomproject-a7030",

  storageBucket: "classroomproject-a7030.appspot.com",

  messagingSenderId: "1047970362968",

  appId: "1:1047970362968:web:5f2a3e78d35ea4940bfc2d"

};

const app = initializeApp(firebaseConfig)
export default app
export const db = getFirestore(app)