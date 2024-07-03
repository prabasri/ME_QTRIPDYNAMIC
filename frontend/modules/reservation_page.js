import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const fetchData = await fetch(config.backendEndpoint+"/reservations/");
    const fetchedData = await fetchData.json();
    return fetchedData;
  } catch(error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
    return;
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page 
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const tableHead = document.getElementById("reservation-table-parent")
  reservations.map((reservation) => {

    const tableBody = document.getElementById("reservation-table");
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
    <th scope="row">${reservation.id}</th>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${new Date(reservation.date).toLocaleDateString("en-IN")}</td>
    <td>${reservation.price}</td>
    <td>${new Date(reservation.time).toLocaleDateString("en-IN",{
      year: "numeric",
      day: "numeric",
      month: "long",})}, ${new Date(reservation.time).toLocaleTimeString("en-IN",{
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}</td>
    <td><button class="reservation-visit-button" id=${reservation.id}><a href="../detail/?adventure=${reservation.adventure}">visit Adventure</a></button></td>
    `;
    tableBody.appendChild(tableRow);
  })  
}

export { fetchReservations, addReservationToTable };
