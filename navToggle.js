let burger = document.querySelector("#burger");
let menu = document.querySelector("#menu");
let burgerICon = burger.children[0];
let menuStatus = false;

burger.addEventListener("click", navToggle);
document.querySelector("main").addEventListener("click", () => {
  if (menuStatus) return navToggle();
});
function navToggle() {
  //   document.body.classList.toggle("cover");
  menu.classList.toggle("menu-close");
  burgerICon.classList.toggle("fa-xmark");
  burgerICon.classList.toggle("fa-bars-staggered");
  setTimeout(() => {
    menuStatus = !menuStatus;
  }, 500);
}
function setUserProfile(name, email) {
  let userProfile = menu.children[0];
  userProfile.innerHTML = `${name}
        <br>
        <small class="text-muted">${email}</small>
  `;
}
function signOut() {
  document.cookie = "token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location = "";
  loggedIn = false;
}

function bookmakrs() {
  document.getElementById("BOOKMARKS").click();
  navToggle();
}
