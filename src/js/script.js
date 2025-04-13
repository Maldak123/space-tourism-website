async function loadDestinations() {
    const response = await fetch('./src/data/data.json');
    const data = await response.json();
    return data.destinations;
}


