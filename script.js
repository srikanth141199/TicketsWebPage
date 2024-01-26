document.addEventListener("DOMContentLoaded", function () {
  const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];

  const selectMovie = document.getElementById("selectMovie");
  const movieNameElement = document.getElementById("movieName");
  const moviePriceElement = document.getElementById("moviePrice");
  const totalPriceElement = document.getElementById("totalPrice");
  const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
  const seatCont = document.getElementById("seatCont");
  const seats = seatCont.querySelectorAll(".seat");
  const cancelBtn = document.getElementById("cancelBtn");
  const proceedBtn = document.getElementById("proceedBtn");

  let selectedMovie = moviesList[0];
  movieNameElement.textContent = selectedMovie.movieName;
  moviePriceElement.textContent = `$ ${selectedMovie.price}`;

  moviesList.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = movie.movieName;
    selectMovie.appendChild(option);
  });

  const selectedSeats = [];

  seatCont.addEventListener("click", function (event) {
    const clickedSeat = event.target;
    if (clickedSeat.classList.contains("seat") && !clickedSeat.classList.contains("occupied")) {
      if (clickedSeat.classList.contains("selected")) {
        clickedSeat.classList.remove("selected");
        const index = selectedSeats.indexOf(clickedSeat);
        selectedSeats.splice(index, 1);
      } else {
        clickedSeat.classList.add("selected");
        selectedSeats.push(clickedSeat);
      }

      updateSelectedSeatsHolder();
      updateTotalPrice();
    }
  });

  selectMovie.addEventListener("change", function () {
    selectedMovie = moviesList[this.value];
    movieNameElement.textContent = selectedMovie.movieName;
    moviePriceElement.textContent = `$ ${selectedMovie.price}`;
    updateTotalPrice();
  });

  proceedBtn.addEventListener("click", function () {
    if (selectedSeats.length === 0) {
      alert("Oops, no seat selected!");
    } else {
      alert("Yayy! Your seats have been booked.");

      selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      });

      selectedSeats.length = 0;
      updateTotalPrice();
      updateSelectedSeatsHolder();
    }
  });

  cancelBtn.addEventListener("click", function () {
    selectedSeats.forEach((seat) => seat.classList.remove("selected"));
    selectedSeats.length = 0;
    updateTotalPrice();
    updateSelectedSeatsHolder();
  });

  function updateTotalPrice() {
    const totalPrice = selectedSeats.length * selectedMovie.price;
    totalPriceElement.textContent = `$ ${totalPrice}`;
  }

  function updateSelectedSeatsHolder() {
    const seatNumbers = selectedSeats.map((seat) => getSeatNumber(seat));
    const numberOfSeatElement = document.getElementById("numberOfSeat");

    if (selectedSeats.length === 0) {
      selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
      numberOfSeatElement.textContent = 0;
    } else {
      selectedSeatsHolder.innerHTML = `<span>Selected Seats: ${seatNumbers.join(", ")}</span>`;
      numberOfSeatElement.textContent = selectedSeats.length;
    }
  }

  function getSeatNumber(seat) {
    const allSeats = seatCont.querySelectorAll(".seat");
    const seatIndex = Array.from(allSeats).indexOf(seat);
    const rowNumber = Math.floor(seatIndex / 8) + 1;
    const seatInRow = (seatIndex % 8) + 1;
    return `R${rowNumber}S${seatInRow}`;
  }
});
