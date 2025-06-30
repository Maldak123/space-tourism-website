document.addEventListener("DOMContentLoaded", () => {
  const menuOpen = document.querySelector("#menu-open");
  const menuClose = document.querySelector("#menu-close");
  const navBar = document.querySelector("#nav_bar");
  const sections = [
    document.querySelector("#home-section"),
    document.querySelector("#destination-section"),
    document.querySelector("#crew-section"),
    document.querySelector("#technology-section"),
  ];
  const navPages = document.querySelectorAll(".nav_item");
  const startBtn = document.querySelector("#start_btn");
  const logo = document.querySelector("#logo");
  let currentSec = 0;

  function toggleMainNavBorder(activeItem) {
    navPages.forEach((item) => {
      item.classList.remove("border-white");
      item.classList.add("border-transparent");
    });
    activeItem.classList.remove("border-transparent");
    activeItem.classList.add("border-white");
  }

  function toggleNavbar() {
    navBar.classList.toggle("opacity-0");
    navBar.classList.toggle("-right-0");
    navBar.classList.toggle("-right-full");
  }

  function initializeNavbar() {
    if (window.innerWidth < 768) {
      navBar.classList.add("opacity-0");
      navBar.classList.add("-right-full");
      navBar.classList.remove("-right-0");
    }
  }

  if (menuOpen) {
    menuOpen.addEventListener("click", toggleNavbar);
  }
  if (menuClose) {
    menuClose.addEventListener("click", toggleNavbar);
  }

  navPages.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        toggleNavbar();
      }
      toggleMainNavBorder(item);
      changeSection(index);
    });
  });

  logo.addEventListener("click", () => {
    if (currentSec !== 0) {
      changeSection(0);
      toggleMainNavBorder(navPages[0]);
    }
  });

  startBtn.addEventListener("click", () => {
    if (currentSec !== 1) {
      changeSection(1);
      toggleMainNavBorder(navPages[1]);
    }
  });

  function changeSection(newSecIndex) {
    if (currentSec === newSecIndex) return;

    sections[currentSec].classList.add("hidden");
    sections[currentSec].classList.remove("flex");

    sections[newSecIndex].classList.remove("hidden");
    sections[newSecIndex].classList.add("flex");

    currentSec = newSecIndex;
  }

  sections.forEach((section, index) => {
    if (index === 0) {
      section.classList.remove("hidden");
      section.classList.add("flex");
    } else {
      section.classList.add("hidden");
      section.classList.remove("flex");
    }
  });

  initializeNavbar();
  toggleMainNavBorder(navPages[0]);

  window.addEventListener('resize', initializeNavbar);
});