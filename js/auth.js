
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const authForm = document.querySelector(".form form");

export const handleAuth = (app) => {

  const auths = getAuth(app);

  handleLogin(auths);
  handleLogout(auths);

  onAuthStateChanged(auths, (user) => {
    console.log("user", user);
    console.log(location.href);

    if (!user && location.href != 'https://eslam260.github.io/Dashboarb-CS/login.html') {
      location.replace("/login.html");
    }

  })

}

const handleLogin = (auths) => {

  const loginBtn = document.querySelector(".button");

  if (loginBtn) {
    loginBtn.addEventListener("click", async (e) => {

      e.preventDefault();
  
      const valueEmail = authForm.email.value;
      const valuePassword = authForm.password.value;
      
      try {
        const credintials = await signInWithEmailAndPassword(auths, valueEmail, valuePassword);
        console.log(credintials);
        authForm.reset();
        location.replace("/index.html");
      } catch (error) {
        let wrongDiv = document.querySelector(".wrong");
        wrongDiv.classList.add("show");
        console.log(error);
      }
  
    })
  }
}

const handleLogout = (auths) => {
  const logOut = document.querySelector(".logout");

  if (logOut) {
    logOut.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        await signOut(auths);
        location.replace("/login.html");
      } catch (error) {
        console.log(error);
      }

    })

  }

}
