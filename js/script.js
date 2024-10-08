const heroImg = document.querySelector(".hero__logo");
const searchInput = document.querySelector(".search__container--input");
const formElement = document.querySelector("form");
const modalView = document.querySelector(".modal");
const btnAddShortcut = document.querySelector("#btn--add");
const btnCancel = document.querySelector("#btn--cancel");
const btnDone = document.querySelector("#btn--done");
const inputModalName = document.querySelector("#modal__input--name");
const inputModalURL = document.querySelector("#modal__input--url");
const shortcutContainer = document.querySelector(".shortcut--add");
const shortcutCards = document.querySelectorAll(".shortcut__card");
const labLink = document.querySelector(".lab--link");

const htmlCardTemplate = (name, link) => {
  return `
        <div class="shortcut__card">
          <div class="shortcut__card--icon">
            <button id="shortcut--logo">
              <!-- <i class="fa-solid fa-plus"></i> -->
            </button>
          </div>
          <div class="shortcut__card--title">
            <a href="${link}" target="_blank">${name}</a>
          </div>
        </div>
  `;
};

// Search on google
function searchOnGoogle(event) {
  event.preventDefault();
  const searchValue = searchInput.value;

  // Check if the input is empty
  if (searchValue <= 1) {
    return;
  }

  // Open a new window and search what is on the input.
  window.open(`https://www.google.com/search?q=${searchValue}`, "_blank");

  // Clean the input value
  searchInput.value = "";
}

// Open modal view
function openModalView() {
  modalView.classList.add("modal--open");
}

// Close modal view
function closeModalView(event) {
  event.preventDefault();
  modalView.classList.remove("modal--open");
}

// Check if modal inputs are empty or not make available the done button.
function isModalInputEmpty() {
  const inputNameLength = inputModalName.value.length;
  const inputUrlLength = inputModalURL.value.length;

  if (inputNameLength === 0 || inputUrlLength === 0) {
    btnDone.classList.remove("btn--enable");
    btnDone.classList.add("btn--disable");
  } else if (inputNameLength >= 1 && inputUrlLength >= 1) {
    btnDone.classList.remove("btn--disable");
    btnDone.classList.add("btn--enable");
  }
}

// Add a shortcut
function addShortcut(event) {
  // Prevent event from submit
  event.preventDefault();

  const shortcutData = {
    name: inputModalName.value,
    link: inputModalURL.value,
  };

  // HTML template for shortcut cards
  const htmlTemplate = htmlCardTemplate(shortcutData.name, shortcutData.link);

  // Add shortcut card to the container
  shortcutContainer.innerHTML += htmlTemplate;

  // Clean the modal input
  inputModalName.value = "";
  inputModalURL.value = "";

  // Save the card on localStorage
  addShortcutLocalStorage(shortcutData);

  // Close modal
  modalView.classList.remove("modal--open");

  // Disable button
  btnDone.classList.remove("btn--enable");
  btnDone.classList.add("btn--disable");
}

// Add shortcut to localStorage
function addShortcutLocalStorage(shortcutObject) {
  // Check if the localStorage exist
  const isLocalStorage =
    localStorage.getItem("shortcut") || localStorage.setItem("shortcut", []);

  const parseLocalStorage = isLocalStorage ? JSON.parse(isLocalStorage) : [];

  parseLocalStorage.push(shortcutObject);

  // // Convert object to a string so it can be saved.
  const shortcutData = JSON.stringify(parseLocalStorage);

  localStorage.setItem("shortcut", shortcutData);
}

formElement.addEventListener("submit", searchOnGoogle);
btnAddShortcut.addEventListener("click", openModalView);
btnCancel.addEventListener("click", closeModalView);
inputModalName.addEventListener("input", isModalInputEmpty);
inputModalURL.addEventListener("input", isModalInputEmpty);
btnDone.addEventListener("click", addShortcut);

// Open the lab google link when click the lab image
labLink.addEventListener("click", () => {
  window.open("https://labs.google.com/search?source=hp", "_blank");
});

// Set google img depend on the color scheme.
(function () {
  // Check with color scheme is used on the system and choose which img you have to use.
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    heroImg.src = "./assets/googleLogo.png";
  } else {
    heroImg.src = "./assets/googleLogoDarkMode.png";
  }
})();

// Render the shortcuts when the page load
(function () {
  const shortcutStorage = localStorage.getItem("shortcut");

  if (shortcutStorage !== undefined) {
    // Parse data from localStorage
    const dataParse = JSON.parse(shortcutStorage);

    dataParse.map((shortcut) => {
      console.log(shortcut);
      const htmlTemplate = htmlCardTemplate(shortcut.name, shortcut.link);

      shortcutContainer.innerHTML += htmlTemplate;
    });
  }
})();

// https://www.google.com/search?q=cat&udm=2
