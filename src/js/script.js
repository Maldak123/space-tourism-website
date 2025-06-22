document.addEventListener("DOMContentLoaded", () => {
  // Toggleable navbar
  const menu = document.querySelectorAll("#menu");

  menu.forEach((e) => {
    e.addEventListener("click", () => {
      const navBar = document.querySelector("#nav_bar");
      navBar.classList.toggle("opacity-0");
      navBar.classList.toggle("-right-0");
      navBar.classList.toggle("-right-full");
    });
  });

  // Sections load
  const sections = document.querySelectorAll("#section");
  const navPages = document.querySelectorAll("#nav_item");
  const startBtn = document.querySelector("#start_btn");
  const logo = document.querySelector("#logo");
  let currentSec = 0;

  navPages.forEach((e) => {
    const x = [...navPages];
    e.addEventListener("click", () => {
      changingSec(x.indexOf(e));
    });
  });

  // Logo homepage activation
  logo.addEventListener("click", () => {
    sections[currentSec].classList.toggle("hidden");
    sections[0].classList.toggle("hidden");
    currentSec = 0;
  });

  // Homepage btn activation
  startBtn.addEventListener("click", () => {
    sections[0].classList.toggle("hidden");
    sections[1].classList.toggle("hidden");
    currentSec = 1;
  });

  // Navbar sections activation
  function changingSec(x) {
    if (currentSec == x) {
      return;
    } else {
      sections[currentSec].classList.toggle("hidden");
      sections[x].classList.toggle("hidden");
      currentSec = x;
    }
  }
});
