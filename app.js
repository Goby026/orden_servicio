// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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
= OBTENER LOS CAMPOS DEL FORMULARIO
===============================================*/
const setFormValues = () => {
  return {
    fecha: document.getElementById("fecha").value,
    cliente: document.getElementById("cliente").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    modelo: document.getElementById("modelo").value,
    serie: document.getElementById("serie").value,
    problema: document.getElementById("problema").value,
    contador: document.getElementById("contador").value,
    responsable: document.getElementById("responsable").value,
    trabajorealizado: document.getElementById("trabajorealizado").value,
    horainicio: document.getElementById("horainicio").value,
    horafin: document.getElementById("horafin").value,
  };
};

/*=============================================
= VALIDAR CAMPOS DEL FORMULARIO
===============================================*/
const validarForm = (service) => {
  if (service.fecha === "") {
    alert("Ingrese fecha de atención");
    return false;
  }

  return true;
};

/*=============================================
= REGISTRAR NUEVO SERVICIO
===============================================*/
const saveServices = async (service) => {
  try {
    const docRef = await addDoc(collection(db, "services"), service);
    console.log(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/*=============================================
= OBTENER SERVICIOS
===============================================*/
const getAllServices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "services"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/*=============================================
= INPUTS
===============================================*/
const registrar = document.querySelector("#btnRegistrar");
const formulario = document.querySelector("#orden-form");

registrar.addEventListener("click", () => {
  const result = confirm("¿Registrar servicio?");
  if (result === true) {
    let service = setFormValues();

    if (validarForm(service)) {
      saveServices(service);
      formulario.reset();
    }
  } else {
    console.log("NO REGISTRAR");
  }
});

// saveUser();
