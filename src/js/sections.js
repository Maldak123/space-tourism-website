document.addEventListener("DOMContentLoaded", () => {
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

    destinationImageElement.classList.add("opacity-0");
    destinationNameElement.classList.add("opacity-0");

    setTimeout(() => {
      if (destinationImageElement) destinationImageElement.src = destination.images.webp;
      if (destinationNameElement) destinationNameElement.textContent = destination.name.toUpperCase();
      if (destinationDescriptionElement) destinationDescriptionElement.textContent = destination.description;
      if (destinationDistanceElement) destinationDistanceElement.textContent = destination.distance.toUpperCase();
      if (destinationTravelElement) destinationTravelElement.textContent = destination.travel.toUpperCase();

      setTimeout(() => {
        destinationImageElement.classList.remove("opacity-0");
        destinationNameElement.classList.remove("opacity-0");
      }, 0);
    }, 100);

    destinationNavItems.forEach((item, idx) => {
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

    crewRoleElement.classList.add("opacity-0");
    crewNameElement.classList.add("opacity-0");
    crewBioElement.classList.add("opacity-0");
    crewImageElement.classList.add("opacity-0");
    crewImageElement.classList.add("opacity-0");

    setTimeout(() => {
      if (crewRoleElement) crewRoleElement.textContent = member.role.toUpperCase();
      if (crewNameElement) crewNameElement.textContent = member.name.toUpperCase();
      if (crewBioElement) crewBioElement.textContent = member.bio;
      if (crewImageElement) crewImageElement.src = member.images.webp;
      if (crewImageElement) crewImageElement.alt = member.name;

      setTimeout(() => {
        crewRoleElement.classList.remove("opacity-0");
        crewNameElement.classList.remove("opacity-0");
        crewBioElement.classList.remove("opacity-0");
        crewImageElement.classList.remove("opacity-0");
        crewImageElement.classList.remove("opacity-0");
      }, 0);
    }, 100);

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

    technologyImageElement.classList.add("opacity-0");
    technologyTerminologyElement.classList.add("opacity-0");
    technologyNameElement.classList.add("opacity-0");
    technologyDescriptionElement.classList.add("opacity-0");

    setTimeout(() => {
      if (technologyImageElement) technologyImageElement.src = tech.images.portrait;
      if (technologyTerminologyElement) technologyTerminologyElement.textContent = "THE TERMINOLOGY…";
      if (technologyNameElement) technologyNameElement.textContent = tech.name.toUpperCase();
      if (technologyDescriptionElement) technologyDescriptionElement.textContent = tech.description;

      setTimeout(() => {
        technologyImageElement.classList.remove("opacity-0");
        technologyTerminologyElement.classList.remove("opacity-0");
        technologyNameElement.classList.remove("opacity-0");
        technologyDescriptionElement.classList.remove("opacity-0");
      }, 0);
    }, 100);

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
