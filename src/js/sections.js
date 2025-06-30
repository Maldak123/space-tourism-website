document.addEventListener("DOMContentLoaded", async () => {
  let spaceData = null;

  const destinationNavItems = document.querySelectorAll(".nav_destination_item");
  const destinationImageElement = document.querySelector("#dest-image");
  const destinationNameElement = document.querySelector("#dest-name");
  const destinationDescriptionElement = document.querySelector("#dest-text");
  const destinationDistanceElement = document.querySelector("#est_time");
  const destinationTravelElement = document.querySelector("#est_travel");

  const crewNavDots = document.querySelectorAll(".dots");
  const crewRoleElement = document.querySelector("#crew-role");
  const crewNameElement = document.querySelector("#crew-name");
  const crewBioElement = document.querySelector("#crew-text");
  const crewImageElement = document.querySelector("#crew-pic");

  const technologyPagination = document.querySelectorAll(".pagination");
  const technologyImageElement = document.querySelector("#tech_pic");
  const technologyNameElement = document.querySelector("#tech_name");
  const technologyDescriptionElement = document.querySelector("#tech_text");

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

  function toggleDestinationNavBorder(activeIndex) {
    destinationNavItems.forEach((item) => {
      item.classList.add("nav-item-inactive");
    });
    activeIndex.classList.remove("nav-item-inactive");
    activeIndex.classList.add("nav-item-active");
  }

  function displayDestination(index) {
    if (!spaceData || !spaceData.destinations || !spaceData.destinations[index]) return;

    toggleDestinationNavBorder(destinationNavItems[index]);

    const destination = spaceData.destinations[index];

    destinationImageElement.classList.add("opacity-0");
    destinationNameElement.classList.add("opacity-0");
    destinationDescriptionElement.classList.add("opacity-0");
    destinationDistanceElement.classList.add("opacity-0");
    destinationTravelElement.classList.add("opacity-0");

    setTimeout(() => {
      destinationImageElement.src = destination.images.webp;
      destinationNameElement.textContent = destination.name.toUpperCase();
      destinationDescriptionElement.textContent = destination.description;
      destinationDistanceElement.textContent = destination.distance.toUpperCase();
      destinationTravelElement.textContent = destination.travel.toUpperCase();

      destinationImageElement.classList.remove("opacity-0");
      destinationNameElement.classList.remove("opacity-0");
      destinationDescriptionElement.classList.remove("opacity-0");
      destinationDistanceElement.classList.remove("opacity-0");
      destinationTravelElement.classList.remove("opacity-0");
    }, 100);
  }

  function displayCrew(index) {
    if (!spaceData || !spaceData.crew || !spaceData.crew[index]) return;

    const member = spaceData.crew[index];

    crewRoleElement.classList.add("opacity-0");
    crewNameElement.classList.add("opacity-0");
    crewBioElement.classList.add("opacity-0");
    crewImageElement.classList.add("opacity-0");

    setTimeout(() => {
      crewRoleElement.textContent = member.role.toUpperCase();
      crewNameElement.textContent = member.name.toUpperCase();
      crewBioElement.textContent = member.bio;
      crewImageElement.src = member.images.webp;
      crewImageElement.alt = member.name;

      crewRoleElement.classList.remove("opacity-0");
      crewNameElement.classList.remove("opacity-0");
      crewBioElement.classList.remove("opacity-0");
      crewImageElement.classList.remove("opacity-0");
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
    technologyNameElement.classList.add("opacity-0");
    technologyDescriptionElement.classList.add("opacity-0");

    setTimeout(() => {
      if (window.innerWidth >= 1024) {
        technologyImageElement.src = tech.images.portrait;
      } else {
        technologyImageElement.src = tech.images.landscape;
      }
      technologyNameElement.textContent = tech.name.toUpperCase();
      technologyDescriptionElement.textContent = tech.description;

      technologyImageElement.classList.remove("opacity-0");
      technologyNameElement.classList.remove("opacity-0");
      technologyDescriptionElement.classList.remove("opacity-0");
    }, 100);

    technologyPagination.forEach((pageItem, idx) => {
      if (idx === index) {
        pageItem.classList.add("pagination_active");
      } else {
        pageItem.classList.remove("pagination_active");
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

  window.addEventListener("resize", () => {
    const technologySection = document.querySelector("#technology-section");
    if (technologySection && !technologySection.classList.contains("opacity-0")) {
      const activeTechIndex = Array.from(technologyPagination).findIndex((item) => item.classList.contains("pagination_active"));
      if (activeTechIndex !== -1) {
        displayTechnology(activeTechIndex);
      }
    }
  });
});
