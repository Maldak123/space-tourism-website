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
