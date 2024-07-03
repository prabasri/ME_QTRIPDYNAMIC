import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventID = search.split("=");
  return adventID[1];
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventDetailAPI = await fetch(config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`)
    const adventDetailJson = await adventDetailAPI.json();
    return adventDetailJson;
  } catch {
    return null;
  }
  
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure.name;
  const adventSubtitle = document.getElementById("adventure-subtitle");
  adventSubtitle.innerHTML = adventure.subtitle;
  const photoGallery = document.getElementById("photo-gallery");
  
  for (let i=0; i<adventure.images.length; i++) {
    const image = document.createElement("img");
    image.src = adventure.images[i];
    image.alt = "image not available";
    image.classList.add("activity-card-image");
    photoGallery.append(image);
  }
  const content = document.getElementById("adventure-content");
  content.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGalleryCarousel = document.getElementById("photo-gallery");
  photoGalleryCarousel.innerHTML = '';

  const carouselMain = document.createElement("div");
  carouselMain.id = "carouselMain";
  carouselMain.setAttribute("class", "carousel slide");
  carouselMain.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");

  for (let i=0; i<images.length; i++) {
    if(i == 0) {
      carouselIndicators.innerHTML = `<button type="button" data-bs-target="#carouselMain" data-bs-slide-to="0" aria-label="Slide 0" class="active" aria-current="true"></button>`;
    } else {
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselMain" data-bs-slide-to=${i} aria-label="Slide ${i}"></button>`
    }
    carouselMain.append(carouselIndicators); 
  }

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  for (let i=0; i < images.length; i++) {
    const imgDiv = document.createElement("div");
    if(i == 0) {
      imgDiv.setAttribute("class","carousel-item active");
    } else {
      imgDiv.setAttribute("class","carousel-item");
    }
    imgDiv.innerHTML = `<img src=${images[i]} class="d-block w-100 activity-card-image" alt="not available">`;
    carouselInner.append(imgDiv);    
  }
  carouselMain.append(carouselInner);
  
  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.classList.add("carousel-control-prev");
  prevButton.setAttribute("data-bs-target", "#carouselMain");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>`;

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.classList.add("carousel-control-next");
  nextButton.setAttribute("data-bs-target", "#carouselMain");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>`;
  carouselMain.append(prevButton, nextButton);
  photoGalleryCarousel.append(carouselMain);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  const reservationSold = document.getElementById("reservation-panel-sold-out");
  const reservationAvailable = document.getElementById("reservation-panel-available");

  if(adventure.available) {

    reservationAvailable.style.display = "block";
    reservationSold.style.display = "none"  
    const reservationCost = document.getElementById("reservation-person-cost");
    reservationCost.innerHTML = adventure.costPerHead;

  } else {
    reservationSold.style.display = "block";
    reservationAvailable.style.display = "none";   // (OR)
    // reservationSold.remove();
    // reservationSold.outerHTML = "";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(typeof persons);
  const result = adventure.costPerHead * parseInt(persons);
  const reservationCost = document.getElementById("reservation-cost");
  reservationCost.innerHTML = result;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  console.log(adventure);
  const form = document.getElementById("myForm");
  const formData = {};
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    formData["name"] = event.target.elements["name"].value;
    formData["date"] = event.target.elements["date"].value;
    formData["person"] = event.target.elements["person"].value; 
    formData["adventure"] = adventure.id; 
    //alert(JSON.stringify(formData));
    sendDataToServer(formData);
  });
    async function sendDataToServer(formData) {
      try {
        const apiRawData= await fetch(`${config.backendEndpoint}/reservations/new`,{
          method:"POST",
          body: JSON.stringify(formData),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const successResponse= await apiRawData.json();
        alert("success");
      } catch(error) {
          alert("Failed");
      }
    }
  }
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved);
  const reservationBanner = document.getElementById("reserved-banner");

  if (!adventure.reserved) {
    reservationBanner.style.display = "none"; 
  } else {
    reservationBanner.style.display = "block"; 
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
