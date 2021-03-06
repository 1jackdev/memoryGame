const gameContainer = document.getElementById("game");
let firstPick = null;
let secondPick = null;
let stopPicks = false;
let guessCount = 1;

const COLORS = [
  // "red",
  // "blue",
  // "green",
  // "orange",
  // "purple",
  // "cyan",
  // "olive",
  // "pink",
  // "red",
  // "blue",
  // "green",
  // "orange",
  // "purple",
  // "cyan",
  // "olive",
  // "pink",
  "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2922672/pexels-photo-2922672.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2922672/pexels-photo-2922672.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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

    newDiv.classList.add(`url(${color})`);

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
    document.getElementById("guess-counter").innerHTML = guessCount;
    guessCount++;

    if (testMatch1 === testMatch2) {
      firstPick.removeEventListener("click", handleCardClick);
      secondPick.removeEventListener("click", handleCardClick);

      secondPick.classList.remove();
      secondPick.classList.remove();
      firstPick = null;
      secondPick = null;
      stopPicks = false;
    } else {
      setTimeout(function () {
        firstPick.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e66f4fd-97c0-4e2d-a421-842d48663f77/dbmh3ia-1f3099b5-45be-4faa-ba64-c0cba4148776.jpg/v1/crop/w_179,h_250,x_0,y_0,scl_0.0716,q_70,strp/playing_card_back_design__nature_theme_deck_by_sethalanfloyd_dbmh3ia-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDM0IiwicGF0aCI6IlwvZlwvN2U2NmY0ZmQtOTdjMC00ZTJkLWE0MjEtODQyZDQ4NjYzZjc3XC9kYm1oM2lhLTFmMzA5OWI1LTQ1YmUtNGZhYS1iYTY0LWMwY2JhNDE0ODc3Ni5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uHwuEuUiTqODK5N-kXRw43zoFqXVMTl4uGhm4NoAOZE')";
        secondPick.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e66f4fd-97c0-4e2d-a421-842d48663f77/dbmh3ia-1f3099b5-45be-4faa-ba64-c0cba4148776.jpg/v1/crop/w_179,h_250,x_0,y_0,scl_0.0716,q_70,strp/playing_card_back_design__nature_theme_deck_by_sethalanfloyd_dbmh3ia-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDM0IiwicGF0aCI6IlwvZlwvN2U2NmY0ZmQtOTdjMC00ZTJkLWE0MjEtODQyZDQ4NjYzZjc3XC9kYm1oM2lhLTFmMzA5OWI1LTQ1YmUtNGZhYS1iYTY0LWMwY2JhNDE0ODc3Ni5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uHwuEuUiTqODK5N-kXRw43zoFqXVMTl4uGhm4NoAOZE')";
        firstPick.classList.remove("picked");
        secondPick.classList.remove("picked");
        firstPick.style.background = "center /100% 100% no-repeat url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e66f4fd-97c0-4e2d-a421-842d48663f77/dbmh3ia-1f3099b5-45be-4faa-ba64-c0cba4148776.jpg/v1/crop/w_179,h_250,x_0,y_0,scl_0.0716,q_70,strp/playing_card_back_design__nature_theme_deck_by_sethalanfloyd_dbmh3ia-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDM0IiwicGF0aCI6IlwvZlwvN2U2NmY0ZmQtOTdjMC00ZTJkLWE0MjEtODQyZDQ4NjYzZjc3XC9kYm1oM2lhLTFmMzA5OWI1LTQ1YmUtNGZhYS1iYTY0LWMwY2JhNDE0ODc3Ni5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uHwuEuUiTqODK5N-kXRw43zoFqXVMTl4uGhm4NoAOZE')";
        secondPick.style.background = "center /100% 100% no-repeat url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e66f4fd-97c0-4e2d-a421-842d48663f77/dbmh3ia-1f3099b5-45be-4faa-ba64-c0cba4148776.jpg/v1/crop/w_179,h_250,x_0,y_0,scl_0.0716,q_70,strp/playing_card_back_design__nature_theme_deck_by_sethalanfloyd_dbmh3ia-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDM0IiwicGF0aCI6IlwvZlwvN2U2NmY0ZmQtOTdjMC00ZTJkLWE0MjEtODQyZDQ4NjYzZjc3XC9kYm1oM2lhLTFmMzA5OWI1LTQ1YmUtNGZhYS1iYTY0LWMwY2JhNDE0ODc3Ni5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uHwuEuUiTqODK5N-kXRw43zoFqXVMTl4uGhm4NoAOZE')";
        firstPick = null;
        secondPick = null;
        stopPicks = false;
      }, 800);
    }
  }
}

// when the reset button is clicked
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  document.location.href = "";
});

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

