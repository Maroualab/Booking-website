const startButton = document.getElementById("start-button");
const welcomeContainer = document.getElementById("welcome");
const bookingForm = document.getElementById("booking");
const progressCircles = document.querySelectorAll(".progress-bar .circle");
const progressLines = document.querySelectorAll(".progress-bar .line");
const backButtonStep2 = document.getElementById("back-button");
const resultsection = document.getElementById("results");
const backButtonStep3 = document.getElementById("back-btn");
const cards = document.getElementById("search-cards");
const departure = document.getElementById("departure");
const arrival = document.getElementById("arrival");
const date = document.getElementById("date");
const bookButtonStep3 = document.getElementById("book_btn");
const bookButtonStep4 = document.getElementById("book_btn1");
const booksection = document.getElementById("reservation");
const backButtonStep4 = document.getElementById("back-btn1");
let searchButton = document.getElementById("search-button");
const infos = document.getElementById("passenger-info");
let selectedFlight = null;




// section 1 

// start button to move to 2nd step 
startButton.addEventListener("click", function () {
  welcomeContainer.style.display = "none";
  bookingForm.style.display = "block";

  progressCircles[0].classList.add("active");
  progressLines[0].classList.add("active");
});



//section 2 

// back button to go back
backButtonStep2.addEventListener("click", function () {
  welcomeContainer.style.display = "block";
  bookingForm.style.display = "none";

  progressCircles[0].classList.remove("active");
  progressLines[0].classList.remove("active");
});

// search button : includes conditions and creating the next step's cards 
searchButton.addEventListener("click", function () {
  if (departure.value == "" || arrival.value == "" || date.value == "") {
    alert("Please fill all inputs.");
    return;
  }

  if (departure.value == arrival.value) {
    alert(
      "Departure and Arrival cannot be the same. Please choose different locations."
    );
    return;
  }

  bookingForm.style.display = "none";
  resultsection.style.display = "block";

  progressCircles[1].classList.add("active");
  progressLines[1].classList.add("active");


  const departureCity = departure.value;
  const arrivalCity = arrival.value;


  cards.innerHTML =  `
    <div class="flight-card" id="economy" onclick="selectFlight('economy')">
      <div class="flight-details">
        <i class="plane-icon">✈️</i>
        <p class="flight-type">Economy</p>
      </div>
      <div class="flight-info">
        <p class="from">From: ${departureCity}</p>
        <span class="arrow">&#8594;</span>
        <p class="to">To: ${arrivalCity}</p>
      </div>
    </div>
    <div class="flight-card" id="business" onclick="selectFlight('business')">
      <div class="flight-info">
        <p class="from">From: ${departureCity}</p>
        <span class="arrow">&#8594;</span>
        <p class="to">To: ${arrivalCity}</p>
      </div>
      <div class="flight-details">
        <p class="flight-type">Business</p>
        <i class="plane-icon">✈️</i>
      </div>
    </div>
    <div class="flight-card" id="first-class" onclick="selectFlight('first-class')">
      <div class="flight-info">
        <p class="from">From: ${departureCity}</p>
        <span class="arrow">&#8594;</span>
        <p class="to">To: ${arrivalCity}</p>
      </div>
      <div class="flight-details">
        <p class="flight-type">First Class</p>
        <i class="plane-icon">✈️</i>
      </div>
    </div>
  `;
});

document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById("date");
  
  const today = new Date().toISOString().split("T")[0];
  
  dateInput.setAttribute("min", today);
});


//section 3 

//back button to go back to trip details 
backButtonStep3.addEventListener("click", function () {
  bookingForm.style.display = "block";
  resultsection.style.display = "none";
  cards.innerHTML = "";

  progressCircles[1].classList.remove("active");
  progressLines[1].classList.remove("active");

  // Reset the selected flight
  selectedFlight = null;
  document.querySelectorAll('.flight-card').forEach(card => {
    card.classList.remove("selected-flight"); 
  });
});

// Bookbutton with function to select flight and add slected flight class 
bookButtonStep3.addEventListener("click", function () {
  if (!selectedFlight) {
    alert("Please select a flight option.");
    return;
  }

  resultsection.style.display = "none";
  booksection.style.display = "block";

  progressCircles[2].classList.add("active");
  progressLines[2].classList.add("active");
});

function selectFlight(flightType) {

  if (selectedFlight === flightType) {
    selectedFlight = null; 
    document.querySelectorAll('.flight-card').forEach(card => {
      card.classList.remove("selected-flight", "blur");
    });
    console.log("No flight selected");
  } else {
    // Otherwise, select the new flight and blur the others
    selectedFlight = flightType;

    document.querySelectorAll('.flight-card').forEach(card => {
      if (card.id === flightType) {
        card.classList.add("selected-flight");
        card.classList.remove("blur");
      } else {
        card.classList.add("blur");
        card.classList.remove("selected-flight");
      }
    });

    console.log(`Selected Flight: ${flightType}`);
  }
}


//section 4 

// book button to get to the next section of infos 

bookButtonStep4.addEventListener('click', function(){

  booksection.style.display ="none";
  infos.style.display="block";

  progressCircles[3].classList.add("active");
  progressLines[3].classList.add("active");


});


// back button to go back to the flight cards and clear the selection of travelers 
backButtonStep4.addEventListener("click", function () {
  resultsection.style.display = "block";
  booksection.style.display = "none";

  progressCircles[2].classList.remove("active");
  progressLines[2].classList.remove("active");

  travelerCounts.adult = 0;
  travelerCounts.child = 0;
  document.getElementById("adult-count").innerText = travelerCounts.adult;
  document.getElementById("child-count").innerText = travelerCounts.child;

  document.querySelectorAll(".seat.selected").forEach(seat => {
    seat.classList.remove("selected");
  });
  selectedSeats = 0;

  document.getElementById("total-price").innerText = "0000";
});



let travelerCounts = { adult: 0, child: 0 };
let selectedSeats = 0;
const maxTravelers = 8;

function updateDisplay() {
  document.getElementById("adult-count").innerText = travelerCounts.adult;
  document.getElementById("child-count").innerText = travelerCounts.child;
  document.getElementById("total-price").innerText = calculateTotalPrice();
}

function calculateTotalPrice() {
  return travelerCounts.adult * 500 + travelerCounts.child * 100;
}

function toggleSeat(seatButton) {
  const totalTravelers = travelerCounts.adult + travelerCounts.child;

  if (seatButton.classList.contains("selected")) {
    seatButton.classList.remove("selected");
    selectedSeats--;
  } else if (selectedSeats < totalTravelers) {
    seatButton.classList.add("selected");
    selectedSeats++;
  } else {
    alert("Select seats within the number of travelers.");
  }
  updateDisplay();
}

function incrementAdult() {
  if (travelerCounts.adult + travelerCounts.child >= maxTravelers) {
    alert("Maximum of 8 travelers allowed.");
    return;
  }
  travelerCounts.adult++;
  updateDisplay();
}

function decrementAdult() {
  if (travelerCounts.adult > 0) {
    travelerCounts.adult--;
    if (travelerCounts.adult + travelerCounts.child < selectedSeats) {
      alert("Reduce seat selection before decreasing travelers.");
      travelerCounts.adult++;
    }
    updateDisplay();
  }
}

function incrementChild() {
  if (travelerCounts.adult + travelerCounts.child >= maxTravelers) {
    alert("Maximum of 8 travelers allowed.");
    return;
  }
  travelerCounts.child++;
  updateDisplay();
}

function decrementChild() {
  if (travelerCounts.child > 0) {
    travelerCounts.child--;
    if (travelerCounts.adult + travelerCounts.child < selectedSeats) {
      alert("Reduce seat selection before decreasing travelers.");
      travelerCounts.child++;
    }
    updateDisplay();
  }
}

function resetSelection() {
  travelerCounts.adult = 0;
  travelerCounts.child = 0;
  document.getElementById("adult-count").innerText = travelerCounts.adult;
  document.getElementById("child-count").innerText = travelerCounts.child;

  const seatButtons = document.querySelectorAll(".seat");
  seatButtons.forEach(button => button.classList.remove("selected"));
  selectedSeats = 0;

  updateDisplay();
}


// section 5 

document.getElementById("get-ticket-btn").addEventListener("click", function () {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();

  if (firstName === "" || lastName === "") {
    alert("Please fill in both first and last name.");
    return;
  }

  generateTickets(firstName, lastName);
});

function generateTickets(firstName, lastName) {
  const ticketsContainer = document.getElementById("tickets-container");
  ticketsContainer.innerHTML = ""; 

  const totalTravelers = travelerCounts.adult + travelerCounts.child;

  for (let i = 1; i <= totalTravelers; i++) {
    const ticket = document.createElement("div");
    ticket.classList.add("ticket");

    const seatNumber = i;  
    const ticketHTML = `
      <p><strong>Passenger:</strong> ${firstName} ${lastName}</p>
      <p><strong>Seat Number:</strong> ${seatNumber}</p>
      <p><strong>Flight Type:</strong> ${selectedFlight.charAt(0).toUpperCase() + selectedFlight.slice(1)} Flight</p>
      <p><strong>From:</strong> ${departure.value}</p>
      <p><strong>To:</strong> ${arrival.value}</p>
      <p><strong>Date:</strong> ${date.value}</p>
    `;

    ticket.innerHTML = ticketHTML;
    ticketsContainer.appendChild(ticket);
  }

  document.getElementById("ticket-popup").style.display = "flex";
}


function closeTicketPopup() {
  document.getElementById("ticket-popup").style.display = "none";
}

