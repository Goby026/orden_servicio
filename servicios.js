// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxO60LITaGotqi4cudAz45lXEC9Cm1abs",
  authDomain: "reportes-web-app.firebaseapp.com",
  projectId: "reportes-web-app",
  storageBucket: "reportes-web-app.appspot.com",
  messagingSenderId: "81794543774",
  appId: "1:81794543774:web:32566b9b3e141e4cac0b8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/*=============================================
= OBTENER SERVICIOS
===============================================*/
const getAllServices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "services"));
    querySnapshot.forEach((doc) => {
      console.log(`id: ${doc.id} => fecha: ${doc.data().fecha}`);
      const tbody = document.querySelector("#tbody");
      tbody.innerHTML += `
      <tr>
        <th scope="row">${doc.data().fecha}</th>
        <td>${doc.data().cliente}</td>
        <td>${doc.data().problema}</td>
        <td>${doc.data().trabajorealizado}</td>
      </tr>
      `;
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

getAllServices();
