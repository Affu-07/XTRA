// Mobile navigation
var menuButton = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  var isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

var menuLinks = menu.querySelectorAll("a");
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", function () {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

// Show or hide the password while it is being typed
var passwordInput = document.getElementById("password");
var passwordToggle = document.getElementById("passwordToggle");

passwordToggle.addEventListener("click", function () {
  var shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", shouldShow);
  passwordToggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  passwordToggle.innerHTML = shouldShow
    ? '<i class="fa-regular fa-eye-slash"></i>'
    : '<i class="fa-regular fa-eye"></i>';
});

// Switch between the login form and the password-reset form
var loginForm = document.getElementById("loginForm");
var resetForm = document.getElementById("resetForm");
var forgotToggle = document.getElementById("forgotToggle");
var loginToggle = document.getElementById("loginToggle");

forgotToggle.addEventListener("click", function () {
  loginForm.hidden = true;
  resetForm.hidden = false;
  document.getElementById("resetEmail").focus();
});

loginToggle.addEventListener("click", function () {
  resetForm.hidden = true;
  loginForm.hidden = false;
  document.getElementById("username").focus();
});

// This static demo has no account server, so it never stores or sends credentials.
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("loginMessage").textContent =
    "Your details are valid, but sign-in is unavailable in this static demo.";
});

resetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("resetMessage").textContent =
    "The email address is valid. Connect a server to send a real password-reset link.";
});
