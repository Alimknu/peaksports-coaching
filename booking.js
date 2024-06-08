import { coaches } from "./coaches.js";

const coachDropdown = document.getElementById("coach");
const coachInfoContainer = document.getElementById("coach-info");
const dateTimeContainer = document.getElementById("date-time-container");
const addDateTimeBtn = document.getElementById("add-date-time-btn");
const userInfo = document.getElementById("user-info");
const selectDatesAndTimes = document.getElementById("select-dates-and-times");

document.addEventListener("DOMContentLoaded", () => {
  coaches.forEach((coach) => {
    const option = document.createElement("option");
    option.value = coach.name.toLowerCase();
    option.textContent = coach.name;
    coachDropdown.appendChild(option);
  });
});

coachDropdown.addEventListener("change", function () {
  const selectedCoachName = coachDropdown.value;
  const selectedCoach = coaches.find((coach) => coach.name.toLowerCase() === selectedCoachName);

  if (selectedCoach) {
    coachInfoContainer.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img src="${selectedCoach.image}" class="select-coach-img" alt="${selectedCoach.name}">
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <h5 class="green-text">${selectedCoach.name}</h5>
              <p class="green-text">Game: ${selectedCoach.game}</p>
              <p class="green-text">Language(s): ${selectedCoach.languages.join(", ")}</p>
              <p class="green-text">Win Rate: ${selectedCoach.stats.winRate}</p>
              <p class="green-text">Tournaments Won: ${selectedCoach.stats.tournamentsWon}</p>
            </div>
            <div class="col-md-6">
              <p class="green-text">Rating: ${selectedCoach.rating}</p>
              <p class="green-text">Rate: ${selectedCoach.rate}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    coachInfoContainer.innerHTML = "";
  }
});

const createDateTimeGroup = () => {
  const dateTimeGroup = document.createElement("div");
  dateTimeGroup.classList.add("date-time-group");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("form-control", "mb-2");

  const timeSelect = document.createElement("select");
  timeSelect.classList.add("form-select", "mb-2");
  timeSelect.innerHTML = `
    <option value="09:00">9:00 AM</option>
    <option value="10:00">10:00 AM</option>
    <option value="11:00">11:00 AM</option>
    <option value="12:00">12:00 PM</option>
    <option value="13:00">1:00 PM</option>
    <option value="14:00">2:00 PM</option>
    <option value="15:00">3:00 PM</option>
    <option value="16:00">4:00 PM</option>
  `;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.classList.add("btn", "btn-danger", "mb-2", "remove-date-time-btn");
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", () => {
    dateTimeContainer.removeChild(dateTimeGroup);
  });

  dateTimeGroup.appendChild(dateInput);
  dateTimeGroup.appendChild(timeSelect);
  dateTimeGroup.appendChild(removeBtn);

  return dateTimeGroup;
};

addDateTimeBtn.addEventListener("click", () => {
  const dateTimeGroup = createDateTimeGroup();
  dateTimeContainer.appendChild(dateTimeGroup);
});

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dateTimeGroups = document.querySelectorAll(".date-time-group");

  const selectedCoachName = coachDropdown.value;
  const selectedCoach = coaches.find((coach) => coach.name.toLowerCase() === selectedCoachName);

  if (!selectedCoach) {
    alert("Please select a coach.");
    return;
  }

  if (!name || !email) {
    alert("Please fill in your name and email.");
    return;
  }

  const selectedDatesAndTimes = [];
  dateTimeGroups.forEach((group) => {
    const date = group.querySelector("input[type='date']").value;
    const time = group.querySelector("select").value;

    if (!date || !time) {
      alert("Please fill in all date and time fields.");
      return;
    }

    selectedDatesAndTimes.push({ date, time });
  });

  if (selectedDatesAndTimes.length === 0) {
    alert("Please add at least one date and time.");
    return;
  }

  const confirmationMessage = document.createElement("div");
  confirmationMessage.classList.add("alert", "alert-success", "mt-4");
  confirmationMessage.innerHTML = `
    <h4 class="alert-heading">Booking Confirmed!</h4>
    <p>Thank you, ${name}. Your booking with ${
    selectedCoach.name
  } has been confirmed for the following dates and times:</p>
    <ul>${selectedDatesAndTimes.map((session) => `<li>${session.date} at ${session.time}</li>`).join("")}</ul>
    <p>You will receive a confirmation email at <b>${email}</b> shortly.</p>
  `;

  selectDatesAndTimes.innerHTML = "";
  userInfo.innerHTML = "";
  dateTimeContainer.innerHTML = "";
  dateTimeContainer.appendChild(confirmationMessage);
  addDateTimeBtn.style.display = "none";
});
