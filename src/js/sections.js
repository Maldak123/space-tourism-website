document.addEventListener("DOMContentLoaded", async () => {
  let spaceData = null;


  const destinationNavItems = document.querySelectorAll("#f .nav_item");
  const destinationImageElement = document.querySelector("#section:nth-of-type(2) img");
  const destinationNameElement = document.querySelector("#section:nth-of-type(2) h1#name");
  const destinationDescriptionElement = document.querySelector("#texto");
  const destinationDistanceElement = document.querySelector("#section:nth-of-type(2) section:nth-of-type(2) div:nth-of-type(1) p");
  const destinationTravelElement = document.querySelector("#section:nth-of-type(2) section:nth-of-type(2) div:nth-of-type(2) p");

  const crewNavDots = document.querySelectorAll("#section:nth-of-type(3) .dots");
  const crewRoleElement = document.querySelector("#section:nth-of-type(3) .flex-col.gap-6 > div > p");
  const crewNameElement = document.querySelector("#section:nth-of-type(3) .flex-col.gap-6 > div > h1");
  const crewBioElement = document.querySelector("#section:nth-of-type(3) .flex-col.gap-6 > p");
  const crewImageElement = document.querySelector("#section:nth-of-type(3) img");

  const technologyPagination = document.querySelectorAll("#section:nth-of-type(4) .pagination");
  const technologyImageElement = document.querySelector("#section:nth-of-type(4) img.min-w-screen");
  const technologyTerminologyElement = document.querySelector("#section:nth-of-type(4) .flex-col.gap-4 > p");
  const technologyNameElement = document.querySelector("#section:nth-of-type(4) .flex-col.gap-4 > h1");
  const technologyDescriptionElement = document.querySelector("#section:nth-of-type(4) .flex-col.gap-4 > p:last-of-type");

  async function loadSpaceData() {
    try {
      const response = await fetch("data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      spaceData = await response.json();
      console.log("Dados JSON carregados:", spaceData);

      displayDestination(0);
      displayCrew(0);
      displayTechnology(0);
    } catch (error) {
      console.error("Erro ao carregar ou processar os dados JSON:", error);
    }
  }

  function displayDestination(index) {
    if (!spaceData || !spaceData.destinations || !spaceData.destinations[index]) return;

    const destination = spaceData.destinations[index];

    destinationNavItems.forEach((item, idx) => {
      if (destinationImageElement) destinationImageElement.src = destination.images.webp;
      if (destinationNameElement) destinationNameElement.textContent = destination.name.toUpperCase();
      if (destinationDescriptionElement) destinationDescriptionElement.textContent = destination.description;
      if (destinationDistanceElement) destinationDistanceElement.textContent = destination.distance.toUpperCase();
      if (destinationTravelElement) destinationTravelElement.textContent = destination.travel.toUpperCase();

      if (idx === index) {
        item.classList.add("active_destination_nav");
      } else {
        item.classList.remove("active_destination_nav");
      }
    });
  }

  function displayCrew(index) {
    if (!spaceData || !spaceData.crew || !spaceData.crew[index]) return;

    const member = spaceData.crew[index];

    if (crewRoleElement) crewRoleElement.textContent = member.role.toUpperCase();
    if (crewNameElement) crewNameElement.textContent = member.name.toUpperCase();
    if (crewBioElement) crewBioElement.textContent = member.bio;
    if (crewImageElement) crewImageElement.src = member.images.webp;
    if (crewImageElement) crewImageElement.alt = member.name;

    crewNavDots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active_dot");
      } else {
        dot.classList.remove("active_dot");
      }
    });
  }

  function displayTechnology(index) {
    if (!spaceData || !spaceData.technology || !spaceData.technology[index]) return;

    const tech = spaceData.technology[index];

    if (technologyImageElement) technologyImageElement.src = tech.images.portrait;
    if (technologyTerminologyElement) technologyTerminologyElement.textContent = "THE TERMINOLOGY…";
    if (technologyNameElement) technologyNameElement.textContent = tech.name.toUpperCase();
    if (technologyDescriptionElement) technologyDescriptionElement.textContent = tech.description;

    technologyPagination.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("pagination_active");
      } else {
        dot.classList.remove("pagination_active");
      }
    });
  }

  destinationNavItems.forEach((item, index) => {
    item.addEventListener("click", () => displayDestination(index));
  });

  crewNavDots.forEach((dot, index) => {
    dot.addEventListener("click", () => displayCrew(index));
  });

  technologyPagination.forEach((pageItem, index) => {
    pageItem.addEventListener("click", () => displayTechnology(index));
  });

  loadSpaceData();
});
