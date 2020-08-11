const gameContainer = document.getElementById("game");
let firstPick = null;
let secondPick = null;
let pickCounter = 0;
let stopPicks = false;
let guessCount = 1;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "olive",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "olive",
  "pink",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// When a card is clicked...
function handleCardClick(e) {
  // if the player is out of picks, don't do anything and stop
  if (stopPicks) {
    return;
  }
  // if the card has already been picked, don't do anything and stop
  if (e.target.classList.contains("picked")) {
    return;
  }
  let cardClicked = e.target;
  // set the target card's background to whatever its random
  // color class is
  cardClicked.style.background = cardClicked.classList[0];

  // if either firstPick or secondPick haven't happened yet
  // then mark the target card as picked
  if (!firstPick || !secondPick) {
    cardClicked.classList.add("picked");
    firstPick = firstPick || cardClicked;
    pickCounter++;
    // if the target card is the same as firstPick
    // keep secondPick at null
    // otherwise, set secondPick to the target card
    if (cardClicked === firstPick) {
      secondPick = null;
    } else {
      secondPick = cardClicked;
    }
  }
  // if both firstPick and secondPick have been uniquely assigned
  // stop picking and test if they have the same color class
  if (firstPick && secondPick) {
    stopPicks = true;
    let testMatch1 = firstPick.className;
    let testMatch2 = secondPick.className;
    document.getElementById('guess-counter').innerHTML = guessCount;
    guessCount++;

    if (testMatch1 === testMatch2) {
      pickCounter += 2;
      firstPick.removeEventListener("click", handleCardClick);
      secondPick.removeEventListener("click", handleCardClick);
      firstPick = null;
      secondPick = null;
      stopPicks = false;
    } else {
      setTimeout(function () {
        firstPick.style.backgroundColor = "";
        secondPick.style.backgroundColor = "";
        firstPick.classList.remove("picked");
        secondPick.classList.remove("picked");
        firstPick = null;
        secondPick = null;
        stopPicks = false;
      }, 750);
    }
  }
}


// when the reset button is clicked
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function(){
  document.location.href = '';
})

// when the DOM loads
createDivsForColors(shuffledColors);

// Dark Mode
const darkModeButton = document.getElementById("switch");

if (localStorage.getItem("darkModeEnabled")) {
  document.body.className = "dark";
  darkModeButton.checked = true;
}

darkModeButton.addEventListener("click", function (e) {
  const { checked } = darkModeButton;
  if (checked) {
    localStorage.setItem("darkModeEnabled", true);
  } else {
    localStorage.removeItem("darkModeEnabled");
  }
  document.body.className = checked ? "dark" : "";
});
