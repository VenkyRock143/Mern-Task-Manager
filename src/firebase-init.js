// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxrz0iH8qtwP3iwLP0lmdRmWEYaFZMKno",
  authDomain: "blogs-ef0e2.firebaseapp.com",
  projectId: "blogs-ef0e2",
  storageBucket: "blogs-ef0e2.appspot.com",
  messagingSenderId: "425017987434",
  appId: "1:425017987434:web:9a8650db67e72269969513"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
//Export the reference to be used in other files
export const db = getFirestore(app);

/**const firebaseConfig = {
  apiKey: "*********************************",
  authDomain: "*******************************",
  projectId: "***********************",
  storageBucket: "******************************",
  messagingSenderId: "******************",
  appId: "************************"
}; */