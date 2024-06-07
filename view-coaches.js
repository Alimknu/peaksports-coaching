import { coaches } from "./coaches.js";

const coachContainer = document.getElementById("coach-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let startingIndex = 0;
let endingIndex = 3;

const displayCoaches = (coaches) => {
  let html = "";
  coaches.forEach((coach, index) => {
    if (index % 3 === 0) {
      html += '<div class="row">';
    }
    html += `
    <div class="col-md-4"> 
        <div class="card"> 
            <img src="${coach.image}" alt="${coach.name}" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${coach.name}</h2>
                <p class="card-text">${coach.game}</p>
                <p class="card-text">Rate: ${coach.rate}</p>
                <a href="booking.html" class="btn btn-primary">Book a Session</a>
            </div>
        </div>
    </div>`;
    if ((index + 1) % 3 === 0 || index === coaches.length - 1) {
      html += "</div>";
    }
  });
  coachContainer.innerHTML += html;
};

displayCoaches(coaches.slice(startingIndex, endingIndex));

const fetchMoreCoaches = () => {
  startingIndex += 3;
  endingIndex += 3;
  displayCoaches(coaches.slice(startingIndex, endingIndex));
  if (coaches.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = "No more coaches to load";
  }
};

loadMoreBtn.addEventListener("click", fetchMoreCoaches);
