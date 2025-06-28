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

  if (menuOpen) {
    menuOpen.addEventListener("click", toggleNavbar);
  }
  if (menuClose) {
    menuClose.addEventListener("click", toggleNavbar);
  }

  navPages.forEach((item, index) => {
    item.addEventListener("click", () => {
      toggleNavbar();
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

    // Inicia a transição de saída da seção atual
    sections[currentSec].classList.add("opacity-0");
    sections[currentSec].classList.add("invisible");

    // Remove `flex` e adiciona `hidden` após a transição, para que a seção saia do fluxo
    // O setTimeout deve ser igual ou ligeiramente maior que a duração da transição de opacidade no CSS (duration-300)
    setTimeout(() => {
      sections[currentSec].classList.remove("flex");
      sections[currentSec].classList.add("hidden");

      // Exibe a nova seção
      sections[newSecIndex].classList.remove("hidden");
      sections[newSecIndex].classList.add("flex");

      // Força o reflow para garantir que a classe `hidden` seja removida antes de mudar a opacidade
      void sections[newSecIndex].offsetWidth;

      sections[newSecIndex].classList.remove("opacity-0");
      sections[newSecIndex].classList.remove("invisible");

      currentSec = newSecIndex;
    }, 300); // Duração da transição CSS
  }

  // Inicializa as seções: apenas a primeira visível
  sections.forEach((section, index) => {
    if (index === 0) {
      section.classList.remove("hidden");
      section.classList.add("flex");
      section.classList.remove("opacity-0");
      section.classList.remove("invisible");
    } else {
      section.classList.add("hidden");
      section.classList.remove("flex");
      section.classList.add("opacity-0");
      section.classList.add("invisible");
    }
  });

  toggleMainNavBorder(navPages[0]);
});