import { coaches } from "./coaches.js";

const coachDropdown = document.getElementById("coach");
const coachInfoContainer = document.getElementById("coach-info");

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
              <h5>${selectedCoach.name}</h5>
              <p>${selectedCoach.game}</p>
              <p>${selectedCoach.languages.join(", ")}</p>
            </div>
            <div class="col-md-6">
              <p>Rating: ${selectedCoach.rating}</p>
              <p>Rate: ${selectedCoach.rate}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    coachInfoContainer.innerHTML = "";
  }
});

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const selectedCoachName = coachDropdown.value;
  const selectedCoach = coaches.find((coach) => coach.name.toLowerCase() === selectedCoachName);

  if (name && email && date && time && selectedCoach) {
    document.getElementById("calendar-and-form").innerHTML = `
      <div class="alert alert-success" role="alert">
        Booking successful! You have booked a session with ${selectedCoach.name} on ${date} at ${time}.
      </div>
    `;
    document.getElementById("user-info").innerHTML = ``;
  } else {
    alert("Please fill in all fields and select a coach.");
  }
});
