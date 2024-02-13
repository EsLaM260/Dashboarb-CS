// $(function(){
//     $('.bars li .bar').each(function(key, bar){
//       var percentage = $(this).data('percentage');
//       $(this).animate({
//         'height' : percentage + '%'
//       },1000);
//     });
//   });


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLeMdNEUFU3p9q176izSZpu90ULr-aAy4",
  authDomain: "let-s-go-app-66a0c.firebaseapp.com",
  databaseURL: "https://let-s-go-app-66a0c-default-rtdb.firebaseio.com",
  projectId: "let-s-go-app-66a0c",
  storageBucket: "let-s-go-app-66a0c.appspot.com",
  messagingSenderId: "338516041659",
  appId: "1:338516041659:web:089aa004cb75b6e141ee9e",
  measurementId: "G-D8VNFPPB34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



