// document.addEventListener("DOMContentLoaded", function () {
//   const moviesList = [
//     { movieName: "Flash", price: 7 },
//     { movieName: "Spiderman", price: 5 },
//     { movieName: "Batman", price: 4 },
//   ];

//   const selectMovie = document.getElementById("selectMovie");
//   const movieNameElement = document.getElementById("movieName");
//   const moviePriceElement = document.getElementById("moviePrice");
//   const totalPriceElement = document.getElementById("totalPrice");
//   const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
//   const seatCont = document.getElementById("seatCont");
//   const seats = seatCont.querySelectorAll(".seat");
//   const cancelBtn = document.getElementById("cancelBtn");
//   const proceedBtn = document.getElementById("proceedBtn");

//   let selectedMovie = moviesList[0];
//   movieNameElement.textContent = selectedMovie.movieName;
//   moviePriceElement.textContent = `$ ${selectedMovie.price}`;

//   moviesList.forEach((movie, index) => {
//     const option = document.createElement("option");
//     option.value = index;
//     option.textContent = movie.movieName;
//     selectMovie.appendChild(option);
//   });

//   const selectedSeats = [];

//   seatCont.addEventListener("click", function (event) {
//     const clickedSeat = event.target;
//     if (clickedSeat.classList.contains("seat") && !clickedSeat.classList.contains("occupied")) {
//       if (clickedSeat.classList.contains("selected")) {
//         clickedSeat.classList.remove("selected");
//         const index = selectedSeats.indexOf(clickedSeat);
//         selectedSeats.splice(index, 1);
//       } else {
//         clickedSeat.classList.add("selected");
//         selectedSeats.push(clickedSeat);
//       }

//       updateSelectedSeatsHolder();
//       updateTotalPrice();
//     }
//   });

//   selectMovie.addEventListener("change", function () {
//     selectedMovie = moviesList[this.value];
//     movieNameElement.textContent = selectedMovie.movieName;
//     moviePriceElement.textContent = `$ ${selectedMovie.price}`;
//     updateTotalPrice();
//   });

//   proceedBtn.addEventListener("click", function () {
//     if (selectedSeats.length === 0) {
//       alert("Oops, no seat selected!");
//     } else {
//       alert("Yayy! Your seats have been booked.");

//       selectedSeats.forEach((seat) => {
//         seat.classList.remove("selected");
//         seat.classList.add("occupied");
//       });

//       selectedSeats.length = 0;
//       updateTotalPrice();
//       updateSelectedSeatsHolder();
//     }
//   });

//   cancelBtn.addEventListener("click", function () {
//     selectedSeats.forEach((seat) => seat.classList.remove("selected"));
//     selectedSeats.length = 0;
//     updateTotalPrice();
//     updateSelectedSeatsHolder();
//   });

//   function updateTotalPrice() {
//     const totalPrice = selectedSeats.length * selectedMovie.price;
//     totalPriceElement.textContent = `$ ${totalPrice}`;
//   }

//   function updateSelectedSeatsHolder() {
//     const seatNumbers = selectedSeats.map((seat) => getSeatNumber(seat));
//     const numberOfSeatElement = document.getElementById("numberOfSeat");

//     if (selectedSeats.length === 0) {
//       selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
//       numberOfSeatElement.textContent = 0;
//     } else {
//       selectedSeatsHolder.innerHTML = `<span>Selected Seats: ${seatNumbers.join(", ")}</span>`;
//       numberOfSeatElement.textContent = selectedSeats.length;
//     }
//   }

//   function getSeatNumber(seat) {
//     const allSeats = seatCont.querySelectorAll(".seat");
//     const seatIndex = Array.from(allSeats).indexOf(seat);
//     const rowNumber = Math.floor(seatIndex / 8) + 1;
//     const seatInRow = (seatIndex % 8) + 1;
//     return `R${rowNumber}S${seatInRow}`;
//   }
// });
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  const selectMovieEl = document.getElementById("selectMovie");
  
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  console.log(allSeatCont)
  
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  
  const moviePriceEl = document.getElementById("moviePrice");
  
  const cancelBtnEL = document.getElementById("cancelBtn");
  
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  selectMovieEl.addEventListener("input", (e) => {
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  });
  //
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  // console.log(seatContEl);
  let takenSeats = [];
  
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },{ once: true });
  });
  
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      seatHolder.innerHTML = seat;
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
    
  }
  
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats has been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  function uncancelSeats() {
    takenSeats = [];
    console.log(seatContEl);
    seatContEl.forEach((seat) => {
      if(seat.classList.contains("selected")){
        console.log(seat);
      seat.classList.remove("selected");
        seat.classList.add("seat")
      seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  