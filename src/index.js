// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

function changeColor() {
  if (this.style.color == "pink") {
    this.style.color = "black"
  }
  else {
    this.style.color = "pink"
  }
}

function filterByLetter() {
  let letter = $dropDown.value;
  const $listOfBreeds = document.querySelectorAll(".rendered-breed");
  for (let index = 0; index < $listOfBreeds.length; index++) {
    let dog = $listOfBreeds[index];
    let firstLetter = dog.innerText.charAt(0);
    if (firstLetter == letter) {
      dog.style.display = "list-item"
    }
    else {
      dog.style.display = "none"
    }
  }
}

const $dropDown = document.querySelector("#breed-dropdown");

$dropDown.addEventListener("change", filterByLetter)

function getDogImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then(dogs => dogs.message.forEach(dog => renderDogImages(dog)))
    // .then(dogs => console.log(JSON.stringify(dogs, null, 4)))
}

function getDogBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  // .then(dogBreeds => console.log(JSON.stringify(dogBreeds, null, 4)))
  .then(dogBreeds => {for (dog in dogBreeds.message) {
    let subBreeds = dogBreeds.message[dog]
    if (subBreeds.length > 0) {
      subBreeds.forEach(subBreed => renderDogBreeds(subBreed + " " + dog))
    }
    else {
      renderDogBreeds(dog);
    }
  }}
  )
}

function renderDogImages(dog) {
  const $dogImageContainer = document.querySelector("#dog-image-container");

  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = '<img src = "' + dog + '">'

  $dogImageContainer.appendChild(card);
}

function renderDogBreeds(dogBreed){
  const $dogBreedContainer = document.querySelector("#dog-breeds");

  let breedInfo = document.createElement("li");
  breedInfo.className = "rendered-breed";
  breedInfo.innerText = dogBreed;
  breedInfo.onclick = changeColor;

  $dogBreedContainer.appendChild(breedInfo);
}

function initialize() {
  getDogImages();
  getDogBreeds();
}

initialize()

// $singleDogBreed.forEach($dog => {
//   $dog.addEventListener("click", () => this.style.color = "pink");
// });