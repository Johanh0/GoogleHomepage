const searchInput = document.querySelector(".search__container--input");
const formElement = document.querySelector("form");

// Search on google images
function searchOnGoogle(event) {
  event.preventDefault();
  const searchValue = searchInput.value;

  // Check if the input is empty
  if (searchValue <= 1) {
    return;
  }

  // Open a new window and search what is on the input.
  window.open(`https://www.google.com/search?q=${searchValue}&udm=2`, "_blank");

  // Clean the input value
  searchInput.value = "";
}

formElement.addEventListener("submit", searchOnGoogle);
// https://www.google.com/search?q=cat&udm=2
