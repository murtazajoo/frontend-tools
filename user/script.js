let mode = "signup";
let userName = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let alert = document.querySelector(".alertLogin");
let google = false;
let submitBtn = document.querySelector("#submitbtn");

const signupLogin = () => {
  if (
    ((mode === "signup" && !userName.value) ||
      !email.value ||
      !password.value) &&
    !google
  ) {
    let message =
      mode == "signup" && !userName.value
        ? "Name"
        : !email.value
        ? "email"
        : "password";
    alert.style.visibility = "visible";
    alert.innerHTML = `<i class="fa fa-info-circle" aria-hidden="true"></i> ${message.toUpperCase()} cannot be empty`;
    setTimeout(() => {
      alert.style.visibility = "hidden";
    }, 5500);
    return;
  }
  details = {
    name: userName.value,
    email: email.value,
    password: password.value,
    Type: "user",
  };

  let body;
  if (mode === "signup") {
    body = JSON.stringify(details);
  } else if (mode === "login") {
    delete details.name;
    body = JSON.stringify(details);
  }
  submitBtn.classList.toggle("disabled");
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/auth/${mode}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((response) => {
      if (
        response.hasOwnProperty("message") &&
        response.hasOwnProperty("code")
      ) {
        throw new Error(response.message);
      } else if (
        response.hasOwnProperty("message") &&
        response.hasOwnProperty("status")
      ) {
        throw new Error("So many requests please try again in 20 seconds");
      } else {
        window.location.href = "../";
        document.cookie = `token=${response.authToken}; SameSite=None; path=/; Secure`;
        submitBtn.classList.toggle("disabled");
      }
    })
    .catch(function (err) {
      submitBtn.classList.toggle("disabled");
      alert.style.visibility = "visible";
      alert.innerHTML = `<i class="fa fa-info-circle" aria-hidden="true"></i> ${err}`;
      setTimeout(() => {
        alert.style.visibility = "hidden";
      }, 3500);
    });
};

let buttonToggle = document.querySelector("#toggle");
let formName = document.querySelector("#formname");
let fullName = document.querySelector("#full-name");
let form = document.querySelector(".card");

buttonToggle.addEventListener("click", () => {
  title = formName.innerHTML;
  form.style.opacity = 0.5;
  alert.innerHTML = "";
  if (title == "Sign Up") {
    formName.innerText = "Login";
    fullName.style.height = "0px";
    buttonToggle.innerHTML = "Don't have an account? Register";
    mode = "login";
    submitBtn.innerHTML = "Log In";
  } else {
    formName.innerText = "Sign Up";
    fullName.style.height = "100%";
    buttonToggle.innerHTML = "Already have an account? Login";
    mode = "signup";
    submitBtn.innerHTML = "Sign Up";
  }
  setTimeout(() => {
    form.style.opacity = 1;
  }, 300);
});
buttonToggle.click();
