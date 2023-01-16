// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy-RjDM8fLO8q42hDKlPYMXla3OmJXsYU",
  authDomain: "geolocalisation-6294c.firebaseapp.com",
  projectId: "geolocalisation-6294c",
  storageBucket: "geolocalisation-6294c.appspot.com",
  messagingSenderId: "126277821852",
  appId: "1:126277821852:web:627905c32fa30ded579459"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app;
}

const auth = firebase.auth();

export {auth};