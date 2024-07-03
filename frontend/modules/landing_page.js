import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  debugger;
  let cities = await fetchCities();
 
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      debugger;
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  console.log("From init()");
  console.log(config.backendEndpoint);
  console.log(cities);
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const getAPI = await fetch(`${config.backendEndpoint}/cities`);
    const citiesAPI = await getAPI.json();
    return citiesAPI;
  } catch {
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataDiv = document.getElementById("data");

  const colDiv = document.createElement("div");
  colDiv.setAttribute("class", "col-sm-12 col-lg-3 col-md-6 mb-4");
  
  const aLink = document.createElement("a");
  aLink.href = `pages/adventures/?city=${id}`;
  aLink.setAttribute("id", id);
  
  const tileDiv = document.createElement("div");
  tileDiv.setAttribute("class", "tile");

  const imgCreate = document.createElement("img");
  imgCreate.src = image;
  imgCreate.alt = city;

  const head = document.createElement("h5");
  head.innerText = city;

  const describe = document.createElement("h6");
  describe.innerText = description;

  const tileText = document.createElement("div")
  tileText.setAttribute("class", "tile-text");

  
  tileText.append(head, describe)
  tileDiv.append(imgCreate, tileText);
  aLink.append(tileDiv);
  colDiv.append(aLink);
  dataDiv.append(colDiv);

}

export { init, fetchCities, addCityToDOM };
